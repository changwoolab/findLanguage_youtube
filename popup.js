let finder = document.getElementById("findKoreaninComment");

finder.style.backgroundColor = "silver";
// finder에서 activate 버튼을 누르면 활성화되면 Green,
// 비활성화되면 Default 색깔로 바뀌도록 해야 함.
// 상태를 불러와서 Default 상태인지 Activate 상태인지 확인해서 색깔 설정해야 함.
finder.addEventListener("click", async() => {
    if (finder.style.backgroundColor === "lightgreen") {
        finder.style.backgroundColor = "silver";
        finder.value = "Activate!"
    }
    else {
        finder.style.backgroundColor = "lightgreen";
        finder.value = "Activated!"
    }
});

/////////////////////////////////////////////////////////////////////////
                    ////CHROME EXTENSION EXAMPLE////
/////////////////////////////////////////////////////////////////////////
/*
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page.
changeColor.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({active:true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page.
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({color}) => {
        document.body.style.backgroundColor = color;
    });
}
*/