


const button = document.querySelector(".button")

var creditSub = [8,34];
var gradeSub = [43.2,434];

 
    
    const table = document.querySelector("table").rows;
    let tableData = "";

    for (let i = 1; i <= table.length-1; i++){
        tableData = document.querySelector("table").rows[i].cells[0].textContent;
        if(tableData != "PRACTICAL SUBJECTS"){
            console.log(tableData.slice(2,-9));
        }
    }

    for(let i = 1; i <= table.length-2; i++) {    
        const grade = document.getElementById(`gradeSub${i}`);
        creditSub.push(document.getElementById(`creditSub${i}`).valueAsNumber);
        gradeSub.push(grade.options[grade.selectedIndex].text);
    }

    console.log(creditSub);
    console.log(gradeSub);



export {creditSub, gradeSub};

