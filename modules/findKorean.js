// charCodeAt()을 제대로 활용하기 위해서는 html파일 맨 위에
// <meta>를 이용해서 utf-16을 사용함을 명시해야 한다. 
export default function checkIfKorean(c) {
    for (p = 0; p < c.length; p++) {
      let unicode = c.charCodeAt(p);
      if (unicode >= 0xAC00 && unicode <= 0xD7AF)      return true;
      else if (unicode >= 0x314F && unicode <= 0x3163) return true;
      else if (unicode >= 0x3130 && unicode <= 0x314E) return true;
    }
    return false;
  }