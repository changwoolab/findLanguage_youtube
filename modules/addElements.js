// popup.js에 한국어 댓글들을 보여줌.
export default function addElement(num, charact) {
    var newNode = document.createElement("div");
    var parentDiv = document.getElementById("childElement").parentNode;
    var newContent = document.createTextNode(`${num+1}. `+charact);
    newNode.appendChild(newContent);
    var sp = document.getElementById("childElement");
    parentDiv.insertBefore(newNode, sp);
  }
  