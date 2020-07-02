/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price),
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due,
or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change
if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills,
sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
 */
function calculateChange(changeDue, cid){
    // empty array if change due is 0 or not enough funds in the drawer, since no point to calculate it
    if (changeDue == 0 || changeDue > totalCashInDrawer(cid)){
        return [];
    }
    let currencyNames = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"];
    let currencyArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let indexOfChange = 0;
    // if the amount of change is = to a currency ie. $5 then set the index to that value
    if (currencyArr.indexOf(changeDue) != -1) {
        indexOfChange = currencyArr.indexOf(changeDue);
    }
    // if the amount of change isn't in the list add it and set the index to one before
    // this way if we added $11 the index would be for $10
    else if (currencyArr.indexOf(changeDue) == -1){
        currencyArr.push(changeDue)
        currencyArr.sort((a, b) => a-b);
        indexOfChange = currencyArr.indexOf(changeDue) - 1;
    }
    // if the selected currency has no money in it go to one smaller than it
    // ie. we need $11 in change so the index is $10 but we don't have any $10 bills, change the index to $5
    while (cid[indexOfChange][1] == 0){
        indexOfChange--;
        // if we get down to index of 0, which is PENNY, and don't have any that means we didn't have the right amount
        // of bills/coins to make change so return -1
        if (indexOfChange == 0 && cid[indexOfChange][1] == 0){
            return -1;
        }
    }
    // bigBill is the current bill we're on so $11 change would make the big bill $10
    let bigBill = currencyArr[indexOfChange];
    // count keeps track of how many times we used said big bill
    let count = 0;
    // change we need is more than or = to the current bigBill
    // && we have more of the bigBill in the drawer
    while (changeDue >= bigBill && cid[indexOfChange][1] > 0){
        // subtract change due from big bill
        // $11 -> $1 since we give $10 in change, we only have $1 of change left to give
        // round is there to remove floating point errors
        changeDue = Math.round(changeDue * 100)/100 - Math.round(bigBill * 100)/100;
        // subtract the drawer from the big bill amount
        // since we gave the customer $10 we need to remove it from the drawer
        cid[indexOfChange][1] = Math.round(cid[indexOfChange][1] * 100)/100 - Math.round(bigBill * 100)/100;
        count++;
    }
    // return [bill, amount of times we used the bill * the amount the bill is worth]
    // concat with a recursive call to do this all again with the rest of the change
    //so for our example it would be with $1
    return [[currencyNames[indexOfChange], count * bigBill]].concat(calculateChange(changeDue, cid));
}

function totalCashInDrawer(cid){
    // add all the currency sums up
    // to fixed makes it round to 2 decimal places, since I was getting some weird answer with a lot of decimal places
    return cid.reduce((sum, currency) => (sum + currency[1]), 0.0);
}
function checkCashRegister(price, cash, cid) {
    // make a copy of the array since when I tried to return it with 50 pennies there was some weird floating point error...
    let cidCopy = cid.map(x => x.slice());
    let changeDue = cash - price;
    let inDrawer = totalCashInDrawer(cid);
    let calculatedChange = calculateChange(changeDue, cid);
    // if we don't have enough money in drawer or not the right amount of bills/coins
    if (changeDue > inDrawer || calculatedChange[1] == -1){
        return {
            status: "INSUFFICIENT_FUNDS",
            change: []
        };
    }
    // cash in drawer is == change due
    else if (changeDue == inDrawer){
        return {
            status: "CLOSED",
            change: cidCopy
        };
    }
    else {
        return {
            status: "OPEN",
            change: calculatedChange
        };
    }
}


let drawer = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25],
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
