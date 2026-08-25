/**
 * Created by rock on 2025. 2
 */

const OVENMEDIAENGINE_SEI_METADATA_UUID = '464d4c475241494e434f4c4f55524201';

function removeEmulationPreventionBytes(data) {
  const rbsp = [];
  for (let i = 0; i < data.length; i++) {

    if (i > 2 && data[i - 2] === 0x00 && data[i - 1] === 0x00 && data[i] === 0x03) {
      continue; // skip 0x03
    }
    rbsp.push(data[i]);
  }
  return new Uint8Array(rbsp);
}

function parseSEIPayload(rbsp) {

  const messages = [];

  let i = 0;
  const rbspLength = rbsp[rbsp.length - 1] === 0x80 ? rbsp.length - 1 : rbsp.length;

  while (i < rbspLength) {

    let type = 0;
    while (rbsp[i] === 0xFF) {
      type += 255;
      i++;
    }
    type += rbsp[i++];

    let size = 0;
    while (rbsp[i] === 0xFF) {
      size += 255;
      i++;
    }
    size += rbsp[i++];

    const payload = rbsp.slice(i, i + size);
    i += size;

    messages.push({ type, size, payload });

    return { type, size, payload };
  }

  return messages;
}

function toHexString(byteArray, delimiter = '') {
  return Array.from(byteArray, byte => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join(delimiter);
}

function toHexArray(byteArray) {
  return Array.from(byteArray, byte => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  });
}

function toUUID(byteArray) {
  const hexString = toHexString(byteArray);
  return [
    hexString.slice(0, 8),
    hexString.slice(8, 12),
    hexString.slice(12, 16),
    hexString.slice(16, 20),
    hexString.slice(20, 24),
    hexString.slice(24, 32)
  ].join('-');
}

function toTimestamp(byteArray) {
  const hexString = toHexString(byteArray);
  return parseInt(hexString, 16);
}

function toAsciiString(byteArray) {
  return String.fromCharCode.apply(null, byteArray);
}

function findNalStartIndex(frameData, offset) {
  while (offset < frameData.byteLength - 4) {
    if ((frameData[offset] === 0x00 && frameData[offset + 1] === 0x00)
      && (frameData[offset + 2] === 0x01 || (frameData[offset + 2] === 0x00 && frameData[offset + 3] === 0x01))) {
      return offset;
    } else {
      offset += 1;
    }
  }
  return -1;
}

function getNalus(frameData) {

  let offset = 0;
  const headerSize = 1;
  const nalus = [];

  while (offset < frameData.byteLength - 4) {

    const startCodeIndex = findNalStartIndex(frameData, offset);

    if (startCodeIndex >= offset) {

      const startCodeLength = frameData[startCodeIndex + 2] === 0x01 ? 3 : 4;
      const nextStartCodeIndex = findNalStartIndex(frameData, startCodeIndex + startCodeLength + headerSize);

      if (nextStartCodeIndex > startCodeIndex) {

        nalus.push(frameData.subarray(startCodeIndex, nextStartCodeIndex));
        offset = nextStartCodeIndex;
      } else {

        nalus.push(frameData.subarray(startCodeIndex));
        break;
      }
    } else {
      break;
    }
  }
  return nalus;
}

// Reads the RBSP bit by bit, so that u(n), ue(v) and se(v) syntax elements can be parsed.
function BitReader(byteArray) {
  this.bytes = byteArray;
  this.position = 0;
}

BitReader.prototype.hasData = function () {
  return this.position < this.bytes.length * 8;
};

BitReader.prototype.readBits = function (count) {

  let value = 0;

  for (let i = 0; i < count && this.hasData(); i++) {

    const byte = this.bytes[this.position >> 3];
    const bit = (byte >> (7 - (this.position & 7))) & 1;

    // Multiplying instead of shifting keeps 32 bit values positive.
    value = (value * 2) + bit;
    this.position++;
  }

  return value;
};

BitReader.prototype.readUnsignedExpGolomb = function () {

  let leadingZeroBits = 0;

  while (this.hasData() && this.readBits(1) === 0) {

    leadingZeroBits++;

    if (leadingZeroBits > 31) {
      return 0;
    }
  }

  if (leadingZeroBits === 0) {
    return 0;
  }

  return Math.pow(2, leadingZeroBits) - 1 + this.readBits(leadingZeroBits);
};

BitReader.prototype.readSignedExpGolomb = function () {

  const value = this.readUnsignedExpGolomb();

  return (value % 2) === 0 ? -(value / 2) : (value + 1) / 2;
};

// The profiles that carry the chroma format and the scaling matrices in the SPS.
const HIGH_PROFILE_IDCS = [100, 110, 122, 244, 44, 83, 86, 118, 128, 138, 139, 134, 135];

