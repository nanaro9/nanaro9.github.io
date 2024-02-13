let questions = [
    {
        numb: 1,
        question: "",
        answer: "",
        options: [
            "",
            "",
        ]
    },
    {
        numb: 2,
        question: "",
        answer: "",
        options: [
            "",
            "",
        ]
    },
    {
        numb: 3,
        question: "",
        answer: "",
        options: [
            "",
            ""
        ]
    },
    {
        numb: 4,
        question: "",
        answer: "",
        options: [
            "",
            ""
        ]
    },
    {
        numb: 5,
        question: "",
        answer: "",
        options: [
            "",
            ""
        ]
    },
];

let qc = 1;
let q5 = 0;
creationBtn.onclick = () => {
    let questionInput_val = document.getElementById('questionInput').value;
    let AnswerInput1_val = document.getElementById('AnswerInput1').value;
    let AnswerInput2_val = document.getElementById('AnswerInput2').value;
    let correctAnswer1 = document.getElementById('correctAnswer1');
    let correctAnswer2 = document.getElementById('correctAnswer2');
    let progressText = document.querySelector('.create-progress');

    if (questionInput_val!="" && AnswerInput1_val!="" && AnswerInput2_val!="" && qc <= 5){
        if (qc==4 && creationBtn.textContent != "Izveidot"){
            creationBtn.textContent = "Izveidot"
        }
        if(correctAnswer1.checked && !correctAnswer2.checked){
            questions[qc-1].question = questionInput_val;
            questions[qc-1].answer = AnswerInput1_val;
            let optionFirst = Math.floor(Math.random() * 2) + 1;
            if(optionFirst==1){
                questions[qc-1].options = [AnswerInput1_val,AnswerInput2_val];
            }else{
                questions[qc-1].options = [AnswerInput2_val,AnswerInput1_val];
            }
            document.getElementById('questionInput').value="";
            document.getElementById('AnswerInput1').value="";
            document.getElementById('AnswerInput2').value="";
            correctAnswer1.checked = false;
            correctAnswer2.checked = false;
            if (qc < 5){
                qc++
                progressText.textContent = qc + ". Jautājums no 5";
            }
            if(qc==5 && creationBtn.textContent == "Izveidot"){
                if(q5==1){
                    document.title = "Victoryna | Viktorīna"
                    sessionStorage.setItem('myArray', JSON.stringify(questions));
                    location.href = "quiz0/quiz.html"
                }else{
                    q5++
                }
            }
        }else if(!correctAnswer1.checked && correctAnswer2.checked){
            questions[qc-1].question = questionInput_val;
            questions[qc-1].answer = AnswerInput2_val;
            let optionFirst = Math.floor(Math.random() * 2) + 1;
            if(optionFirst==1){
                questions[qc-1].options = [AnswerInput1_val,AnswerInput2_val];
            }else{
                questions[qc-1].options = [AnswerInput2_val,AnswerInput1_val];
            }
            document.getElementById('questionInput').value="";
            document.getElementById('AnswerInput1').value="";
            document.getElementById('AnswerInput2').value="";
            correctAnswer1.checked = false;
            correctAnswer2.checked = false;
            if (qc < 5){
                qc++
                progressText.textContent = qc + ". Jautājums no 5";
            }
            if(qc==5 && creationBtn.textContent == "Izveidot"){
                if(q5==1){
                    document.title = "Victoryna | Viktorīna"
                    sessionStorage.setItem('myArray', JSON.stringify(questions));
                    location.href = "quiz0/quiz.html"
                }else{
                    q5++
                }
            }
        }else{
            console.log("checkboxes are either checked or neither checked");
        }
    }
}