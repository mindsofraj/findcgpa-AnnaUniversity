
const memeImageChecker = function(result, semester) { 
         if (semester == 0) {
           return 6;
         }
        if ( result >= 9) { 
            return 1;
         }else if (result >= 8) { 
             return 2;
         }else if (result >= 7) {
             return 3;
         }else if (result >= 5) {
             return 4;
         }else if (result <= 5 && result >= 0.1) {
             return 5;  
        }else {
            return 6;
        }
}
 
module.exports = memeImageChecker;