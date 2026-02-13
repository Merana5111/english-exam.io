const questions = [
    {
        question:`Please don't talk to me. I <span class="line"></span> TV!`,
        answers: [
            {text : "watching", correct: false},
            {text : "is watching", correct: false},
            {text : "am watching", correct: true},
            {text : "watch", correct: false},
        ]
    },
    {
        question:`Look! It <span class="line"></span> again. Why does it always snow so much in Germany?`,
        answers: [
            {text : "snows", correct: false},
            {text : "is snowing", correct: true},
            {text : "snowing", correct: false},
            {text : "snow", correct: false},
        ]
    },
    {
        question:`I have to change my shoes. These <span class="line"></span> me. I'm sure I have a blister.`,
        answers: [
            {text : "kill", correct: false},
            {text : "are killing", correct: true},
            {text : "is killing", correct: false},
            {text : "is killed", correct: false},
        ]
    },
    {
        question:`I feel a bit last. I've just finished a really good novel and now I <span class="line"></span> anything.`,
        answers: [
            {text : "am not reading", correct: true},
            {text : "do not read", correct: false},
            {text : "do not reading", correct: false},
            {text : "are not reading", correct: false},
        ]
    },
    {
        question:`The company <span class="line"></span> its affices to a bigger building next month.`,
        answers: [
            {text : "do moving", correct: false},
            {text : "are moving", correct: false},
            {text : "moves", correct: false},
            {text : "is moving", correct: true},
        ]
    },
    {
        question:`Sarah <span class="line"></span> me when I speak. It's so irritating.`,
        answers: [
            {text : "always interrupt", correct: false},
            {text : "is always interrupting", correct: true},
            {text : "are always interrupting", correct: false},
            {text : "always interrupts", correct: false},
        ]
    },
    {
        question:`Sorry, Emiko can't come to the phone right now. She <span class="line"></span> a bath.`,
        answers: [
            {text : "have", correct: false},
            {text : "having", correct: false},
            {text : "are having", correct: false},
            {text : "is having", correct: true},
        ]
    },
    {
        question:`Plese be quiet! I <span class="line"></span> to study for my math test.`,
        answers: [
            {text : "am trying", correct: true},
            {text : "trying", correct: false},
            {text : "is trying", correct: false},
            {text : "are trying", correct: false},
        ]
    },
    {
        question:`Listen! Someone <span class="line"></span> on the window.`,
        answers: [
            {text : "is knoking", correct: false},
            {text : "is knocking", correct: true},
            {text : "are knocking", correct: false},
            {text : "knocking", correct: false},
        ]
    },
    {
        question:`Excuse me, but you <span class="line"></span> in my seat.`,
        answers: [
            {text : "sitting", correct: false},
            {text : "is sitting", correct: false},
            {text : "are sitting", correct: true},
            {text : "sit", correct: false},
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
Тест: English Present Continuous Quiz
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
// Функция для получения детальных результатов
function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
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