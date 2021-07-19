
$.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/youtube/v3/activities?key=",
    data: { part: 'snippet', videoId: 'xpMFeEFEuas'}
  })
    .done(function (data) {
      if (console && console.log) {
        console.log("Sample of data:", data.slice(0, 100));
      }
    });