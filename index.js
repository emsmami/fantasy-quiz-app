'use strict';

const QUESTIONS = [

  {
    number: 1,
    name: "Q: Andoria",
    answer: "Star Trek",
    Link: "<a href='https://memory-alpha.fandom.com/wiki/Andoria'target='_blank'> Want proof? </a>"
  },
  {
    number: 2,
    name: "Q: Salacious Crumb ",
    answer: "Star Wars",
    Link: "<a href='https://starwars.fandom.com/wiki/Salacious_B._Crumb' target='_blank'> Want proof? </a>"
  },
  {
    number: 3,
    name: "Q: Xemnu",
    answer: "Marvel",
    Link: "<a href='https://marvel.fandom.com/wiki/Xemnu_(Earth-616)' target='_blank'> Want proof? </a>"
  },
  {
    number: 4,
    name: "Q: Sarlaac",
    answer: "Star Wars",
    Link: "<a href='https://starwars.fandom.com/wiki/Sarlacc' target='_blank'> Want proof? </a>"
  },
  {
    number: 5,
    name: "Q: Anduin River",
    answer: "LOTR",
    Link: "<a href='https://lotr.fandom.com/wiki/Anduin' target='_blank'> Want proof? </a>"
  },
  {
    number: 6,
    name: "Q: Guinan",
    answer: "Star Trek",
    Link: "<a href='https://memory-alpha.fandom.com/wiki/Guinan' target='_blank'> Want proof? </a>"
  },
  {
    number: 7,
    name: "Q: Sakaar",
    answer: "Marvel",
    Link: "<a href='https://marvelcinematicuniverse.fandom.com/wiki/Sakaar' target='_blank'> Want proof? </a>"
  },
  {
    number: 8,
    name: "Q: Kashyyk",
    answer: "Star Wars",
    Link: "<a href='https://starwars.fandom.com/wiki/Kashyyyk' target='_blank'> Want proof? </a>"
  },
  {
    number: 9,
    name: "Q: Radagast",
    answer: "LOTR",
    Link: "<a href='https://lotr.fandom.com/wiki/Radagast' target='_blank'> Want proof? </a>"
  },
  {
    number: 10,
    name: "Q: Altamid",
    answer: "Star Trek",
    Link: "<a href='https://memory-alpha.fandom.com/wiki/Altamid' target='_blank'> Want proof? </a>"
  }
];

const RIGHT = [];

const WRONG = [];

//start the quiz
function handleStart() {
  $('#js-start').click(event => {
    event.preventDefault();
    console.log('`handleStartingQuiz` ran');
    //renderFirstQuestion();
    renderQuestion(1);
  });
}

//function that shows the question
function generateQuestion(id) {

  console.log('generateQuestion ran');
  const theQuestion = QUESTIONS.find(item => item.number === id);
  console.log('generate questions id' + id);
  console.log(theQuestion);
  return `
    <section class ="js-questions questions">
        <h4>Question <span id="js-question-number">${theQuestion.number}</span> of 10.</h4>
        <p>${theQuestion.name}</p>
        <ul>
        <li><input type="radio" class="options" name="answerOption" id="answerOption1" value="Star Wars"> Star Wars</li>
        <li><input type="radio" class="options" name="answerOption" id="answerOption2" value="Star Trek"> Star Trek</li>
        <li><input type="radio" class="options" name="answerOption" id="answerOption3" value="LOTR"> Lord of the Rings</li>
        <li><input type="radio" class="options" name="answerOption" id="answerOption4" value="Marvel"> Marvel</li>
        </ul>
      </section> `;

};

function renderQuestion(id) {
  console.log('renderQuestion ran' + id);
  const questionString = generateQuestion(id);
  const verifyButton = generateVerifyButton();
  //insert into DOM
  $('.js-questions').removeClass('offer-to-start-quiz');
  $('#quizzlet').removeClass('next-question');
  $('.js-questions').replaceWith(questionString);
  $('.js-questions').append(verifyButton);
  checkAnswer(id);
};

// loop through an array of objects and find the objects that matches the name key
function findByNumber(id) {
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (QUESTIONS[i].number === id) {
      return QUESTIONS[i];
    }
  };
};


//function that checks the answer and shows button to select the next question then posts the status. 
function checkAnswer(id) {
  $('#verify').click(event => {
    event.preventDefault();
    console.log('`checkAnswer` ran' + id);
    let thisGuess = null;
    let theQuestion = null;
    console.log('guess after null ' + thisGuess);
    console.log('the Question variable prior to loading it ' + theQuestion);
    thisGuess = $("input[name='answerOption']:checked").val();
    //theQuestion =$.grep(QUESTIONS, function(item){ return item.number === id;});
    //theQuestion = QUESTIONS.find(item => item.number === id);
    //attempting to use a separate function to try to limit the redudant runs. 
    theQuestion = findByNumber(id);
    console.log(id);
    console.log(thisGuess);
    console.log(theQuestion);
    renderAnswer(thisGuess, theQuestion);
    disable();
    renderProgress();
  });

}

//run the GenerateAnswer and render it to the DOM, adding Next buttons or Final score button
function renderAnswer(thisGuess, theQuestion) {
  console.log('`renderAnswer` ran');
  const answerString = generateAnswer(thisGuess, theQuestion);
  //insert into DOM
  $('#answer').remove();
  $('.js-questions').prepend(answerString);
  increaseByOne(theQuestion);
};


