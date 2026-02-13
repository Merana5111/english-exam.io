const questions = [
    {
        question:`The guests <span class="line"></span> a great time at the party when it suddenly started raining.`,
        answers: [
            {text : "having", correct: false},
            {text : "was having", correct: false},
            {text : "were having", correct: true},
            {text : "are having", correct: false},
        ]
    },
    {
        question:`What <span class="line"></span> we <span class="line"></span>?`,
        answers: [
            {text : "were / eaten", correct: false},
            {text : "were / eating", correct: true},
            {text : "was / eating", correct: false},
            {text : "was / eaten", correct: false},
        ]
    },
    {
        question:`William and Claire <span class="line"></span> the project details during lunch.`,
        answers: [
            {text : "was discussing", correct: false},
            {text : "are discussing", correct: false},
            {text : "discussing", correct: false},
            {text : "were discussing", correct: true},
        ]
    },
    {
        question:`Nodoby <span class="line"></span> at the joke; it wasn't funny.`,
        answers: [
            {text : "was laughing", correct: true},
            {text : "were laughing", correct: false},
            {text : "laughing", correct: false},
            {text : "was laugh", correct: false},
        ]
    },
    {
        question:`The dog <span class="line"></span> loudly at the stranger outside.`,
        answers: [
            {text : "aren't barking", correct: false},
            {text : "weren't barking", correct: false},
            {text : "not barking", correct: false},
            {text : "wasn't barking", correct: true},
        ]
    },
    {
        question:`He <span class="line"></span> attention to the teacher.`,
        answers: [
            {text : "paying", correct: false},
            {text : "not paying", correct: false},
            {text : "wasn't paying", correct: true},
            {text : "weren't paying", correct: false},
        ]
    },
    {
        question:`We <span class="line"></span> the cinema.`,
        answers: [
            {text : "were going", correct: false},
            {text : "were going to", correct: true},
            {text : "was going to", correct: false},
            {text : "was going", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> Lily <span class="line"></span> a white dress?`,
        answers: [
            {text : "Was / wearing", correct: true},
            {text : "Was / weared", correct: false},
            {text : "Was / wear", correct: false},
            {text : "Were wearing", correct: false},
        ]
    },
    {
        question:`The parents <span class="line"></span> while the kids <span class="line"></span>.`,
        answers: [
            {text : "was eating / was playing", correct: false},
            {text : "was eating / were playing", correct: false},
            {text : "were eating / was playing", correct: false},
            {text : "were eating / were playing", correct: true},
        ]
    },
    {
        question:`Sue <span class="line"></span> outside the theatre when the performance began.`,
        answers: [
            {text : "were to standing", correct: false},
            {text : "was standing", correct: true},
            {text : "were standing", correct: false},
            {text : "was to standing", correct: false},
        ]
    }
];


function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomNumber(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    
const randomQuestion = questions[getRandomNumber(questions.length)];
console.log(randomQuestion.question);


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const backtomenu = document.getElementById("backtomenu-btn");
const topics = document.getElementById("topics-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    backtomenu.style.display = "none";
    topics.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    backtomenu.innerHTML = "Back to home";
    backtomenu.style.display = "block";
    topics.innerHTML = "Back to topics";
    topics.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        shuffleArray(questions);
        startQuiz();
    }
});

shuffleArray(questions);
startQuiz();



const originalShowScore = showScore;
showScore = function() {
    originalShowScore.call(this);
    
    // Создаем кнопку отправки результатов
    const sendResultsBtn = document.createElement('button');
    sendResultsBtn.id = 'send-results-btn';
    sendResultsBtn.innerHTML = 'Send results';
    sendResultsBtn.style.display = 'block';
    
    // Вставляем кнопку после кнопки "Back to topics"
    const topicsBtn = document.getElementById('topics-btn');
    topicsBtn.parentNode.insertBefore(sendResultsBtn, topicsBtn.nextSibling);
    
    // Добавляем обработчик
    sendResultsBtn.addEventListener('click', openResultsModal);
};

// Функции для работы с модальным окном
function openResultsModal() {
    document.getElementById('resultsModal').style.display = 'flex';
    document.getElementById('studentName').value = '';
    document.getElementById('studentName').focus();
}

function closeModal() {
    document.getElementById('resultsModal').style.display = 'none';
}

// Функция отправки результатов
function sendResultsByEmail() {
    const studentName = document.getElementById('studentName').value.trim();
    const teacherEmail = "mishishiii5@gmail.com"; 
    
    if (!studentName) {
        alert("Please enter your first and last name.");
        return;
    }
    
    // Подсчитываем детали ответов (добавьте эту функцию)
    const answersDetails = getDetailedResults();
    
    // Формируем текст письма
    const subject = encodeURIComponent(`Результаты теста: ${studentName}`);
    const body = encodeURIComponent(
`Уважаемый преподаватель!

📋 Результаты тестирования:

Студент: ${studentName}
Тест: English Past Continuous Quiz
Правильных ответов: ${score} из ${questions.length}
Процент: ${Math.round((score/questions.length)*100)}%
Дата: ${new Date().toLocaleDateString('ru-RU')}


`);
    
    // Создаем mailto ссылку
    const mailtoLink = `mailto:${teacherEmail}?subject=${subject}&body=${body}`;
    
    // Открываем почтовый клиент
    window.location.href = mailtoLink;
    
    // Закрываем окно
    setTimeout(() => {
        closeModal();
        alert("Откроется ваша почта. Пожалуйста, нажмите 'Отправить' в письме.");
    }, 500);
}


// Закрытие модального окна при клике вне его
document.getElementById('resultsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('resultsModal').style.display === 'flex') {
        closeModal();
    }
});

// Функция для получения детальных результатов
function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
}