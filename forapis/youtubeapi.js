// google API KEY
// YOUTUBE API를 허용하세요
const apiKey = "";

function addElement(objectData) {
  let authorChannelUrl = objectData.authorChannelUrl;
  let authorDisplayName = objectData.authorDisplayName;
  let authorProfileImageUrl = objectData.authorProfileImageUrl;
  let textDisplay = objectData.textOriginal;
  let likeCount = objectData.likeCount;
  $("#parentElement").append(`
  <div id="contents" class="box-container">
        <div id="thumbnail">
            <a href="${authorChannelUrl}"><img class="thumbnail-image"
            src="${authorProfileImageUrl}" 
            alt="not loaded" height="40" width="40"></a>
        </div>
        <div id="comments" class="comments-container">
            <div id="header">
                <div class="header-author">
                    <h3 class="author-name">${authorDisplayName}</h3>
                    <div class="time-written">2개월 전(수정됨)</div>
                </div>
            </div>
            <div id="expander">
                <div>${textDisplay}</div>
            </div>
            <div id="actions">
                <img src="img/good.jpg" height="15" width="15">
                <div class="betweengoodbad">${likeCount}</div>
                <img src="img/bad.jpg" height="15" width="15"></a>
            </div>
        </div>
    </div>
  `)
}
/*
// popup.js에 한국어 댓글들을 보여줌.
function addElement(num, charact) {
  var newNode = document.createElement("div");
  var parentDiv = document.getElementById("childElement").parentNode;
  var newContent = document.createTextNode(`${num+1}. `+charact);
  newNode.appendChild(newContent);
  var sp = document.getElementById("childElement");
  parentDiv.insertBefore(newNode, sp);
}
*/
// charCodeAt()을 제대로 활용하기 위해서는 html파일 맨 위에
// <meta>를 이용해서 utf-16을 사용함을 명시해야 한다. 
function checkIfKorean(c) {
  for (p = 0; p < c.length; p++) {
    let unicode = c.charCodeAt(p);
    if (unicode >= 0xAC00 && unicode <= 0xD7AF)      return true;
    else if (unicode >= 0x314F && unicode <= 0x3163) return true;
    else if (unicode >= 0x3130 && unicode <= 0x314E) return true;
  }
  return false;
}

// 현재 탭이 Youtube 영상인지 확인하고
// 현재 탭이 Youtube 영상이라면 videoId 가져오기.
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  // Youtube 영상 링크인지 확인
  let url = tabs[0].url;
  if (url.length > 32) {
    let target = 'https://www.youtube.com/watch?v=';
    let parseUrlTarget = url.substring(0,32);
    let parseUrlvideoId = url.substring(32, url.length);
    // 유튜브 영상이 맞으면 Youtube API를 통해 commentThreads 받아오기.
    if (target == parseUrlTarget) {
      $.ajax({
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}`,
        data: { part: 'snippet', videoId: `${parseUrlvideoId}`, order:'relevance', maxResults: 100}
      })
      // 일단 relevance 순으로 받아온 다음 한글만 추출하는것부터 하자.
        .done(function (data) {
          if (console && console.log) {
            console.log(data);
            for (i = 0; i < data.items.length; i++) {
              let ch = data.items[i].snippet.topLevelComment.snippet.textOriginal;
              // 만약 받아온 comment가 한국어라면,
              if (checkIfKorean(ch)) {
                // popup.html 파일을 수정하여 보여주기
                let obData = data.items[i].snippet.topLevelComment.snippet;
                addElement(obData);
              }
            }
          }
        });
    }
  }
});