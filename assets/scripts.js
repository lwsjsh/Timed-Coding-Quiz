var startButtonEl = document.getElementById("start");
var startContentEl = document.getElementById("start-quiz");
var quizContentEl = document.getElementById("quiz-questions");
var timerEl = document.getElementById("timer");
var answerResultSectionEl = document.getElementById("answer-result-content");
var answerResultEl = document.getElementById("result-text");
var submitScoreEl = document.getElementById("submit");
var finalScoreEl = document.getElementById("final-score");
var initialsInputEl = document.getElementById("initials");
var submitScoreButtonEl = document.getElementById("submit");
var correctAnswersEl = document.getElementById("correct-answers");
var incorrectAnswersEl = document.getElementById("incorrect-answers");

var quizQuestion1 = {
  question: "Commonly used data types DO NOT include",
  answers: ["strings", "booleans", "alerts", "numbers"],
  correctAnswer: "alerts",
};

var quizQuestion2 = {
  question: "The condition in an if/ else statement is enclosed within ______.",
  answers: ["a box", "sideways mustaches", "parenthesis", "a tightly clenched fist"],
  correctAnswer: "parenthesis",
};


var quizQuestion3 = {
  question:
    "API is an acronym for:",
  answers: ["a perilous interrogation", "a pasty idiot", "a policy instigator", "application programming interface"],
  correctAnswer: "quotes",
};


var quizQuestion4 = {
  question:
    "'DOM' stands for:",
    
    answers: [
    "document object model",
    "dudes on men",
    "dogs over mice",
    "division of mind"
  ],
  correctAnswer: "document object model",
};

var quizQuestion5 = {
  question: "Bootstrap is an example of a CSS ______ :",
  answers: [
      "accessory", 
      "fancy-term", 
      "language", 
      "framework"],
  correctAnswer: "framework",
};


var questionsArray = [
  quizQuestion1,
  quizQuestion2,
  quizQuestion3,
  quizQuestion4,
  quizQuestion5
];

var questionIndex = 0; 
var secondsLeft = 200; 
var endOfQuiz = false;
var resultTimer = 1;
var userScore = "";
var userInitials = "";
var numberCorrect = 0; 
var numberIncorrect = 0;
var scoresArray = []; 
var scoresArrayObj = [];  



function startQuiz() {
  startContentEl.hidden = "true";
  startClock();
  shuffle(questionsArray);
  showQuizQuestion(0);
}

function startClock() {
  var timerInterval = setInterval(function () {
    // Set the time and subtract each loop
    timerEl.textContent = secondsLeft;
    secondsLeft--;

    
    if (endOfQuiz) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function showQuizQuestion(index) {
  
  quizContentEl.innerHTML = "";

  
  var h1El = document.createElement("h1");
  h1El.innerHTML = questionsArray[index].question;
  quizContentEl.append(h1El);

  
  var ulEl = document.createElement("ul");
  ulEl.style = "list-style-type:none";
  quizContentEl.append(ulEl);

  for (var i = 0; i < questionsArray[index].answers.length; i++) {
    
    var liEl = document.createElement("li");
    liEl.classList.add("p-1");
    ulEl.append(liEl);

    
    var buttonEl = document.createElement("button");
    var questionNumber = i + 1;
    buttonEl.classList.add("btn");
    buttonEl.classList.add("btn-info");
    buttonEl.textContent =
      questionNumber + ". " + questionsArray[index].answers[i];
    liEl.append(buttonEl);
  }
}

function checkAnswer(answer) {
  
  if (answer === questionsArray[questionIndex].correctAnswer) {
    
    var result = true;
    
    numberCorrect++;
    displayResult(result);
  } else {
    
    var result = false;
    
    numberIncorrect++;
    displayResult(result);
    
    secondsLeft = secondsLeft - 10;
  }
}

function displayResult(result) {
   
  answerResultSectionEl.hidden = false;

  if (result) {
    
    answerResultEl.textContent = "correct";
  } else {
    
    answerResultEl.textContent =
      "incorrect";
  }

  
  var timerInterval = setInterval(function () {
    if (resultTimer === 0) {
      clearInterval(timerInterval);
      answerResultSectionEl.hidden = true;
      answerResultEl.textContent = "";
    }

    resultTimer--;
  }, 1000);

  resultTimer = 1;
}

function processQuizAnswer(event) {
  if (event.target.matches("button")) {
   
    var answer = event.target.textContent.substring(3);

    
    if (questionIndex === questionsArray.length - 1) {
      checkAnswer(answer);
      endOfQuiz = true;
     
      endQuiz();
    } else {
     
      checkAnswer(answer);
     
      questionIndex++;
      showQuizQuestion(questionIndex);
    }
  }
}

function endQuiz() {
  
  quizContentEl.hidden = "true";
  submitScoreEl.removeAttribute("hidden");
  finalScoreEl.textContent = secondsLeft;
  correctAnswersEl.textContent = numberCorrect;
  incorrectAnswersEl.textContent = numberIncorrect;
}

function saveScore(event) {
  event.preventDefault();
  var userInitials = initialsInputEl.value;
  var finalScore = finalScoreEl.textContent;
  var scoreAndInitialsObj = { name: "", score: 0 };

  scoreAndInitialsObj.name = userInitials;
  scoreAndInitialsObj.score = finalScore;

  if (localStorage.getItem("saved-scores") === null) {
    
    scoresArrayObj.push(scoreAndInitialsObj);
    localStorage.setItem("saved-scores", JSON.stringify(scoresArrayObj));
  } else {
    
    scoresArrayObj = JSON.parse(localStorage.getItem("saved-scores"));
    scoresArrayObj.push(scoreAndInitialsObj);
    localStorage.setItem("saved-scores", JSON.stringify(scoresArrayObj));
  }

  window.location.href = "./highscores.html";
}


startButtonEl.addEventListener("click", startQuiz);
quizContentEl.addEventListener("click", processQuizAnswer);
submitScoreButtonEl.addEventListener("submit", saveScore);