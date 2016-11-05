var questions = [{
  question: "Which famous actor played Command Adama in the 2003 reimagining of Battlstar Galactica?",
  choices: ["Patrick Stewart","Idris Elba","Edward James Olmos","Dave Chappelle"],
  correctAnswer: 2
  }, {
    question: "The 1960 film 'The Magnificent Seven' was a remake of which film?",
    choices: ["Seven Samurai","Seven Pirates","13 Assassins","Why was Six Afraid of Seven?"],
    correctAnswer: 0
  }, {
    question: "The War of 1812 took place in which year?"
    choices: ["1812","1996","1988","1244"],
    correctAnswer: 0
  }, {
    question: "Where is the Hoh Rainforest located?"
    choices: ["Brazil", "California", "Hawaii","Washington"],
    correctAnswer: 3
  }, {
    question: "Which cat cannot retract its claws?"
    choices: ["Tiger","Lion","Cheetah","Panther"],
    correctAnswer: 2
  }
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                     
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { 
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    
    $(questionClass).text(question);

    
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

