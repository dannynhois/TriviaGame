const url = 'https://opentdb.com/api.php?amount=10';
var questions;

var numOfCorrectAnswers;
var numOfIncorrectAnswers;
var numOfUnguessed;
var currentQuestion;
var timerQuestion;
var timeRemaining;
var message;
var canClick;

var divMain = document.getElementById('main');
var divChoices = document.getElementById('choices');
var divQuestion = document.getElementById('question');
var divTime = document.getElementById('time');
var divComments = document.getElementById('comments');

// newGame();
document.getElementById('start-button').addEventListener('click', newGame);

function newGame () {
  document.getElementById('start-button').remove();
  // get new set of questions
  fetch(url)
    .then(function (response) {
      response.json().then(function (data) {
        questions = data.results;
        displayQuestion(questions[currentQuestion]);
        divQuestion.classList.remove('hidden');
      });
    });
  numOfCorrectAnswers = 0;
  numOfIncorrectAnswers = 0;
  numOfUnguessed = 0;
  currentQuestion = 0;
}

function displayQuestion (question) {
  canClick = true;
  divTime.classList.remove('hidden');
  divComments.classList.add('hidden');
  // timer logic - time to guess question
  timeRemaining = 15;
  // added to remove delay
  divTime.innerHTML = timeRemaining;
  timerQuestion = setInterval(() => {
    timeRemaining--;
    divTime.innerHTML = timeRemaining;
    if (timeRemaining === 0) {
      // checkanswer passing null
      checkAnswer();
    }
  }, 1000);

  // create random position for correct answer
  var random = Math.floor(Math.random() * question.incorrect_answers.length);

  // create new array full of answers
  question.incorrect_answers.splice(random, 0, question.correct_answer);

  // display question
  divQuestion.innerHTML = '#' + (currentQuestion + 1) + '. ' + question.question + '';
  // display answers
  var html = '';
  question.incorrect_answers.forEach((answer, index) => {
    html = html + '<button class="answer btn btn-lg" value="' + (index === random ? 1 : 0) + '" onclick="checkAnswer(value, this)">' + answer + '</button>';
  });
  divChoices.innerHTML = html;
}

function checkAnswer (guess, button) {
  if (canClick) {
    canClick = false;

    // stop timer question
    divTime.classList.add('hidden');
    clearInterval(timerQuestion);
    // correct guess
    if (guess === '1') {
      // button.classList.add('correct');
      button.style.backgroundColor = 'rgb(101, 214, 12)';
      button.style.color = 'white';
      message = 'Correct. ';
      numOfCorrectAnswers++;
    }
    // wrong guess
    else if (guess === '0') {
      button.style.backgroundColor = 'rgb(194, 52, 52)';
      button.style.color = 'white';
      message = 'Wrong. ';
      numOfIncorrectAnswers++;
    }
    // unguessed
    else {
      message = 'You ran out of Time. ';
      numOfUnguessed++;
    }

    // display correct anwer from object
    message = message + '<div>The correct answers was: ' + questions[currentQuestion].correct_answer + '</div>';
    divComments.innerHTML = message;
    divComments.classList.remove('hidden');
    currentQuestion++;

    setTimeout(nextQuestion, 3000);
  }
}

function nextQuestion () {
  if (currentQuestion === questions.length) {
    message = '<div><p>Correct: ' + numOfCorrectAnswers + '</p>';
    message = message + '<p>Incorrect: ' + numOfIncorrectAnswers + '</p>';
    message = message + '<p>Unanswered: ' + numOfUnguessed + '</p>';
    message = message + "<button id='start-button' class='btn btn-lg btn-primary'>New Game?</button></div>";
    divComments.innerHTML = message;
    divChoices.innerHTML = '';
    document.getElementById('start-button').addEventListener('click', newGame);
    document.getElementById('start-button').classList.add('answer');
  } else {
    displayQuestion(questions[currentQuestion]);
  }
}