//create the answer response, add to the RIGHT array if correct, and WRONG array if incorrect and next button
function generateAnswer(thisGuess, theQuestion) {
  const theAnswer = theQuestion.answer;
  console.log('`generateAnswer` ran this Guess is ' + thisGuess + 'theQuestion answer is ' + theAnswer);

  if (thisGuess === theQuestion.answer) {
    RIGHT.push(theQuestion.number);
    console.log('RIGHT array currently consists of ' + RIGHT);
    return `<section class ="js-questions answers" id="answer">
      <span>You Are correct!</span>`;
  } else if (thisGuess !== theQuestion.answer) {
    WRONG.push(theQuestion.number);
    console.log('WRONG array currently consists of ' + WRONG);
    return `<section class ="js-questions answers" id="answer">
          <span>You are incorrect.</span>
          <span>The correct asnwer is ${theQuestion.answer}. ${theQuestion.Link} </span>`;
  };
};

//take the current question number and add one to it for the next question. 
function increaseByOne(theQuestion) {
  const count = theQuestion.number;
  console.log('`increaseByOne` ran with the count at ' + count);
  appendButton(count);
  if (count == 10) {
    finalFeedback();
  } else {
    let nextId = (count + 1);
    console.log('end of `increaseByOne` ran with the next Id as ' + nextId);
    questionPrep(nextId);
  };
};

//add the correct button on the DOM
function appendButton(count) {
  if (count < 10) {
    $('.js-buttons').replaceWith(nextButton);
  } else {
    $('.js-buttons').replaceWith(finalScore);
  };
};


//attach the listener 
function questionPrep(nextId) {
  $('#next').click(event => {
    event.preventDefault();
    console.log('`questionPrep` ran');
    renderQuestion(nextId);
  });
}

//calculate the correct score and percentage score the run them through render. 
function generateProgress() {
  const currentCorrect = RIGHT.length;
  const currentWrong = WRONG.length;
  console.log('`generateProgress` ran');
  return `<section class ="progress">
  <p>You currently have <span class="js-question-number">${currentCorrect} correct </span> and ${currentWrong} incorrect.</p>
  </section>`;
};

//inserts Progress into the DOM
function renderProgress() {
  console.log('`renderProgress` ran');
  $('.progress').remove();
  const myProgress = generateProgress();
  $('#quizzlet').append(myProgress);
};


//creates the verifyButton html
function generateVerifyButton() {
  console.log('`generateVerifyButton` ran');
  return `<section class="js-buttons verify">
    <button type ="submit" id="verify">Verify</button>
    </section>`;
};

//creates the next Button html
function nextButton() {
  return `<section class ="next-question">    
  <button type="submit" id="next">Next Question</button>
  </section>`;
};

//creates the final score button in html
function finalScore() {
  return `<section class="js-buttons next-question final">
  <button type="submit" id="finale">Check Your Final Score</button>
  </section>`;
};

//runs the final feedback DOM replacement
function finalFeedback() {
  $('#finale').click(event => {
    event.preventDefault();
    console.log('`finalFeedback` ran');
    $('.progress').remove();
    const feedback = generateFeedback();
    $('.js-questions').replaceWith(feedback);
    $('.progress').append(`<section class ="js-questions restart offer-to-start-quiz">
     <p>Want to try again?</p>
      <button type ="submit" id="js-start">Re-start Quest</button> 
      </section>`);
  });
};

//Snarky feednack based on percentage
function generateFeedback() {
  console.log('`generateFeedback` ran')
  const currentCorrect = RIGHT.length;
  const currentWrong = WRONG.length;
  const currentPercent = (currentCorrect / currentWrong) * 100;
  if (currentPercent <= 30) {
    return `<section class = "progress">
    <p>Your final score was ${currentCorrect} correct and ${currentWrong} wrong.</p>
    <p>For a final percentage of ${currentPercent}</p>
    <p class='snark'> Did you even try? </p></section>`;
  } else if (currentPercent > 30 && currentPercent < 70) {
    return `<section class = "progress">
    <p>Your final score was ${currentCorrect} correct and ${currentWrong} wrong.</p>
    <p>For a final percentage of ${currentPercent}</p>
    <p class='snark'> You are showing potential young padawan.</p>
     </section>`;
  } else if (currentPercent >= 70 && currentPercent < 100) {
    return `<section class = "progress">
    <p>Your final score was ${currentCorrect} correct and ${currentWrong} wrong.</p>
    <p>For a final percentage of ${currentPercent}</p>
    <p class='snark'> Nice Work Captain Nerd. </p>
    </section>`;
  } else if (currentPercent = 100) {
    return `<section class = "progress">
    <p>Your final score was ${currentCorrect} correct and ${currentWrong} wrong.</p>
    <p>For a final percentage of ${currentPercent}</p>
    <p class='snark'> Its official you have been entered into the Hall of Nerdom. </p>
    </section>`;
  } else {
    return `<section class = "progress">
  Your final score was ${currentCorrect} correct and ${currentWrong} wrong. `;
  };
};

//Don't let people change the answer after they are corrected. 
function disable() {
  document.getElementById("answerOption1").disabled = true;
  document.getElementById("answerOption2").disabled = true;
  document.getElementById("answerOption3").disabled = true;
  document.getElementById("answerOption4").disabled = true;
}

function undisable() {
  document.getElementById("answerOption").disabled = false;
}




function handleQuiz() {
  handleStart();

}

$(handleQuiz());