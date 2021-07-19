function checkIfKorean(c) {
  let unicode = c.charCodeAt(0);
  if (unicode >= 0xAC00 && unicode <= 0xAD00) {
    console.log(c, unicode);
  }
}

$.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/youtube/v3/commentThreads?key=",
    data: { part: 'snippet', videoId: 'I0oNK-XHp0I', order:'relevance'}
  })
  // 일단 relevance 순으로 받아온 다음 한글만 추출하는것부터 하자.
    .done(function (data) {
      if (console && console.log) {
        console.log(data);
        for (i = 0; i < 20; i++) {
          let c = data.items[i].snippet.topLevelComment.snippet.textDisplay[0];
          checkIfKorean(c);
        }
        checkIfKorean('ㄴ');
      }
    });