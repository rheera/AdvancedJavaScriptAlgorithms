/*
Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number.
The following are examples of valid formats for US numbers (refer to the tests below for other variants):
555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf.
Your job is to validate or reject the US phone number based on any combination of the formats provided above.
The area code is required. If the country code is provided, you must confirm that the country code is 1.
Return true if the string is a valid US phone number; otherwise return false.
 */

function telephoneCheck(str) {
    // the shortest possible string is 5555555555 (10 length), anything else is rejected
    // longest 1 (555) 555-5555 = 16 length
    if (str.length < 10 || str.length > 16) {
        return false;
    }
    // flag to keep track of brackets
    let bracketCounter = 0;
    // to keep track of how many digits we have
    let digitCounter = 0;
    // take note of what is the first digit, to check country code
    let firstDigit = 0;
    for (let i = 0; i <str.length; i++){
        // if char is a letter
        if (/[^\d\(\)\-\s]/.test(str[i])){
            return false;
        }
        // if it's a digit increase digit counter
        else if (/\d/.test(str[i])){
            digitCounter++;
            // if it's the first digit then note down what it is
            if (digitCounter == 1){
                firstDigit = parseInt(str[i], 10);
            }
        }
        else if (/\(/.test(str[i])){
            // if the bracket is appearing after 4 digits have already been accounted for then fail the test
            if (digitCounter > 4){
                return false;
            }
            // raise flag since we're now looking for the closing bracket
            else if (bracketCounter == 0) {
                bracketCounter++;
            }
            // if the flag has already been raised and another open bracket comes up fail the test
            else {
                return false;
            }
        }
        else if (/\)/.test(str[i])){
            // if the bracket is appearing after 4 digits have already been accounted for then fail the test
            if (digitCounter > 4){
                return false;
            }
            // if the flag was raised it means we were looking for a closing bracket, now we can set it back to 0
            else if (bracketCounter == 1) {
                bracketCounter--;
            }
            // if the flag wasn't raised and we weren't looking for a closing bracket but got one then fail
            else {
                return false;
            }
        }
    }
    // if we have less than 10 digits, or more than 11 ==> fail
    if (digitCounter < 10 || digitCounter > 11){
        return false;
    }
    // if we have 11 digits, we need to check the area code
    else if (digitCounter == 11){
        if (firstDigit != 1){
            return false;
        }
    }
    // if there is an opening bracket that was never closed fail
    else if (bracketCounter != 0){
        return false;
    }
    return true;
}
/*
FCC solution 1
function telephoneCheck(str) {
  var regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  return regex.test(str);
}
 */

function test() {
    let testArrs = ["555-555-5555", "555 123 21a2", "1 555-555-5555", "1 (555) 555-5555", "5555555555", "555-555-5555", "(555)555-5555"];
    for (let i = 0; i < testArrs.length; i++){
        let ans = telephoneCheck(testArrs[i]);
        console.log(ans);
    }
}
test();