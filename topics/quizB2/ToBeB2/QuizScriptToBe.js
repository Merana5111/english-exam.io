const questions = [
    {
        question:`But how <span class="line"></span> to see her?`,
        answers: [
            {text : "I am", correct: false},
            {text : "am I", correct: true},
            {text : "was I", correct: false},
            {text : "I was", correct: false},
        ]
    },
    {
        question:`I don't know what it <span class="line"></span> about them.`,
        answers: [
            {text : "-", correct: false},
            {text : "were", correct: false},
            {text : "are", correct: false},
            {text : "is", correct: true},
        ]
    },
    {
        question:`We <span class="line"></span> different, that is all.`,
        answers: [
            {text : "are", correct: true},
            {text : "is", correct: false},
            {text : "-", correct: false},
            {text : "was", correct: false},
        ]
    },
    {
        question:`Oh no! <span class="line"></span> I late for the final history exam?`,
        answers: [
            {text : "Is", correct: false},
            {text : "-", correct: false},
            {text : "Are", correct: false},
            {text : "Am", correct: true},
        ]
    },
    {
        question:`How old <span class="line"></span> you? - I <span class="line"></span> twenty-four years old.`,
        answers: [
            {text : "- / am", correct: false},
            {text : "is / am", correct: false},
            {text : "are / am", correct: false},
            {text : "are / was", correct: true},
        ]
    },
    {
        question:`Cathy and Kim <span class="line"></span> very good friends. They like to go shopping together.`,
        answers: [
            {text : "is / -", correct: false},
            {text : "are / are", correct: false},
            {text : "are / -", correct: true},
            {text : "is / is", correct: false},
        ]
    },
    {
        question:`My friend and I <span class="line"></span> both students at the same school.`,
        answers: [
            {text : "am", correct: false},
            {text : "are", correct: true},
            {text : "-", correct: false},
            {text : "is", correct: false},
        ]
    },
    {
        question:`He <span class="line"></span> from Italy, she <span class="line"></span> from Spain, and Miko and Hiro <span class="line"></span> from Japan.`,
        answers: [
            {text : "is / is / are", correct: true},
            {text : "are / is / are", correct: false},
            {text : "are / are / are", correct: false},
            {text : "is / is / is", correct: false},
        ]
    },
    {
        question:`Are you hungry?`,
        answers: [
            {text : "Yes, I are", correct: false},
            {text : "Yes", correct: false},
            {text : "Yes, I am", correct: true},
            {text : "Yes, I is", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> like my cousin, but he <span class="line"></span> always late.`,
        answers: [
            {text : "am / are", correct: false},
            {text : "- / are", correct: false},
            {text : "am / is", correct: false},
            {text : "- / is", correct: true},
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
Тест: English To Be Quiz
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