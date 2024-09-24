const api_key = "AIzaSyDfF904vE_uzyNlnhKgAyUmNWV9U5vTxZ0";
const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

fetch(url)
  .then((data) => data.json())
  .then((json) => {
    const vidsData = json.items;
    let tags = "";

    vidsData.forEach((data) => {
      tags += `
        <article>
          <div class='pic'>
            <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title} />
          </div>
          <h2>${data.snippet.title}</h2>
          <p>${data.snippet.description}</p>
          <span>${data.snippet.publishedAt}</span>
        </article>
      `;
    });

    console.log(tags);
    frame.innerHTML = tags;
  });

//미션 : 제목이 60글자넘어가면 ...말줄임표 처리
//본문 120글자 넘어가면 ...말줄임표 처리
//날짜를 2021.03.12 변경
