const boxCont = document.querySelector(".mid");
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
    Number(document.querySelector(".mid").lastElementChild.dataset.num) + 1;
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
    Number(document.querySelector(".mid").lastElementChild.dataset.num) <= 1
  ) {
    alert("You must have at least 1 team.");
    return;
  }
  document.querySelector(".mid").lastElementChild.remove();
});
