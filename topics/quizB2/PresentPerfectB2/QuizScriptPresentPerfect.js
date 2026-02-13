const questions = [
    {
        question:`They <span class="line"></span> a book.`,
        answers: [
            {text : "have written", correct: true},
            {text : "has written", correct: false},
            {text : "had written", correct: false},
            {text : "were written", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> to the Himalayas, but I'd like to go.`,
        answers: [
            {text : "has been never", correct: false},
            {text : "has never been", correct: false},
            {text : "have been never", correct: false},
            {text : "have never been", correct: true},
        ]
    },
    {
        question:`They <span class="line"></span> a very expensive car.`,
        answers: [
            {text : "has buyed", correct: false},
            {text : "have buyed", correct: false},
            {text : "have bought", correct: true},
            {text : "has bought", correct: false},
        ]
    },
    {
        question:`They <span class="line"></span> married.`,
        answers: [
            {text : "has just got", correct: false},
            {text : "have just got", correct: true},
            {text : "just have got", correct: false},
            {text : "just has got", correct: false},
        ]
    },
    {
        question:`What <span class="line"></span>.`,
        answers: [
            {text : "you has done", correct: false},
            {text : "you have done", correct: false},
            {text : "have you done", correct: true},
            {text : "has you done", correct: false},
        ]
    },
    {
        question:`She <span class="line"></span> a solution.`,
        answers: [
            {text : "already have found", correct: false},
            {text : "already has found", correct: false},
            {text : "has already found", correct: true},
            {text : "have already found", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> a celebrity?`,
        answers: [
            {text : "Has ever you met", correct: false},
            {text : "Have ever you met", correct: false},
            {text : "Has you ever met", correct: false},
            {text : "Have you ever met", correct: true},
        ]
    },
    {
        question:`I think I <span class="line"></span> this picture before.`,
        answers: [
            {text : "have seen", correct: true},
            {text : "has seen", correct: false},
            {text : "have saw", correct: false},
            {text : "has saw", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> abroad?`,
        answers: [
            {text : "Has ever you", correct: false},
            {text : "Have you ever", correct: true},
            {text : "Has you ever", correct: false},
            {text : "Have ever you", correct: false},
        ]
    },
    {
        question:`We <span class="line"></span> the truth since the beginning.`,
        answers: [
            {text : "have known", correct: true},
            {text : "has known", correct: false},
            {text : "have knew", correct: false},
            {text : "has knew", correct: false},
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
Тест: English Present Perfect Quiz
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