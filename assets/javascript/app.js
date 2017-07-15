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
newGame();

function newGame () {
  numOfCorrectAnswers = 0;
  numOfIncorrectAnswers = 0;
  numOfUnguessed = 0;
  currentQuestion = 0;

  displayQuestion(questions[currentQuestion++]);
}

function displayQuestion (question) {
  var html = '<div>' + question.question + '</div>';

  question.answer.forEach((answer, index) => {
    html = html + '<button class="answer" value="' + (index === question.correctAnswer ? 1 : 0) + '" onclick="checkAnswer(value)">' + answer + '</button>';
  });
  document.getElementById('main').innerHTML = html;
}

function checkAnswer (guess) {
  // correct guess
  if (guess === '1') {
    numOfCorrectAnswers++;
  }
  // wrong guess
  else if (guess === '0') {
    numOfIncorrectAnswers++;
  }
  // unguessed
  else {
    numOfUnguessed++;
  }
  if (currentQuestion === questions.length) {
    console.log('game over');
  } else {
    displayQuestion(questions[currentQuestion++]);
  }
  console.log(numOfCorrectAnswers, numOfIncorrectAnswers, numOfUnguessed);
}