function skipScalingList(reader, size) {

  let lastScale = 8;
  let nextScale = 8;

  for (let i = 0; i < size; i++) {

    if (nextScale !== 0) {
      nextScale = (lastScale + reader.readSignedExpGolomb() + 256) % 256;
    }

    if (nextScale !== 0) {
      lastScale = nextScale;
    }
  }
}

function parseHrdParameters(reader) {

  const cpbCntMinus1 = reader.readUnsignedExpGolomb();

  reader.readBits(4); // bit_rate_scale
  reader.readBits(4); // cpb_size_scale

  for (let i = 0; i <= cpbCntMinus1; i++) {

    reader.readUnsignedExpGolomb(); // bit_rate_value_minus1
    reader.readUnsignedExpGolomb(); // cpb_size_value_minus1
    reader.readBits(1); // cbr_flag
  }

  return {
    cpb_cnt_minus1: cpbCntMinus1,
    initial_cpb_removal_delay_length_minus1: reader.readBits(5),
    cpb_removal_delay_length_minus1: reader.readBits(5),
    dpb_output_delay_length_minus1: reader.readBits(5),
    time_offset_length: reader.readBits(5)
  };
}

function skipToHrdParameters(reader) {

  if (reader.readBits(1)) { // aspect_ratio_info_present_flag

    if (reader.readBits(8) === 255) { // aspect_ratio_idc EXTENDED_SAR

      reader.readBits(16); // sar_width
      reader.readBits(16); // sar_height
    }
  }

  if (reader.readBits(1)) { // overscan_info_present_flag
    reader.readBits(1); // overscan_appropriate_flag
  }

  if (reader.readBits(1)) { // video_signal_type_present_flag

    reader.readBits(3); // video_format
    reader.readBits(1); // video_full_range_flag

    if (reader.readBits(1)) { // colour_description_present_flag
      reader.readBits(24); // colour_primaries, transfer_characteristics, matrix_coefficients
    }
  }

  if (reader.readBits(1)) { // chroma_loc_info_present_flag

    reader.readUnsignedExpGolomb(); // chroma_sample_loc_type_top_field
    reader.readUnsignedExpGolomb(); // chroma_sample_loc_type_bottom_field
  }

  if (reader.readBits(1)) { // timing_info_present_flag

    reader.readBits(32); // num_units_in_tick
    reader.readBits(32); // time_scale
    reader.readBits(1); // fixed_frame_rate_flag
  }
}

