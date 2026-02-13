const questions = [
    {
        question:`Can I stay here tonight? I have <span class="line"></span> to go.`,
        answers: [
            {text : "somewhere", correct: false},
            {text : "anywhere", correct: false},
            {text : "nowhere", correct: true},
            {text : "everywhere", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> robbed a bank yesterday. They took a lot of money.`,
        answers: [
            {text : "Somebody", correct: true},
            {text : "Anybody", correct: false},
            {text : "Nobody", correct: false},
            {text : "Everybody", correct: false},
        ]
    },
    {
        question:`I can't find my keys <span class="line"></span>.`,
        answers: [
            {text : "somewhere", correct: false},
            {text : "nowhere", correct: false},
            {text : "everywhere", correct: false},
            {text : "anywhere", correct: true},
        ]
    },
    {
        question:`<span class="line"></span> was at the party; all our friends and family were there.`,
        answers: [
            {text : "Anybody", correct: false},
            {text : "Everybody", correct: true},
            {text : "Somebody", correct: false},
            {text : "Nobody", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> is big in New York; the streets, the buildings, the cars, even the hamburgers.`,
        answers: [
            {text : "Everything", correct: true},
            {text : "Nothing", correct: false},
            {text : "Anything", correct: false},
            {text : "Something", correct: false},
        ]
    },
    {
        question:`The museum is free. It doesn't cost <span class="line"></span> to go in.`,
        answers: [
            {text : "everything", correct: false},
            {text : "something", correct: false},
            {text : "anything", correct: true},
            {text : "nothing", correct: false},
        ]
    },
    {
        question:`Jenny hasn't got <span class="line"></span> to play with.`,
        answers: [
            {text : "somebody", correct: false},
            {text : "anybody", correct: true},
            {text : "nobody", correct: false},
            {text : "everybody", correct: false},
        ]
    },
    {
        question:`Kelly hasn't got <span class="line"></span> to write on.`,
        answers: [
            {text : "nothing", correct: false},
            {text : "something", correct: false},
            {text : "everything", correct: false},
            {text : "anything", correct: true},
        ]
    },
    {
        question:`Jerry is living in Canada now <span class="line"></span> near Vancouver.`,
        answers: [
            {text : "somewhere", correct: true},
            {text : "anywhere", correct: false},
            {text : "nowhere", correct: false},
            {text : "everywhere", correct: false},
        ]
    },
    {
        question:`I know <span class="line"></span> about your town. Will you tell me something about it?`,
        answers: [
            {text : "something", correct: false},
            {text : "nothing", correct: true},
            {text : "everything", correct: false},
            {text : "anything", correct: false},
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
Тест: English Anything Something etc. Quiz
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

function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
}