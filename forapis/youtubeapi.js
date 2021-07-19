// charCodeAt()을 제대로 활용하기 위해서는 html파일 맨 위에
// <meta>를 이용해서 utf-16을 사용함을 명시해야 한다. 
// (이걸 알아내느라 4시간이 걸리다니.... ㅂㄷㅂㄷ;;)
function checkIfKorean(c) {
  let unicode = c.charCodeAt(0);
  if (unicode >= 0xAC00 && unicode <= 0xD7AF) {
    return true;
  }
}

// 현재 탭이 Youtube 영상인지 확인하고
// 현재 탭이 Youtube 영상이라면 videoId 가져오기.
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  // https://www.youtube.com/watch?v=I0oNK-XHp0I 가 들어옴.
  let url = tabs[0].url;
  // Youtube 영상 링크인지 확인
  // Youtube 영상 링크일때만 작동하면 되므로 else는 구현할 필요 없음.
  if (url.length > 32) {
    let target = 'https://www.youtube.com/watch?v=';
    let parseUrlTarget = url.substring(0,32);
    let parseUrlvideoId = url.substring(32, url.length);
    // 유튜브 영상이 맞으면 Youtube API를 통해 commentThreads 받아오기.
    if (target == parseUrlTarget) {
      $.ajax({
        method: 'GET',
        url: "https://www.googleapis.com/youtube/v3/commentThreads?key=",
        data: { part: 'snippet', videoId: `${parseUrlvideoId}`, order:'relevance'}
      })
      // 일단 relevance 순으로 받아온 다음 한글만 추출하는것부터 하자.
        .done(function (data) {
          if (console && console.log) {
            console.log(data);
            for (i = 0; i < 20; i++) {
              let c = data.items[i].snippet.topLevelComment.snippet.textDisplay;
              // 만약 받아온 comment가 한국어라면,
              if (checkIfKorean(c)) {
                // youtube html을 변형하여 보여주기
              }
            }
          }
        });
    }
  }
});