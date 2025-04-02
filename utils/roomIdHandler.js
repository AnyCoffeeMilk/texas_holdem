export const isAlphaNumeric = (str) => {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // (0-9)
      !(code > 64 && code < 91) && // (A-Z)
      !(code > 96 && code < 123) // (a-z)
    ) {
      return false;
    }
  }
  return true;
}

export const isRoomIdValid = (roomId) => roomId.length === 6 && isAlphaNumeric(roomId)