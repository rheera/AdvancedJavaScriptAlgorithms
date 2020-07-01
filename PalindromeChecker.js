/*
Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward,
ignoring punctuation, case, and spacing.

Note
You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and
turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".
 */

function palindrome(str) {
    // remove all non-alphanumerics and _'s and turning the string into lowercase
    str = str.toLowerCase().replace(/\W|_/g, "");
    // if the string is odd remove the middle char since it doesn't matter what it is
    let oddStr = [];
    if (str.length % 2 != 0){
        oddStr = str.split("");
        oddStr.splice(oddStr.length/2, 1);
        str = oddStr.join("");
    }
    // if the first and last characters are not the same return false
    // then move to the second and second last etc.
    // i only needs to go up to half the array 
    for (let i = 0; i < str.length/2; i++){
        if (str[i] != str[str.length-i-1]){
            return false;
        }
    }
    return true;
}

let testArrs = ['eye', "_eye", "race car", "not a palindrome", "A man, a plan, a canal. Panama", "never odd or even",
    "almostomla", "My age is 0, 0 si ega ym.", "My age is 0, 0 si ega ym.", "0_0 (: /-\ :) 0-0", "five|\_/|four"];
for (let i = 0; i < testArrs.length; i++){
    let ans = palindrome(testArrs[i]);
    console.log(ans);
}
