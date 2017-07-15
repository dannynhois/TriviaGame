const url = 'https://opentdb.com/api.php?amount=10';
var questions;

var numOfCorrectAnswers;
var numOfIncorrectAnswers;
var numOfUnguessed;
var currentQuestion;
var timerQuestion;
var timeRemaining;
var message;

var divMain = document.getElementById('main');
var divTime = document.getElementById('time');

// newGame();
document.getElementById('start-button').addEventListener('click',newGame);

function newGame () {
  // get new set of questions
  fetch(url)
    .then(function (response) {
      response.json().then(function (data) {
        questions = data.results;
        displayQuestion(questions[currentQuestion]);
      });
    });
  numOfCorrectAnswers = 0;
  numOfIncorrectAnswers = 0;
  numOfUnguessed = 0;
  currentQuestion = 0;
}

function displayQuestion (question) {
  // timer logic - time to guess question
  timeRemaining = 15;
  // added to remove delay
  divTime.innerHTML = 'Time remaining: ' + timeRemaining;
  timerQuestion = setInterval(() => {
    timeRemaining--;
    divTime.innerHTML = 'Time remaining: ' + timeRemaining;
    if (timeRemaining === 0) {
      // checkanswer passing null
      checkAnswer();
    }
  }, 1000);

  // create random position for correct answer
  var random = Math.floor(Math.random() * question.incorrect_answers.length);

  // create new array full of answers
  question.incorrect_answers.splice(random,0,question.correct_answer);

  // display question
  var html = '<div class="question">#'+ (currentQuestion+1) + '. ' + question.question + '</div>';
  // display answers
  question.incorrect_answers.forEach((answer, index) => {
    html = html + '<button class="answer btn btn-primary btn-lg btn-block" value="' + (index === random ? 1 : 0) + '" onclick="checkAnswer(value)">' + answer + '</button>';
  });
  divMain.innerHTML = html;
}

function checkAnswer (guess) {
  // stop timer question
  clearInterval(timerQuestion);
  // correct guess
  if (guess === '1') {
    message = 'CORRECT: ';
    numOfCorrectAnswers++;
  }
  // wrong guess
  else if (guess === '0') {
    message = 'WRONG: ';
    numOfIncorrectAnswers++;
  }
  // unguessed
  else {
    message = 'HURRY UP: ';
    numOfUnguessed++;
  }

  // display correct anwer from object
  message = message + '<div>The correct answers was: ' + questions[currentQuestion].correct_answer + '</div>';
  divMain.innerHTML = message;
  currentQuestion++;

  setTimeout(nextQuestion, 3000);
}

function nextQuestion () {
  if (currentQuestion === questions.length) {
    message = '<div> Congrats! Summary below </div>';
    message = message + '<div><p>Correct: ' + numOfCorrectAnswers + '</p>';
    message = message + '<p>Incorrect: ' + numOfIncorrectAnswers + '</p>';
    message = message + '<p>Unanswered: ' + numOfUnguessed + '</p>';
    message = message + "<button id='start-button' class='btn btn-lg btn-primary'>New Game?</button></div>";
    divMain.innerHTML = message;
    document.getElementById('start-button').addEventListener('click',newGame);
  } else {
    displayQuestion(questions[currentQuestion]);
  }
}
