/*
Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

1: I
5: V
10: X
50: L
100: C
500: D
1000: M
 */
function toRoman(symbol, num){
    //let symbols = ['I', 'X', 'C', 'M'];
    let symbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    let roman = [];
    if (num == 0){
        return [];
    }
    if (num < 4){
        for (let i = num; i > 0; i--){
            roman.push(symbols[symbol]);
        }
    }
    let nextSymbol = symbols[symbol + 1];
    if (num == 4){
        roman.push(symbols[symbol]);
        roman.push(nextSymbol);
    }
    if (num == 5){
        roman.push(nextSymbol)
    }
    if (num > 5 && num < 9){
        roman.push(nextSymbol);
        for (let i = num; i > 5; i--){
            roman.push(symbols[symbol]);
        }
    }
    let nextNextSymbol = symbols[symbol + 2];
    if (num == 9){
        roman.push(symbols[symbol]);
        roman.push(nextNextSymbol);
    }
    return roman;
}
function convertToRoman(num) {
    let numArr = num.toString().split("");
    console.log(numArr);
    let finalArr = [];
    let j = 0;
    for (let i = 0; i < numArr.length * 2; i+=2){
        finalArr.unshift(toRoman(i, parseInt(numArr[numArr.length - j - 1])));
        j++;
    }
    return finalArr.join("").replace(/,/g, "");
}

console.log(convertToRoman(12));

console.log(toRoman(4, 4));
