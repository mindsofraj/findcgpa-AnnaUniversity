

const calculateGpa = function (creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9) {
  //Initializing Arrays
  const creditGradeMul = [];
  const grades = [gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9];
  const credits = [creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9];

  //Using For Loop to get the multiplied values of credit and grade of each subjects   
  for(let i = 0; i < 9; i++){
    switch(grades[i]){
            case "O":{
             creditGradeMul[i] = credits[i] * 10
             break;
            }
            case "A+":{
             creditGradeMul[i] = credits[i] * 9;
             break;
            }
            case "A":{
             creditGradeMul[i] = credits[i] * 8;
             break;
            }
            case "B+":{
             creditGradeMul[i] = credits[i] * 7;
             break;
            }
            case "B":{
             creditGradeMul[i] = credits[i] * 6;
             break;
            }
            case "U":{
             creditGradeMul[i] = 0;
             break;
            }
        }
    }
    
//Adding all the CreditGradeMul values
let sum = 0;
const creditGradeMulSum = function(){
    for (let i = 0; i < creditGradeMul.length; i++){
        sum += creditGradeMul[i];
    }
    return sum;
}

const totalCreditGradeSum = creditGradeMulSum(creditGradeMul);
const totalCredit = creditSub1 + creditSub2 + creditSub3 + creditSub4 + creditSub5 + creditSub6 + creditSub7 + creditSub8 + creditSub9;
//Dividing the creditGradeSum to total credits and Formatting to 3 decimals
resultGpa = parseFloat((totalCreditGradeSum / totalCredit).toFixed(3));

return resultGpa;
}


module.exports = calculateGpa;
