const questions = [
    {
        question:`Everything on the menu looks delicious! Erm... I <span class="line"></span> Chicken Kiev, please.`,
        answers: [
            {text : "will having", correct: false},
            {text : "will has", correct: false},
            {text : "will have", correct: true},
            {text : "will had", correct: false},
        ]
    },
    {
        question:`This year, more than a million tourists <span class="line"></span> our local area.`,
        answers: [
            {text : "will visit", correct: true},
            {text : "will visiting", correct: false},
            {text : "will visited", correct: false},
            {text : "won't visit", correct: false},
        ]
    },
    {
        question:`One day, people <span class="line"></span> on Mars in special buildings.`,
        answers: [
            {text : "will living", correct: false},
            {text : "will life", correct: false},
            {text : "will lived", correct: false},
            {text : "will live", correct: true},
        ]
    },
    {
        question:`No, there <span class="line"></span> any problems with delivering your new furniture next week.`,
        answers: [
            {text : "won't was", correct: false},
            {text : "won't be", correct: true},
            {text : "won't been", correct: false},
            {text : "won't were", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> we <span class="line"></span> at six to help you get things ready for dinner?`,
        answers: [
            {text : "Will / caming", correct: false},
            {text : "Will / coming", correct: false},
            {text : "Will / come", correct: true},
            {text : "Will / came", correct: false},
        ]
    },
    {
        question:`I'm sure you <span class="line"></span> your driving test. Don't worry.`,
        answers: [
            {text : "will pass", correct: true},
            {text : "won't passes", correct: false},
            {text : "won't pass", correct: false},
            {text : "will passes", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> this day for the rest of my life!`,
        answers: [
            {text : "will remembering", correct: false},
            {text : "will remembers", correct: false},
            {text : "won't remembers", correct: false},
            {text : "will remember", correct: true},
        ]
    },
    {
        question:`Oscar says he <span class="line"></span> the washing-up after dinner.`,
        answers: [
            {text : "will doing", correct: false},
            {text : "will do", correct: true},
            {text : "will does", correct: false},
            {text : "is doing", correct: false},
        ]
    },
    {
        question:`If you want to, I <span class="line"></span> to the manager about it.`,
        answers: [
            {text : "will complain", correct: true},
            {text : "will complaining", correct: false},
            {text : "will complains", correct: false},
            {text : "am going to complain", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> you <span class="line"></span> me some money until Saturday?`,
        answers: [
            {text : "Will / lends", correct: false},
            {text : "Will / lendes", correct: false},
            {text : "Will / lend", correct: true},
            {text : "Will / lending", correct: false},
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
Тест: English Future Simple Quiz
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