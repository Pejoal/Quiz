const c = console.log.bind(document);
const QUESTIONS = [
  {
    title: "1 + 1 equals to...",
    a: "4",
    b: "2",
    c: "3",
    d: "6",
    answers: "b",
  },
  {
    title: "cout is a ... code",
    a: "PHP",
    b: "Python",
    c: "C++",
    d: "Java",
    answers: "c",
  },
  {
    title: "what is the Capital of Egypt?",
    a: "Alex",
    b: "Giza",
    c: "Cairo",
    d: "None",
    answers: "c",
  },
  {
    title: "what is the Capital of USA?",
    a: "New York",
    b: "DC",
    c: "California",
    d: "New Jerssey",
    answers: "b",
  },
  {
    title: "echo is a ... code",
    a: "PHP",
    b: "Python",
    c: "C++",
    d: "Java",
    answers: "a",
  },
  {
    title: "when will be the end of the world?",
    a: "Today",
    b: "Tomorrow",
    c: "Yesterday",
    d: "Keine Anhung",
    answers: "d",
  },
  {
    title: "What is the best Job?",
    a: "Doctor",
    b: "Engineer",
    c: "Teacher",
    d: "Depends...",
    answers: "d",
  },
  {
    title: "What is your Rate For this App?",
    a: "1 Star",
    b: "2 Stars",
    c: "3 Stars",
    d: "4 Stars",
    answers: "d",
  },
];
// c(QUESTIONS[2].answers);
// let getAnswer = QUESTIONS[2].answers;
// c(getAnswer);
// c(QUESTIONS[2][getAnswer]);
// c(QUESTIONS);

// Buttons
// let next = document.getElementById("next");
let prev = document.getElementById("prev");
// Progress Bar
let progressBar = document.querySelector(".progress-bar");
// Spans
let spanConainer = document.querySelector(".progress");
let content = 1;
QUESTIONS.forEach((el) => {
  let span = document.createElement("span");
  let txtNode = document.createTextNode(content);
  span.append(txtNode);
  span.setAttribute("data-reached", "false");
  spanConainer.appendChild(span);
  content++;
});
let spans = document.querySelectorAll(".progress > span");
spans = Array.from(spans);

let targetedWidth = 100 / spans.length;
// Self Called Function
(() => {
  let i = 1;
  spans.forEach((span) => {
    if (spans[spans.length - 1] !== span) { // All Except Last Span
      // span.style.color = "red";
      span.style.left = targetedWidth * i + "%";
      i++;
    }
  });
})();

// next.addEventListener("click", goNext);
prev.addEventListener("click", goBack);

let x = 0;
function goNext(text) {
  let prog = parseFloat(progressBar.getAttribute("data-prog"));
  if (prog < targetedWidth * (spans.length - 1) + 1) {
    if (spans[x]) {
      prog += targetedWidth;
      progressBar.setAttribute("data-prog", prog);
      spans[x].dataset.reached = "true";
      progressBar.style.width = `${prog}%`;
      nextQuestion(text);
      x++;
    }
  }
}

function goBack() {
  let prog = parseFloat(progressBar.getAttribute("data-prog"));
  if (prog > targetedWidth - 1) {
    if (spans[x - 1]) {
      prog -= targetedWidth;
      progressBar.setAttribute("data-prog", prog);
      spans[x - 1].dataset.reached = "false";
      progressBar.style.width = `${prog}%`;
      x--;
      lastQuestion();
    }
  }
}
// End Progress Bar

let answers = document.querySelectorAll(".questions > h3");
answers = Array.from(answers);
answers.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    goNext(e.target.innerText);
  });
});

// Get Questions
let questionNum = 0;
function nextQuestion(text) {
  // Show Score if last question ended
  if (questionNum === spans.length) {
    setScore(text);

    document.querySelector(
      ".buttons"
    ).innerHTML = `<button id='reload'>Reload</button>`;
    let color = "black";
    if (score === spans.length) {
      color = "#2f2";
    } else if (score === spans.length - 1) {
      color = "#62f";
    } else if (score === spans.length - 2) {
      color = "#8d1bc7";
    } else if (score === spans.length - 3) {
      color = "#f11d75";
    } else {
      color = "#f22";
    }
    document.querySelector(
      ".questions"
    ).innerHTML = `<h1 id='score'>You Scored ${score} / ${spans.length}</h1>`;
    document.querySelector("#reload").style.cssText = `color: ${color}`;
    document.querySelector("#score").style.cssText = `color: ${color}`;
    spans.forEach(el => {
      el.style.color = color;
      el.style.border = `0.3rem solid ${color}`;
    })
    progressBar.style.backgroundColor = color;
    document.querySelector("#reload").addEventListener("click", () => {
      location.reload();
    });
    document.querySelector(".answers").style.display = "flex";
    document.querySelector("#show-answers").addEventListener("click", showAnswers);

    let con = "";
    QUESTIONS.forEach(el => {
      con +=
        `
        <section>
        <h2 class='ques'>${el.title}</h2>
        <h3>${el.a}</h3>
        <h3>${el.b}</h3>
        <h3>${el.c}</h3>
        <h3>${el.d}</h3>
        <h2 class='ans'>Answer = ${el.answers}</h2>
        </section>
        <hr>
        `;
    })
    document.querySelector(
      ".answers > section"
    ).innerHTML = con;
    function showAnswers() {
      document.querySelector(".answers > section").classList.toggle("active");
    }
    return;
  } // end of it
  setElements();
  setScore(text);
  questionNum++;
}

let score = 0;
let work = false; // must be intialized before the function
nextQuestion();

function lastQuestion() {
  questionNum--;
  questionNum--;
  if (score !== 0) {
    score--;
  }
  setElements();
  questionNum++;
}
function setElements() {
  document.querySelector(".questions > h2").textContent =
    QUESTIONS[questionNum].title;
  document.querySelector(".questions > h3:first-of-type").textContent =
    QUESTIONS[questionNum].a;
  document.querySelector(".questions > h3:nth-of-type(2)").textContent =
    QUESTIONS[questionNum].b;
  document.querySelector(".questions > h3:nth-of-type(3)").textContent =
    QUESTIONS[questionNum].c;
  document.querySelector(".questions > h3:nth-of-type(4)").textContent =
    QUESTIONS[questionNum].d;
}

function setScore(text) {
  if (work) {
    let getAnswer = QUESTIONS[questionNum - 1].answers;
    answer = QUESTIONS[questionNum - 1][getAnswer];
    // c(answer);
    // c(text);
    if (text === answer) {
      score++;
    }
    // c(score);
    // c("#########");
  }
  work = true;
}