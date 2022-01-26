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

// JS Variables
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

    // Stop the clock if the quiz is over
    if (endOfQuiz) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function showQuizQuestion(index) {
  // Clear the box
  quizContentEl.innerHTML = "";

  //Create h1 for the question
  var h1El = document.createElement("h1");
  h1El.innerHTML = questionsArray[index].question;
  quizContentEl.append(h1El);

  //Create ul
  var ulEl = document.createElement("ul");
  ulEl.style = "list-style-type:none";
  quizContentEl.append(ulEl);

  //Create li for each question answer
  for (var i = 0; i < questionsArray[index].answers.length; i++) {
    //create li
    var liEl = document.createElement("li");
    liEl.classList.add("p-1");
    ulEl.append(liEl);

    //Create button for each li
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
  // Check the submitted answer against the question objects correctAnswer value
  if (answer === questionsArray[questionIndex].correctAnswer) {
    // Run display function to alert user of answer result
    var result = true;
    // Add to the correct answer count
    numberCorrect++;
    displayResult(result);
  } else {
    // Run display function to alert user of answer result
    var result = false;
    // Add to the incorrect answer count
    numberIncorrect++;
    displayResult(result);
    //subtract 10 seconds from time
    secondsLeft = secondsLeft - 10;
  }
}

function displayResult(result) {
  // Unhide the section
  answerResultSectionEl.hidden = false;

  if (result) {
    // Display text of previous answer result
    answerResultEl.textContent = "The previous answer was correct!";
  } else {
    // Display text of previous answer result
    answerResultEl.textContent =
      "The previous answer was incorrect!  Subtracted 10 seconds from your score!!";
  }

  //Clear the result after 1 second
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
    //Remove number from answer selection
    var answer = event.target.textContent.substring(3);

    // Condition to check if this is the last question
    if (questionIndex === questionsArray.length - 1) {
      checkAnswer(answer);
      endOfQuiz = true;
      // go to the final score tally
      endQuiz();
    } else {
      //process the answer
      checkAnswer(answer);
      //display the next question
      questionIndex++;
      showQuizQuestion(questionIndex);
    }
  }
}

function endQuiz() {
  // hide the last displayed quiz question
  quizContentEl.hidden = "true";
  // Show the quiz results content and user initials submission
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
    // See if there are previous scores, if not store the score
    scoresArrayObj.push(scoreAndInitialsObj);
    localStorage.setItem("saved-scores", JSON.stringify(scoresArrayObj));
  } else {
    // Get previous scores and store them in scoresArray, add the new score, then save in localStorage
    scoresArrayObj = JSON.parse(localStorage.getItem("saved-scores"));
    scoresArrayObj.push(scoreAndInitialsObj);
    localStorage.setItem("saved-scores", JSON.stringify(scoresArrayObj));
  }

  window.location.href = "./highscores.html";
}


startButtonEl.addEventListener("click", startQuiz);
quizContentEl.addEventListener("click", processQuizAnswer);
submitScoreButtonEl.addEventListener("submit", saveScore);