// The pic_timing and buffering_period SEI messages can only be parsed with these
// VUI/HRD parameters, so the SPS of the stream has to be parsed to get them.
function parseSPS(rbsp) {

  const reader = new BitReader(rbsp);

  const profileIdc = reader.readBits(8);

  reader.readBits(8); // constraint flags and reserved bits
  reader.readBits(8); // level_idc

  const sps = {
    seq_parameter_set_id: reader.readUnsignedExpGolomb(),
    nal_hrd_parameters_present_flag: 0,
    vcl_hrd_parameters_present_flag: 0,
    cpb_dpb_delays_present_flag: 0,
    pic_struct_present_flag: 0,
    // The values the standard infers when the HRD parameters are absent.
    initial_cpb_removal_delay_length_minus1: 23,
    cpb_removal_delay_length_minus1: 23,
    dpb_output_delay_length_minus1: 23,
    time_offset_length: 24
  };

  if (HIGH_PROFILE_IDCS.indexOf(profileIdc) >= 0) {

    const chromaFormatIdc = reader.readUnsignedExpGolomb();

    if (chromaFormatIdc === 3) {
      reader.readBits(1); // separate_colour_plane_flag
    }

    reader.readUnsignedExpGolomb(); // bit_depth_luma_minus8
    reader.readUnsignedExpGolomb(); // bit_depth_chroma_minus8
    reader.readBits(1); // qpprime_y_zero_transform_bypass_flag

    if (reader.readBits(1)) { // seq_scaling_matrix_present_flag

      const listCount = chromaFormatIdc !== 3 ? 8 : 12;

      for (let i = 0; i < listCount; i++) {

        if (reader.readBits(1)) { // seq_scaling_list_present_flag
          skipScalingList(reader, i < 6 ? 16 : 64);
        }
      }
    }
  }

  reader.readUnsignedExpGolomb(); // log2_max_frame_num_minus4

  const picOrderCntType = reader.readUnsignedExpGolomb();

  if (picOrderCntType === 0) {

    reader.readUnsignedExpGolomb(); // log2_max_pic_order_cnt_lsb_minus4
  } else if (picOrderCntType === 1) {

    reader.readBits(1); // delta_pic_order_always_zero_flag
    reader.readSignedExpGolomb(); // offset_for_non_ref_pic
    reader.readSignedExpGolomb(); // offset_for_top_to_bottom_field

    const refFrameCount = reader.readUnsignedExpGolomb();

    for (let i = 0; i < refFrameCount; i++) {
      reader.readSignedExpGolomb(); // offset_for_ref_frame
    }
  }

  reader.readUnsignedExpGolomb(); // max_num_ref_frames
  reader.readBits(1); // gaps_in_frame_num_value_allowed_flag
  reader.readUnsignedExpGolomb(); // pic_width_in_mbs_minus1
  reader.readUnsignedExpGolomb(); // pic_height_in_map_units_minus1

  if (!reader.readBits(1)) { // frame_mbs_only_flag
    reader.readBits(1); // mb_adaptive_frame_field_flag
  }

  reader.readBits(1); // direct_8x8_inference_flag

  if (reader.readBits(1)) { // frame_cropping_flag

    reader.readUnsignedExpGolomb(); // frame_crop_left_offset
    reader.readUnsignedExpGolomb(); // frame_crop_right_offset
    reader.readUnsignedExpGolomb(); // frame_crop_top_offset
    reader.readUnsignedExpGolomb(); // frame_crop_bottom_offset
  }

  if (!reader.readBits(1)) { // vui_parameters_present_flag
    return sps;
  }

  skipToHrdParameters(reader);

  sps.nal_hrd_parameters_present_flag = reader.readBits(1);

  const nalHrd = sps.nal_hrd_parameters_present_flag ? parseHrdParameters(reader) : null;

  sps.vcl_hrd_parameters_present_flag = reader.readBits(1);

  const vclHrd = sps.vcl_hrd_parameters_present_flag ? parseHrdParameters(reader) : null;

  const hrd = nalHrd || vclHrd;

  if (hrd) {

    reader.readBits(1); // low_delay_hrd_flag

    sps.cpb_dpb_delays_present_flag = 1;
    sps.initial_cpb_removal_delay_length_minus1 = hrd.initial_cpb_removal_delay_length_minus1;
    sps.cpb_removal_delay_length_minus1 = hrd.cpb_removal_delay_length_minus1;
    sps.dpb_output_delay_length_minus1 = hrd.dpb_output_delay_length_minus1;
    sps.time_offset_length = hrd.time_offset_length;
  }

  if (nalHrd) {
    sps.nal_hrd_cpb_cnt_minus1 = nalHrd.cpb_cnt_minus1;
  }

  if (vclHrd) {
    sps.vcl_hrd_cpb_cnt_minus1 = vclHrd.cpb_cnt_minus1;
  }

  sps.pic_struct_present_flag = reader.readBits(1);

  return sps;
}

function createReceiverTransform() {

  let sps = null;

  return new TransformStream({
    start() { },
    flush() { },
    async transform(encodedFrame, controller) {

      const nalus = getNalus(new Uint8Array(encodedFrame.data));

      nalus.forEach((nalu) => {

        const startCodeLength = nalu[2] === 0x01 ? 3 : 4;
        const headerCodeLength = 1;
        const nalHeader = nalu[startCodeLength];
        const nalType = nalHeader & 0x1F;

        // NAL Type SPS
        if (nalType === 7) {

          sps = parseSPS(removeEmulationPreventionBytes(nalu.subarray(startCodeLength + headerCodeLength)));
        }

        // NAL Type SEI
        if (nalType === 6) {

          const rbsp = removeEmulationPreventionBytes(nalu.subarray(startCodeLength + headerCodeLength));

          const parsedSei = parseSEIPayload(rbsp);

          const eventData = {
            nalu: nalu,
            sei: parsedSei,
            sps: sps
          };

          const uuid = toHexString(parsedSei.payload.subarray(0, 16));

          if (uuid === OVENMEDIAENGINE_SEI_METADATA_UUID) {

            postMessage({
              action: 'sei', data: {
                ...eventData,
                registered: true,
                uuid: toUUID(parsedSei.payload.subarray(0, 16)),
                timecode: toTimestamp(parsedSei.payload.subarray(16, 24)),
                userdata: parsedSei.payload.subarray(24)
              }
            });
          } else {

            postMessage({
              action: 'sei', data: {
                ...eventData,
                registered: false
              }
            });
          }
        }
      });

      controller.enqueue(encodedFrame);
    }
  })
}

function setupPipe({ readable, writable }, transform) {
  readable
    .pipeThrough(transform)
    .pipeTo(writable)
}

addEventListener('rtctransform', (event) => {
  setupPipe(event.transformer, createReceiverTransform());
});

addEventListener('message', (event) => {
  const { action } = event.data;

  switch (action) {
    case 'rtctransform':
      setupPipe(event.data, createReceiverTransform())
      break;
    default:
      break;
  }
});
