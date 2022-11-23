const $app = document.querySelector(".app");
const $frag = document.createDocumentFragment();

const generalClassBtn = document.querySelector("#general-class-btn");
const utilityClassBtn = document.querySelector("#utility-class-btn");

// const MAX_TRIAL_COUNT = 100;

// const experiment = (expName, className) => {
//   let results = [];

//   console.log("===실험시작===");
//   for (let trialCout = 0; trialCout < MAX_TRIAL_COUNT; trialCout++) {
//     const startedAt = Date.now();
//     // console.log(`===${trialCout + 1}번째===`);
//     // console.log(new Date(startedAt).toLocaleTimeString() + " 시작");

//     for (let i = 0; i < 99999; i++) {
//       const $box = document.createElement("div");
//       $box.className = className;
//       $frag.appendChild($box);
//     }

//     $app.appendChild($frag);
//     const endedAt = Date.now();
//     const result = endedAt - startedAt;
//     results.push(result);
//     // console.log(new Date(endedAt).toLocaleTimeString() + " 끝");
//     // console.log(result + "ms 소요됨");
//     $app.innerHTML = "";
//   }

//   console.log("===실험끝===");
//   console.log(
//     `${expName} 평균 소요 시간: ${results.reduce((acc, e) => acc + e, 0) / MAX_TRIAL_COUNT}ms`
//   );
// };

// generalClassBtn.addEventListener("click", () => experiment("일반 클래스", "box"));
// utilityClassBtn.addEventListener("click", () =>
//   experiment("유틸리티 클래스", "inline-block w-num h-num m-num bg-coral")
// );

const MAX_TRIAL_COUNT = 100000;

const experiment = (expName, className) => {
  let results = [];

  $app.innerHTML = "";
  console.log("===실험시작===");
  for (let trialCout = 0; trialCout < MAX_TRIAL_COUNT; trialCout++) {
    const startedAt = Date.now();
    // console.log(`===${trialCout + 1}번째===`);
    // console.log(new Date(startedAt).toLocaleTimeString() + " 시작");

    const $box = document.createElement("div");
    $box.className = className;
    $frag.appendChild($box);

    $app.appendChild($frag);
    const endedAt = Date.now();
    const result = endedAt - startedAt;
    results.push(result);
    // console.log(new Date(endedAt).toLocaleTimeString() + " 끝");
    // console.log(result + "ms 소요됨");
    // $app.innerHTML = "";
  }

  console.log("===실험끝===");
  console.log(`${expName} 소요 시간: ${results.reduce((acc, e) => acc + e, 0)}ms`);
};

generalClassBtn.addEventListener("click", () => experiment("일반 클래스", "box"));
utilityClassBtn.addEventListener("click", () =>
  experiment("유틸리티 클래스", "inline-block w-num h-num m-num bg-coral")
);
