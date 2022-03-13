const boxCont = document.querySelector(".box-cont");
const boxDown = document.querySelectorAll(".boxdown");
const addTeamBtn = document.querySelector(".add-team");
const subTeamBtn = document.querySelector(".del-team");
const addNum = function (e) {
  const markToChange = Number(
    e.target.parentElement.querySelector(".num").value
  );
  const oldMark = Number(
    e.target.closest(".box").querySelector(".teammark").textContent
  );
  const newMark = String(oldMark + markToChange);
  e.target.closest(".box").querySelector(".teammark").textContent =
    newMark.padStart(3, "0");
};

const subNum = function (e) {
  const markToChange = Number(
    e.target.parentElement.querySelector(".num").value
  );
  const oldMark = Number(
    e.target.closest(".box").querySelector(".teammark").textContent
  );
  const newMark = String(oldMark - markToChange);
  e.target.closest(".box").querySelector(".teammark").textContent =
    newMark.padStart(3, "0");
};

const handleClick = function (e) {
  if (!e.target.classList.contains("btn")) return;
  const markToChange = Number(
    e.target.parentElement.querySelector(".num").value
  );
  if (Number.isNaN(markToChange) || !markToChange) {
    alert("You can only add or subtract numbers from the score!");
    return;
  }
  if (e.target.closest(".add")) {
    addNum(e);
  }
  if (e.target.closest(".sub")) {
    subNum(e);
  }
};

boxCont.addEventListener("click", e => handleClick(e));
addTeamBtn.addEventListener("click", () => {
  const num =
    Number(document.querySelector(".box-cont").lastElementChild.dataset.num) +
    1;
  if (num > 5) {
    alert("5 is the max number of teams.");
    return;
  }
  const html = `<div class="box" data-num="${num}">
                  <div class="boxup" >
                    <textarea class="teamname">Team ${num}</textarea>
                    <div class="teammark">000</div>
                  </div>
                  <div class="boxdown">
                    <div class="sub btn">-</div>
                    <input type="num" class="num" value="20"></input>
                    <div class="add btn">+</div>
                  </div>
                </div>`;
  boxCont.insertAdjacentHTML("beforeend", html);
});
subTeamBtn.addEventListener("click", () => {
  if (
    Number(document.querySelector(".box-cont").lastElementChild.dataset.num) <=
    1
  ) {
    alert("You must have at least 1 team.");
    return;
  }
  document.querySelector(".box-cont").lastElementChild.remove();
});

const hourInput = document.querySelector(".min-input");
const minInput = document.querySelector(".sec-input");
const timerBtnsCont = document.querySelector(".timer-btns");

// const startBtn = document.querySelector(".start");
// const pauseBtn = document.querySelector(".pause");
// const resetBtn = document.querySelector(".reset");
let timer;
let OGmins, OGsecs;
let secs, mins;
let ticking = false;
timerBtnsCont.addEventListener("click", e => {
  const buttonClicked = e.target.closest(".timer-btn");
  if (!buttonClicked) return;
  const tick = function () {
    secs = Number(minInput.value);
    mins = Number(hourInput.value);
    if (mins === 0 && secs === 0) {
      clearInterval(timer);
      return;
    }
    secs--;
    const flash = async function (el) {
      el.style.display = "block";
      await setTimeout(() => {
        el.style.display = "none";
      }, 500);
      await setTimeout(() => {
        el.style.display = "block";
      }, 1000);
      await setTimeout(() => {
        el.style.display = "none";
      }, 1500);
      await setTimeout(() => {
        el.style.display = "block";
      }, 2000);
      await setTimeout(() => {
        el.style.display = "none";
      }, 2500);
      await setTimeout(() => {
        el.style.display = "block";
      }, 3000);
      await setTimeout(() => {
        el.style.display = "none";
      }, 3500);
      await setTimeout(() => {
        el.style.display = "block";
      }, 4000);
      await setTimeout(() => {
        el.style.display = "none";
      }, 4500);
    };
    if (secs < 0) {
      secs = 59;
      mins--;
    }
    hourInput.value = String(mins).padStart(2, "0");
    minInput.value = String(secs).padStart(2, "0");
    if (mins === 0 && secs === 0) {
      clearInterval(timer);
      ticking = false;

      const audio = new Audio("explosion.mp3");
      audio.play();
      flash(document.querySelector(".overlay"));
      return;
    }
  };

  if (buttonClicked.classList.contains("start")) {
    if (!ticking) {
      OGsecs = Number(minInput.value);
      OGmins = Number(hourInput.value);
      timer = setInterval(tick, 1000);
      ticking = true;
    }
  }

  if (buttonClicked.classList.contains("pause")) {
    if (ticking) {
      ticking = false;
      clearInterval(timer);
      document.querySelector(".pause").textContent = "Resume";
      return;
    }
    if (!ticking) {
      ticking = true;
      document.querySelector(".pause").textContent = "Pause";
      timer = setInterval(tick, 1000);
      return;
    }
  }

  if (buttonClicked.classList.contains("reset")) {
    ticking = false;
    clearInterval(timer);
    hourInput.value = String(OGmins).padStart(2, "0");
    minInput.value = String(OGsecs).padStart(2, "0");
  }
});
