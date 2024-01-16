export function arrayToString(array) {
  var uint16array = new Uint16Array(array.buffer);
  return String.fromCharCode.apply(null, uint16array);
}

export function base64DecodeUint8Array(input) {

  var raw = window.atob(input);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++)
    array[i] = raw.charCodeAt(i);
  return array;
}

export function base64EncodeUint8Array(input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN;
    chr3 = i < input.length ? input[i++] : Number.NaN;

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

export function stringToUint16Array(string) {
  // 2 bytes for each char
  var buffer = new ArrayBuffer(string.length * 2);
  var array = new Uint16Array(buffer);

  for (var i = 0; i < string.length; i++) {
    array[i] = string.charCodeAt(i);
  }

  return array;
};


export function concatInitDataIdAndCertificate({
  id,
  initData,
  cert
}) {

  try {
    if (typeof id === 'string') {
      id = stringToUint16Array(id);
    } // layout:
    //   [initData]
    //   [4 byte: idLength]
    //   [idLength byte: id]
    //   [4 byte:certLength]
    //   [certLength byte: cert]

    var offset = 0;
    var buffer = new ArrayBuffer(initData.byteLength + 4 + id.byteLength + 4 + cert.byteLength);
    var dataView = new DataView(buffer);
    var initDataArray = new Uint8Array(buffer, offset, initData.byteLength);
    initDataArray.set(initData);
    offset += initData.byteLength;
    dataView.setUint32(offset, id.byteLength, true);
    offset += 4;
    var idArray = new Uint16Array(buffer, offset, id.length);
    idArray.set(id);
    offset += idArray.byteLength;
    dataView.setUint32(offset, cert.byteLength, true);
    offset += 4;
    var certArray = new Uint8Array(buffer, offset, cert.byteLength);
    certArray.set(cert);
    var data = new Uint8Array(buffer, 0, buffer.byteLength);
    return data;
  } catch (error) {
    return null;
  }
};