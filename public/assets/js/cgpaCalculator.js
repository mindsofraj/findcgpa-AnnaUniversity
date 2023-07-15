"use strict";

const semCompleted = document.getElementById("semCompleted");
const div = document.getElementById("semList");
const button = document.getElementById("semCompletedBtn");
const cgpaCalcButton = document.getElementById("cgpaBtn");
const resultView = document.getElementById("resultView");
const result = document.getElementById("result");
const resultLabel = document.getElementById("resultLabel");

button.addEventListener('click', function(event) {
    if (!semCompleted.selectedIndex == 0) {
    div.innerHTML = "";
    for (let i = 1; i <= semCompleted.value; i++) {
        const numberField = document.createElement("input");
        numberField.type = "number";
        numberField.step = "any";
        numberField.required = true;
        numberField.id = `gpaList${i}`;
        numberField.placeholder = `Enter Semester ${i} GPA`;
        numberField.autocomplete = "off";
        div.appendChild(numberField);
        }  
        resultView.classList.remove("active");
        cgpaCalcButton.classList.add("active");
        event.preventDefault();
    }
})

cgpaCalcButton.addEventListener('click', function(event) {
    let sum = 0;
    let resultCgpa = 0;
    for (let i = 1; i <= div.children.length; i++) {
         sum += Number(document.getElementById(`gpaList${i}`).value);   
         resultCgpa = parseFloat((sum / div.children.length).toFixed(3));
        }
        
    const arrCheckForEmpty = [];

    for (let i = 0; i < div.children.length; i++) {
        if (div.children[i].value == "") {
            arrCheckForEmpty.push(false);
        }else {
            arrCheckForEmpty.push(true);
        }
    }

    if (!(arrCheckForEmpty.includes(false))) {
        event.preventDefault(); 
        resultView.classList.add("active");
        if (resultCgpa < 1) {
            document.getElementById("resultLabel").style.visibility = "hidden";
            result.classList.remove("no-error");
            result.classList.add("error");
            result.value = "Please Enter the Correct GPA Nanba!";
        }else {
            document.getElementById("resultLabel").style.visibility = "visible";
            result.classList.remove("error");
            result.classList.add("no-error");
            result.value = resultCgpa;
        } 
    } 
    
})




