const startBtn = document.querySelector('.btn');
const main = document.querySelector('.hero');
const exitBtn = document.querySelector('.exit-btn')
const chooseBtn = document.querySelector('.choose-btn');
const createBtn = document.querySelector('.create-btn');
const popupInfo = document.querySelector('.popup-info');
const quizSection = document.querySelector('.quiz-section');
const quizMakerSection = document.querySelector('.quiz-maker');
const mainCubesList = document.querySelectorAll('.cube');

const creationBtn = document.querySelector('.continue_btn')

const quiz1Btn = document.querySelector('.quiz1');
const quiz2Btn = document.querySelector('.quiz2');
const quiz3Btn = document.querySelector('.quiz3');
const quiz4Btn = document.querySelector('.quiz4');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

chooseBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    for (let i = 0; i < mainCubesList.length; i++) {
        mainCubesList[i].classList.remove('active');
    }
}

createBtn.onclick = () => {
    quizMakerSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    for (let i = 0; i < mainCubesList.length; i++) {
        mainCubesList[i].classList.remove('active');
    }
}



quiz1Btn.onclick = () => {
    location.href = "quiz1/quiz.html"
}

quiz2Btn.onclick = () => {
    location.href = "quiz2/quiz.html"
}

quiz3Btn.onclick = () => {
    location.href = "quiz3/quiz.html"
}

quiz4Btn.onclick = () => {
    location.href = "quiz4/quiz.html"
}

