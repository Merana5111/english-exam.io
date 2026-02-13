const questions = [
    {
        question:`There were no cookies in the cookie jar. Somebody <span class="line"></span> them all.`,
        answers: [
            {text : "eaten", correct: false},
            {text : "had eaten", correct: true},
            {text : "had eated", correct: false},
            {text : "had ate", correct: false},
        ]
    },
    {
        question:`There house was dirty because nobody <span class="line"></span> it.`,
        answers: [
            {text : "cleant", correct: false},
            {text : "had clean", correct: false},
            {text : "had cleaned", correct: true},
            {text : "had cleant", correct: false},
        ]
    },
    {
        question:`She gave me back my book because she <span class="line"></span> reading it.`,
        answers: [
            {text : "have finished", correct: false},
            {text : "finished", correct: false},
            {text : "had finish", correct: false},
            {text : "had finished", correct: true},
        ]
    },
    {
        question:`When I got home I saw that I <span class="line"></span> the door.`,
        answers: [
            {text : "hadn't locked", correct: true},
            {text : "hadn't lock", correct: false},
            {text : "haven't locked", correct: false},
            {text : "didn't lock", correct: false},
        ]
    },
    {
        question:`I couldn't open the door because I <span class="line"></span> the keys at work.`,
        answers: [
            {text : "forgotten", correct: false},
            {text : "had forgotten", correct: true},
            {text : "had forgot", correct: false},
            {text : "forgot", correct: false},
        ]
    },
    {
        question:`I was worried because Jim. He <span class="line"></span>.`,
        answers: [
            {text : "called", correct: false},
            {text : "hadn't call", correct: false},
            {text : "haven't called", correct: false},
            {text : "hadn't called", correct: true},
        ]
    },
    {
        question:`I could't find the trousers that I <span class="line"></span> in Camden market.`,
        answers: [
            {text : "had bought", correct: true},
            {text : "had bougth", correct: false},
            {text : "had buyed", correct: false},
            {text : "have buyed", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> I <span class="line"></span> a terrible mistake?`,
        answers: [
            {text : "Have / make", correct: false},
            {text : "Have / made", correct: false},
            {text : "Had / made", correct: true},
            {text : "Had / make", correct: false},
        ]
    },
    {
        question:`John asked me if I <span class="line"></span> his dog.`,
        answers: [
            {text : "have saw", correct: false},
            {text : "had seen", correct: true},
            {text : "had saw", correct: false},
            {text : "have seen", correct: false},
        ]
    },
    {
        question:`Joth didn't have his dog. Apparently the dog <span class="line"></span> away during some fireworks.`,
        answers: [
            {text : "had runed", correct: false},
            {text : "had ran", correct: false},
            {text : "had run", correct: true},
            {text : "had runned", correct: false},
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
Тест: English Past Perfect Quiz
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