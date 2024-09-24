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
          <h2>${title}</h2>         
          
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

//위쪽의 fetch구문와 아래쪽의 동적으로 생성한 DOM요슬 변수 담는 구문은 동시에 실행됨
//비동기적으로 동작함
//코드의 작성순서대로 동작하는게 아니라 동시다발적으로 실행되기 때문에
//코드흐름의 어그러지는 현상

//위에처럼 비동기적으로 발생하는 코드의 흐름을 강제적으로 동기적 처리
//코드 작성순서대로 순차적으로 실행되게 만드는 작업 (동기화)

//아직 fetch문의 동작이 끝나지 않아서 article의 h2요소의 생성이 완료되지 않았는데
//아직 없는 동적요소인 h2를 호출함으로써 발생하는 오류
//해결 방법 : 이벤트 위임 (Event Delegate) : 항상 있는 요소에 일단은 이벤트를 맡겨놓았다가
//동적 요소가 생성되면 그때 이벤트를 대신 전달해주는 방법
const titles = document.querySelectorAll("article h2");
console.log(titles);
