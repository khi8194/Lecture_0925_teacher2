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
          <h2 class='vidTitle'>${title}</h2>         
          
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

//자바스크립트를 이용해서 동적으로 생성된 요소는 일반적인 방법으로는 이벤트 연결이 불가
//동적인 요소가 만들어 지는 위치가 fetch함수의 then구문안쪽인데 그 밖에서는 동적인 요소 선택 불가
//제일 간단한 해결 방법 : 동적생성 요소 찾는 구문을 돔을 생성하는 코드 불록 안쪽에서 호출
//위의 방법의 단점 : fetch함수 코드블록 안쪽에 또다시 복잡한 이벤트연결 로직을 작성해야 되기 때문에 코드의 복잡도 증가
//기능별로 코드 분리가 불가능

//위와 같은 이유로 부득이하게 동적인요소의 이벤트 연결을 fetch함수 밖에서 연결하는 경우가 많음
//이벤트위임: 지금 당장은 없는 DOM요소에 이벤트를 전달하기 위해서 항상 존재하는요소에 이벤트를 맡겨서
//추후 동적요소가 생성완료되면 그때 이벤트를 대신 전달해주는 방식

//이벤트 위임: 항상존재하는 body요소에 일단은 이벤트를 맡겼다가 동적요소가 생성완료되면 body가 대신 이벤트 전달

document.body.addEventListener("click", function (e) {
  //console.dir(e.target);

  //body전체에 이벤트를 연결한 뒤 이벤트발생한 실제대상을 조건문으로 분기처리해서
  //조건에 부합될때에만 원하는 구문 연결 (이처럼 번거로운 작업을 처리하지 않기 위해서 리액트같은 프레임웍, 라이브러리)
  if (e.target.className === "vidTitle") {
    console.log("you clicked VidTitle");
  }
});
