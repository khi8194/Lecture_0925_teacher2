const api_key = "AIzaSyDfF904vE_uzyNlnhKgAyUmNWV9U5vTxZ0";
const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

//유튜브 데이터를 가져와서 동적으로 리스트 출력
fetch(url)
  .then((data) => data.json())
  .then((json) => {
    const vidsData = json.items;
    let tags = "";

    //데이터 반복 돌면서 innerHTML='태그문자열'로 동적 돔 생성
    vidsData.forEach((data) => {
      let title =
        data.snippet.title.length > 60
          ? data.snippet.title.substring(0, 60) + "..."
          : data.snippet.title;

      let desc =
        data.snippet.description.length > 120
          ? data.snippet.description.substring(0, 120) + "..."
          : data.snippet.description;

      let date = data.snippet.publishedAt.split("T")[0].split("-").join(".");

      tags += `
        <article>
          <h2 class='vidTitle' data-id=${data.snippet.resourceId.videoId}>${title}</h2>         
          
          <div class='txt'>
            <p>${desc}</p>
            <span>${date}</span>
          </div>

          <div class='pic'>
            <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title} />
          </div>
        </article>
      `;
    });
    frame.innerHTML = tags;
  });

//동적 생성요소에 이벤트 연결해서 동적으로 모달요소 추가
document.body.addEventListener("click", (e) => {
  if (e.target.className === "vidTitle") {
    const asideEl = document.createElement("aside");
    asideEl.innerHTML = `
      <div class='con'>
        <iframe src="http://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>
      </div>
      <button class='btnClose'>close</button>
    `;
    document.body.append(asideEl);
  }
});

//동적으로 생성된 모달 닫기버튼에 이벤트 위침
document.body.addEventListener("click", (e) => {
  if (e.target.className === "btnClose") {
    //display:none과는 다르게 물리적으로 DOM자체를 제거
    document.querySelector("aside").remove();
  }
});
