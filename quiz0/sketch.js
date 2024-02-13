let video;
let detector;
let detections = [];
let people = [];
let left = [];
let right = [];
let score = 0;
var questionarray_passed;

const elements = document.querySelector('.elements')
const next_btn = document.querySelector('.btn');
const line = document.querySelector('.vl');

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  people = [];
  left = [];
  right = [];
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
  for (let i = 0; i < detections.length; i++){
    if (detections[i] && detections[i].label == "person") {
      people.push(detections[i]);
    }
  }
  // console.log(people,detections.length,people.length);

  for (let i = 0; i < people.length; i++) {
    if (people[i].x < 240) {
      right.push(people[i]);
    }
    else{
      left.push(people[i]);
    }
  }

  // console.log(left.length, right.length);

}

function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);
  questionarray_passed = JSON.parse(sessionStorage.myArray)
  showQuestion(questionCount)
  startTimer(timeValue);
  elements.classList.add("show");
  line.style.opacity = "1";
  sessionStorage.clear();
}


function draw() {
  image(video, 0,0);

  // for (let i = 0; i < people.length; i++) {
  //   let object = people[i];
  //   stroke(0, 255, 0);
  //   strokeWeight(4);
  //   noFill();
  //   rect(object.x, object.y, object.width, object.height);
  //   noStroke();
  //   fill(255);
  //   textSize(24);
  //   text(object.label, object.x + 10, object.y + 24);
  // }
}

const quiz = document.querySelector('.hero');
const answerTextA = document.querySelector('.answerA');
const answerTextB = document.querySelector('.answerB');

let questionCount = 0;
let questionLen = 5;

function showQuestion(index) {
  // console.log(questionCount)
  const questionText = document.querySelector('.question');
  questionText.textContent = questionarray_passed[index].numb + ". "+ questionarray_passed[index].question;
  answerTextA.textContent = questionarray_passed[index].options[0];
  answerTextB.textContent = questionarray_passed[index].options[1];
}

function showResult(){
  const scoreText = result_box.querySelector(".score_text");
  let scoreTag = '<span>Apsveicam! Jūs ieguvāt '+ score +' punktus no '+ questionLen +'</span>';
  scoreText.innerHTML = scoreTag;
}

function showAnswer(index){
  let atbilde = questionarray_passed[index].answer;
  let winner
  if (left.length > right.length){
    winner = "LEFT"
  }
  else{
    winner = "RIGHT"
  }
  // console.log(winner)
  if (answerTextA.textContent == atbilde && winner == "LEFT"){
    answerTextA.style.color = "#00ff00";
    score++
  }
  if(answerTextB.textContent == atbilde && winner == "RIGHT"){
    answerTextB.style.color = "#00ff00";
    score++
  }
  if (answerTextB.textContent == atbilde && winner == "LEFT"){
    answerTextB.style.color = "#00ff00";
    answerTextA.style.color = "#ff0000";
  }
  if (answerTextA.textContent == atbilde && winner == "RIGHT"){
    answerTextA.style.color = "#00ff00";
    answerTextB.style.color = "#ff0000";
  }
}

const time_line = document.querySelector(".time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


let timeValue =  15;
let userScore = 0;
let counter

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if(time < 9){ //if timer is less than 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if(time < 0){ //if timer is less than 0
          clearInterval(counter); //clear counter
          timeText.textContent = "Laiks Beidzies!"; //change the time text to time off
          showAnswer(questionCount);
          next_btn.classList.add("show"); //show the next button if user selected any option
      }
  }
}

const questionText = document.querySelector('.question');
const result_box = document.querySelector('.result_box');
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () => {
  location.href = "../index.html";
}

next_btn.onclick = () => {
  if (next_btn.classList.contains("show") && questionCount < 4){
    questionCount++
    answerTextB.style.color = "#ffffff";
    answerTextA.style.color = "#ffffff";
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
    showQuestion(questionCount);
    timeText.textContent = "Atlikušais Laiks!"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  }
  if (questionCount == 4 && next_btn.textContent != "Rezultāti"){
    next_btn.textContent = "Rezultāti";
  }
  if (next_btn.classList.contains("show") && questionCount == 4){
    next_btn.classList.remove("show");
    elements.classList.remove("show");
    line.style.opacity = "0";
    var elem = document.getElementsByTagName("main");
    var videoElem = document.getElementsByTagName("video");
    for (let i = 0; i < elem.length; i++){
      elem[i].remove()
      videoElem[i].remove()
    }
    result_box.classList.add("activeResult");
    showResult()
  }
}