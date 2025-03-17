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

function createReceiverTransform() {
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

        // NAL Type SEI
        if (nalType === 6) {

          const rbsp = removeEmulationPreventionBytes(nalu.subarray(startCodeLength + headerCodeLength));

          const parsedSei = parseSEIPayload(rbsp);

          const eventData = {
            nalu: nalu,
            sei: parsedSei
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
