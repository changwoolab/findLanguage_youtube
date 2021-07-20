const apiKey = "";

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
              console.log(ch);
              // 만약 받아온 comment가 한국어라면,
              if (checkIfKorean(ch)) {
                // youtube html을 변형하여 보여주기
                // div를 삭제하고 재구성하기보다는 기존 댓글들 위에 추가해주자.
                console.log("한글");
              }
            }
          }
        });
    }
  }
});