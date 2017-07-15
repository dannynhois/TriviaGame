// var danny = setInterval(test,3000);
var questions = [
  {
    question: 'What is life?',
    answer: [0, 1, 2, 3],
    correctAnswer: 2
  },
  {
    question: 'What is love?',
    answer: [0, 1, 2, 3],
    correctAnswer: 1
  },
  {
    question: 'Who is the Rockets PG?',
    answer: ['James Harden', 'Chris Paul', 'Pat Bev', 'Michale Jordan'],
    correctAnswer: 0
  }
];

var numOfCorrectAnswers;
var numOfIncorrectAnswers;
var numOfUnguessed;
var currentQuestion;
var timerQuestion;
var timeRemaining;
var message;

var divMain = document.getElementById('main');
var divTime = document.getElementById('time');

newGame();

function newGame () {
  numOfCorrectAnswers = 0;
  numOfIncorrectAnswers = 0;
  numOfUnguessed = 0;
  currentQuestion = 0;

  displayQuestion(questions[currentQuestion]);
}

function displayQuestion (question) {
  // timer logic
  timeRemaining = 5;
  // added to remove delay
  divTime.innerHTML = 'Time remaining: ' + timeRemaining;
  timerQuestion = setInterval(() => {
    timeRemaining--;
    divTime.innerHTML = 'Time remaining: ' + timeRemaining;
    console.log(timeRemaining);
    if (timeRemaining === 0) {
      // checkanswer passing null
      checkAnswer()
    }
  }, 1000);

  // display question
  var html = '<div class="question">' + question.question + '</div>';
  // display answers
  question.answer.forEach((answer, index) => {
    html = html + '<button class="answer btn btn-primary btn-lg btn-block" value="' + (index === question.correctAnswer ? 1 : 0) + '" onclick="checkAnswer(value)">' + answer + '</button>';
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
  message = message + '<div>' + questions[currentQuestion].answer[questions[currentQuestion].correctAnswer] + '</div>';
  divMain.innerHTML = message
  currentQuestion++;

  setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
  if (currentQuestion === questions.length) {
    message = "<div> Congrats! Summary below </div>";
    message = message + '<div><p>Correct: ' + numOfCorrectAnswers + '</p>';
    message = message + '<p>Incorrect: ' + numOfIncorrectAnswers + '</p>';
    message = message + '<p>Unanswered: ' + numOfUnguessed + '</p></div>';
    divMain.innerHTML = message;
  } else {
    displayQuestion(questions[currentQuestion]);
  }
}
