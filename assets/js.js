


var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var questionsEl = document.querySelector('#questions');
var startScreen = document.querySelector('.quiz-intro');
var questionScreen = document.querySelector('.question-screen')
var finishScreen = document.querySelector('.quiz-finish-screen')

var btnAEl = document.querySelector("#button-a");
var btnBEl = document.querySelector("#button-b");
var btnCEl = document.querySelector("#button-c");
var btnDEl = document.querySelector("#button-d");
var feedBackEl = document.querySelector("#feedback");

var timerEl = document.querySelector("#timer");
var startbtnEl = document.querySelector("#startbtn")
var restartbtnEl = document.querySelector("#restartbtn")
var submitBtn = document.querySelector("#submit")

var time = 100;
var score = time;
var remainingtime = "";

document.getElementById("startbtn").addEventListener("click", function(){
    startquiz();

});


var questions = [
    {
        question: 'What HTML command builds a skeleton HTML page?',
        choices: ["html:5", "html:xml", "html", "<html>"],
        correctanswer: 'html:5'
    },
    {
        question: 'What do you use to add a comment to JavaScript',
        choices: ["!!/--Comment", "!--Comment--!", "// Comment", "<!--Comment-->"],
        correctanswer: '// Comment'
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        choices: ["x", "-", "*", "="],
        correctanswer: '='
    },
    {
        question: 'What choice shows x is greater than 5',
        choices: ["x>5", "x<5", "x=5", "5>x"],
        correctanswer: 'x>5'
    }
];

var currentquestionIndex = 0;
function startquiz() {
    startScreen.classList.add("hide");
    questionScreen.classList.remove("hide");
    remainingtime = time;
    valId = setInterval(startTime, 1000);
    setQandA();
};

function setQandA() {
    var currentquestion = questions[currentquestionIndex];
    questionsEl.textContent = currentquestion.question;
    btnAEl.textContent = questions[currentquestionIndex].choices[0];
    btnBEl.textContent = questions[currentquestionIndex].choices[1];
    btnCEl.textContent = questions[currentquestionIndex].choices[2];
    btnDEl.textContent = questions[currentquestionIndex].choices[3];
};

function checkanswer(selectedAnswer) {
    var correctanswer = questions[currentquestionIndex].correctanswer;
    if(selectedAnswer === correctanswer) {
        
        feedBackEl.textContent = "Correct!";
    }
    else {
        
        feedBackEl.textContent = "Incorrect!";
        time-=5
        document.getElementById("timer").innerHTML=time;
    }
    feedBackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedBackEl.setAttribute("class", "feedback hide");
    }, 1000);

    if(currentquestionIndex === questions.length -1) {
        
        endQuiz();
    }
    else {
        currentquestionIndex++;
        setQandA();
    }
};

var startTime = function() {
    if(time>0) {
        time-=1;
        document.getElementById ("timer").innerHTML=time;
    }
    else {
        clearInterval(valId);
        feedBackEl.textContent = "Time's up!";
    }
};

 

var currentquestionIndex = 0; 
function endQuiz() {
    clearInterval(valId);

    finishScreen.classList.remove("hide");
    questionScreen.classList.add("hide");

    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
};




btnAEl.addEventListener("click", function () {
    checkanswer(btnAEl.textContent);
});
btnBEl.addEventListener("click", function () {
    checkanswer(btnBEl.textContent);
});
btnCEl.addEventListener("click", function () {
    checkanswer(btnCEl.textContent);
});
btnDEl.addEventListener("click", function () {
    checkanswer(btnDEl.textContent);
});


// Highscore

function saveHighscore() {
    
    var initialsEl = document.getElementById("initials");
    var initials = initialsEl.value.trim();

   
    if (initials !== "") {
        
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

   
    var newScore = {
        score: time,
        initials: initials
    };

    
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    
    window.location.href = "highscore.html"

    }
}

submitBtn.onclick = saveHighscore;

// Highscore
var highscoresContainer = document.getElementById('highscores');

function getHighscore() {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    console.log(highscores)

    highscoresContainer.innerHTML = ''

    highscores.forEach(highscore => {
        var listItem = document.createElement('li');
        var initials = highscore.initials;
        var score = highscore.score;
        listItem.textContent = 'Initials: ' + initials + ' Highscore: ' + score;
        highscoresContainer.appendChild(listItem)
    })
}

getHighscore()
