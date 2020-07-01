/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation),
but do pass them on.
 */

/*
FCC used % 26 and an array of the alphabet to deal with numbers going above the threshold and coming back around
Could have used str.replace(/[A-Z]/g, function(decode letter))
 */
function decodeWord(str) {
    let newWord = [];
    for (let i = 0; i < str.length; i++){
        if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
            if (str.charCodeAt(i) + 13 > 90) {
                newWord[i] = String.fromCharCode(64 + (13 - (90 - str.charCodeAt(i))));
            } else {
                newWord[i] = String.fromCharCode(str.charCodeAt(i) + 13);
            }
        }
        else {
            newWord[i] = str[i];
        }
    }
    return newWord.join("");
}

function rot13(str) {
    let strArr = str.split(" ");
    return strArr.map(function (word) {
        return decodeWord(word);
    }).join(" ");
}


// console.log(decodeWord("SERR!."));
let testArrs = ["SERR PBQR PNZC", "SERR CVMMN!", "SERR YBIR?", "GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."];
for (let i = 0; i < testArrs.length; i++){
    let ans = rot13(testArrs[i]);
    console.log(ans);
}
