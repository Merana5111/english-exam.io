const questions = [
    {
        question:`I know he doesn't like me but I don't understand why he <span class="line"></span> me. I'm not a complete scoundrel!`,
        answers: [
            {text : "shunsing", correct: false},
            {text : "shuns", correct: true},
            {text : "shunes", correct: false},
            {text : "shun", correct: false},
        ]
    },
    {
        question:`Every crisis <span class="line"></span> a challenge and makes us stronger.`,
        answers: [
            {text : "provides", correct: true},
            {text : "provids", correct: false},
            {text : "provide", correct: false},
            {text : "providing", correct: false},
        ]
    },
    {
        question:`Our leader always <span class="line"></span> the best possible results.`,
        answers: [
            {text : "achieve", correct: false},
            {text : "achieving", correct: false},
            {text : "achievs", correct: false},
            {text : "achieves", correct: true},
        ]
    },
    {
        question:`Your report <span class="line"></span> any interesting ideas. It's useless.`,
        answers: [
            {text : "contains", correct: false},
            {text : "containes", correct: false},
            {text : "doesn't contain", correct: true},
            {text : "don't contain", correct: false},
        ]
    },
    {
        question:`My basic skills <span class="line"></span> me to apply for this job. They need more competent specialists.`,
        answers: [
            {text : "allow", correct: false},
            {text : "don't allow", correct: true},
            {text : "doesn't allow", correct: false},
            {text : "allowes", correct: false},
        ]
    },
    {
        question:`Most doctors <span class="line"></span> the problem of obesity on too much junk food.`,
        answers: [
            {text : "blame", correct: true},
            {text : "blaming", correct: false},
            {text : "blams", correct: false},
            {text : "blames", correct: false},
        ]
    },
    {
        question:`Parents often <span class="line"></span> blind eye to what their nasty children do.`,
        answers: [
            {text : "turning", correct: false},
            {text : "turns", correct: false},
            {text : "turn", correct: true},
            {text : "turnes", correct: false},
        ]
    },
    {
        question:`Literacy <span class="line"></span> to the ability to read.`,
        answers: [
            {text : "referes", correct: false},
            {text : "refering", correct: false},
            {text : "refer", correct: false},
            {text : "refers", correct: true},
        ]
    },
    {
        question:`When you <span class="line"></span> your scientific article, you must make sure that you avoid plagiarism.`,
        answers: [
            {text : "submiting", correct: false},
            {text : "submites", correct: false},
            {text : "submit", correct: true},
            {text : "submits", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> you <span class="line"></span> a chalet when you go Switzerland?`,
        answers: [
            {text : "Do / rent", correct: true},
            {text : "Do / rents", correct: false},
            {text : "Does / rent", correct: false},
            {text : "Are / rent", correct: false},
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
Тест: English Present Simple Quiz
Правильных ответов: ${score} из ${questions.length}
Процент: ${Math.round((score/questions.length)*100)}%
Дата: ${new Date().toLocaleDateString('ru-RU')}


`);
    
    
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