// document ready
$(function(){
  console.log('ready document');
  app.init();
});

// VARIABLES
const app = {};
const question = document.getElementById('question');
// convert answer values into an array
const choices = Array.from(document.getElementsByClassName('answer-btn'));
const questionCounterText = document.getElementById('questionCounter');
const timeElapsedText = document.getElementById('timeElapsed');
const scoreText = document.getElementById('score');
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let remainingQuestions = [];

// assigned points for each correct question made 
const correctBonus = 10;
// total questions in the quiz before it stops/restarts
const maxQuestions = 10;

// hide the question text and answer text before the start button is played
// click start quiz button to show first question and possible answers
handleStart = function() {
  $('.play-btn').on('click', function(e) {
    console.log('hello quiz start');
    // prevent browser refresh on button click
    e.preventDefault();
    // hide start quiz button after click
    $('.play-btn').hide();
    // show questions and answers; question completed value; time elapsed value
    $('.ask-question, .answer-btn, .progress-span').show();
    // start time elapsed function
    app.timeClock();
    app.clearScore();
    // set question and score to 0
    questionCounter = 0;
    score = 0
    // take the questions array and assign a duplicated array within remainingQuestions using the ... operator
    remainingQuestions = [...questions];
    console.log(remainingQuestions);
    getNewQuestion();

  })
};

getNewQuestion = () => {
  if (remainingQuestions.length === 0 || questionCounter >= maxQuestions) {
    // end the game
    $('.play-btn').show();
    $('.ask-question, .answer-btn').hide();
    $('#outcome-text').empty();
    app.ClearTimeClock();
    return 
  }

  // generate a random question based on the length of the remaining questions from the array
  questionCounter++;
  questionCounterText.innerText = `Question: ${questionCounter} / ${maxQuestions}`;
  console.log(questionCounter, questionCounterText);
  
  const questionIndex = Math.floor(Math.random() * remainingQuestions.length);
  // take currentQuestion object and find remaining questions from the question index 
  currentQuestion = remainingQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  remainingQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    // ensure an answer cannot be chosen before the question and answer appear properly
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    // set constants to target the clicked answer and find answer based on custom html data attribute
    const myChoice = e.target;
    const myAnswer = myChoice.dataset['number'];

    // create a conditional to apply incorrect/correct answer outputs
    let classToApply = 'incorrect';
    if (myAnswer == currentQuestion.answer) {
      classToApply = 'correct';
      $('#outcome-text').text('Correct!');
    } else {
      $('#outcome-text').text('Not Quite!');
    }

    if (classToApply === 'correct') {
      bumpScore(correctBonus);
    }
    // apply a class based on the clicked on answer using the conditional above 
    myChoice.classList.add(classToApply);
    console.log(classToApply);

    // create a delay to remove the answer class and move to the next question
    setTimeout(() => {
      myChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000)

  });
});

// function to increment the score bonnus
bumpScore = (num) => {
  score = score + num
  scoreText.innerText = ("Score: ") + score;
};

// rest score
app.clearScore = function() {
  scoreText.innerText = ("Score: ") + 0;
}

let timerId = 0

// time elapsed function
app.timeClock = function() {
  console.log('test clock');
  let start = new Date;
  
  timerId = setInterval(function () {
  $('#timeElapsed').text("Time Elapsed: " + Math.round((new Date - start) / 1000) + " s")    
  }, 1000)
  
}

// clear timer
app.ClearTimeClock = function() {
  if (remainingQuestions.length === 0 || questionCounter >= maxQuestions) {
    clearInterval(timerId);
  } else return 
}

// QUESTIONS ARRAY
let questions = [
  {
    question: 'What here is true about JavaScript?',
    choice1: 'JavaScript is an object-oriented scripting language',
    choice2: 'JavaScript is object-oriented programming language',
    choice3: 'JavaScript needs to be compiled',
    choice4: 'JavaScript runs in a virtual machine',
    answer: 1,
  },
  {
    question: 'What is an advantage of JavaScript?',
    choice1: 'Increased interactivity',
    choice2: 'All of the above',
    choice3: 'Less server interaction',
    choice4: 'Richer interfaces',
    answer: 2,
  },
  {
    question: 'How do you create an object in JavaScript?',
    choice1: 'Using a button',
    choice2: 'Using an array literal',
    choice3: 'Using anonymous function',
    choice4: 'Using an object literal',
    answer: 4,
  },
  {
    question: 'What are some data types supported by JavaScript?',
    choice1: 'All of the above',
    choice2: 'Null',
    choice3: 'Boolean',
    choice4: 'Number',
    answer: 1,
  },
  {
    question: 'What is a property?',
    choice1: 'Provides more details on an element like id, type, value etc.', 
    choice2: 'A value that is only a string', 
    choice3: 'The value assigned to the property like type=”text”, value=’Name’, etc.',
    choice4: 'None of the above.',
    answer: 3,
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1,
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: "How do you put a message in the browser's status bar?",
    choice1: "statusbar = 'put your message here'",
    choice2: "window.status('put your message here')",
    choice3: "window.status = 'put your message here'",
    choice4: "status('put your message here')",
    answer: 1,
  },
  {
    question: "How do you find the largest number of 2 and 4?",
    choice1: "Math.ceil(2,4)",
    choice2: "Math.max(2,4)",
    choice3: "ceil(2,4)",
    choice4: "top(2,4)",
    answer: 2,
  },
];

// initialization function
app.init = function() {
  console.log('Initialize app function...');
  handleStart();
}



