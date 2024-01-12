const boxCont = document.querySelector(".box-cont");
const boxDown = document.querySelectorAll(".boxdown");
const addTeamBtn = document.querySelector(".add-team");
const subTeamBtn = document.querySelector(".del-team");
const addNum = function (e) {
  const markToChange = Number(
    e.target.closest(".box").querySelector(".num").value
  );
  const oldMark = Number(
    e.target.closest(".box").querySelector(".teammark").textContent
  );
  const newMark = String(oldMark + markToChange);
  e.target.closest(".box").querySelector(".teammark").textContent =
    newMark.padStart(3, "0");
};
const add = function (e, num) {
  const markToChange = num;
  const oldMark = Number(
    e.target.closest(".box").querySelector(".teammark").textContent
  );
  const newMark = String(oldMark + markToChange);
  e.target.closest(".box").querySelector(".teammark").textContent =
    newMark.padStart(3, "0");
};
const sub = function (e, num) {
  const markToChange = -num;
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
console.log(localStorage.getItem("teamsData"));
let teamsData = JSON.parse(localStorage.getItem("teamsData"));
if (!teamsData) {
  teamsData = {
    teams: [
      {
        score: 0,
        teamName: "Team 1",
      },
      {
        score: 0,
        teamName: "Team 2",
      },
    ],
  };
}
console.log(teamsData.teams);
const addTeam = function (num, teamName, score) {
  const processedScore = String(score).padStart(3, "0");
  console.log(processedScore, teamName);
  const html = `<div class="box" data-num="${num}">
  <div class="boxup">
    <textarea class="teamname">${teamName}</textarea>
    <div class="teammark">${processedScore}</div>
  </div>
  <div class="boxdown">
    <div class="add15 add btn">+15</div>
    <div class="add25 add btn">+25</div>
    <div class="add30 add btn">+30</div>
  </div>
  <div class="boxdown manual">
    <div class="add btn">+</div>
    <input type="num" class="num" value="20"></input>
    <div class="sub btn" >-</div>
  </div>
  <div class="boxdown">
    <div class="sub10 sub btn" >-10</div>
    <div class="sub15 sub btn" >-15</div>
  </div>
</div>`;
  boxCont.insertAdjacentHTML("beforeend", html);
};
teamsData.teams.forEach((team, i) => {
  addTeam(i + 1, team.teamName, team.score);
});

const handleClick = function (e) {
  if (!e.target.classList.contains("btn")) return;
  if (e.target.closest(".sub10")) {
    sub(e, 10);
  } else if (e.target.closest(".sub15")) {
    sub(e, 15);
  } else if (e.target.closest(".add15")) {
    add(e, 15);
  } else if (e.target.closest(".add25")) {
    add(e, 25);
  } else if (e.target.closest(".add30")) {
    add(e, 30);
  } else if (e.target.closest(".add")) {
    const markToChange = Number(
      e.target.closest(".box").querySelector(".num").value
    );
    if (Number.isNaN(markToChange) || !markToChange) {
      alert("You can only add or subtract numbers from the score!");
      return;
    }
    addNum(e);
  } else if (e.target.closest(".sub")) {
    const markToChange = Number(
      e.target.parentElement.querySelector(".num").value
    );
    if (Number.isNaN(markToChange) || !markToChange) {
      alert("You can only add or subtract numbers from the score!");
      return;
    }
    subNum(e);
  }
  const box = e.target.closest(".box");
  const newScore = box.querySelector(".teammark").textContent;
  const newName = box.querySelector(".teamname").value;
  const teamNo = box.dataset.num;
  teamsData.teams[teamNo - 1].score = Number(newScore);
  teamsData.teams[teamNo - 1].teamName = newName;
  localStorage.setItem("teamsData", JSON.stringify(teamsData));
};

boxCont.addEventListener("click", (e) => handleClick(e));
addTeamBtn.addEventListener("click", () => {
  const num = teamsData.teams.length + 1;
  Number(document.querySelector(".box-cont").lastElementChild.dataset.num) + 1;
  console.log(num);
  if (num >= 4) {
    alert("3 is the max number of teams.");
    return;
  }
  addTeam(num, `Team ${num}`, 0);
  teamsData.teams.push({ score: 0, teamName: `Team ${num}` });
  localStorage.setItem("teamsData", JSON.stringify(teamsData));
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
  teamsData.teams.pop();
  localStorage.setItem("teamsData", JSON.stringify(teamsData));
});

const hourInput = document.querySelector(".min-input");
const minInput = document.querySelector(".sec-input");
const timerBtnsCont = document.querySelector(".timer-btns");

// const startBtn = document.querySelector(".start");
// const pauseBtn = document.querySelector(".pause");
// const resetBtn = document.querySelector(".reset");
let timer;
let OGmins = hourInput.value,
  OGsecs = minInput.value;
let secs, mins;
let ticking = false;
timerBtnsCont.addEventListener("click", (e) => {
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

      const audio2 = new Audio("alarm.mp3");
      audio2.play();
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

//--------

const hourInput2 = document.querySelector(".min-input2");
const minInput2 = document.querySelector(".sec-input2");
const timerBtnsCont2 = document.querySelector(".timer-btns2");

// const startBtn = document.querySelector(".start");
// const pauseBtn = document.querySelector(".pause");
// const resetBtn = document.querySelector(".reset");
let timer2;
let OGmins2 = hourInput2.value,
  OGsecs2 = minInput2.value;
let secs2, mins2;
let ticking2 = false;

timerBtnsCont2.addEventListener("click", (e) => {
  const buttonClicked2 = e.target.closest(".timer-btn2");
  if (!buttonClicked2) return;
  const tick2 = function () {
    secs2 = Number(minInput2.value);
    mins2 = Number(hourInput2.value);
    if (mins2 === 0 && secs2 === 0) {
      clearInterval(timer2);
      return;
    }
    secs2--;
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
    };
    if (secs2 < 0) {
      secs2 = 59;
      mins2--;
    }
    hourInput2.value = String(mins2).padStart(2, "0");
    minInput2.value = String(secs2).padStart(2, "0");
    if (mins2 === 0 && secs2 === 0) {
      clearInterval(timer2);
      ticking2 = false;

      const audio2 = new Audio("alarm.mp3");
      audio2.play();
      flash(document.querySelector(".overlay"));
      return;
    }
  };

  if (buttonClicked2.classList.contains("start")) {
    if (!ticking2) {
      OGsecs2 = Number(minInput.value);
      OGmins2 = Number(hourInput.value);
      timer2 = setInterval(tick2, 1000);
      ticking2 = true;
    }
  }

  if (buttonClicked2.classList.contains("pause2")) {
    if (ticking2) {
      ticking2 = false;
      clearInterval(timer2);
      document.querySelector(".pause2").textContent = "Resume";
      return;
    }
    if (!ticking2) {
      ticking2 = true;
      document.querySelector(".pause2").textContent = "Pause";
      timer2 = setInterval(tick2, 1000);
      return;
    }
  }

  if (buttonClicked2.classList.contains("reset")) {
    ticking2 = false;
    clearInterval(timer2);
    hourInput2.value = String(OGmins2).padStart(2, "0");
    minInput2.value = String(OGsecs2).padStart(2, "0");
  }
});
