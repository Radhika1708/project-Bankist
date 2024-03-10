'use strict';

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2)); // ["c", "d", "e"]
console.log(arr.slice(2, 4)); // ["c", "d"] end parameter is not included
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(1, -2)); // ["b", "c"]  // starting from 1 except till last 2 characters
console.log(arr.slice()); // using slice method to simply create a shallow copy of any array ["a", "b", "c", "d", "e"]
//we also used spread operator to achieve the same result
console.log([...arr]);

// SPLICE- it does change the original array
console.log(arr.splice(2)); //["c", "d", "e"]
console.log(arr); // ["a", "b"]

// REVERSE - also mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // reversed array

// CONCAT - doesn't mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
// or
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('-')); // a-b-c-d-e-f-g-h-i-j

// --------------------------------------------------------------------------------
// at - also works on strings
const arrr = [23, 11, 64];
console.log(arrr[0]); //23
console.log(arrr.at(0)); //23
console.log(arrr[arrr.length - 1]); //64
console.log(arrr.slice(-1)); //64
console.log(arrr.at(-1)); //64
console.log('jonas'.at(0)); // j

//---------------------------------------------------------------------------------
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; //+ are deposited while - are withdrawals

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// OR
movements.forEach(function (movement) {
  // for forEach we need to use callback function(i.e we tell forEach that in each iteration it should log one of these 2 strings)
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ....

// if we want to access the indices
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

movements.forEach(function (movement, i, array) {
  // for forEach we need to use callback function(i.e we tell forEach that in each iteration it should log one of these 2 strings)
  if (movement > 0) {
    console.log(`Movement ${i}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
  }
});

// one fundamental difference b/w 2 of them is that you cannot break out of a forEach loop( break and continue) will not work here
//----------------------------------------------------------------------------------------------------------------------------------------------
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // {"USD", "GBP", "USD"}
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); // USD: USD  \n GBP:GBP \n EUR: EUR
});

currenciesUnique.forEach(function (value, _, map) {
  // _ is used for throwaway variable
  console.log(`${value}: ${value}`); // USD: USD  \n GBP:GBP \n EUR: EUR
});

//-----------------------------------------------------------------------------------
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their
 dog's age, and stored the data into an array (one array for each). For now, they are just
  interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is 
  at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, 
not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that 
copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult 
("Dog number 1 is an adult, and is 5 years old") or a puppy 
("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const shallowJulia = dogsJulia.slice();
  shallowJulia.splice(0, 1);
  shallowJulia.splice(-2);
  const dogs = shallowJulia.concat(dogsKate);
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//---------------------------------------------------------------------------------------------
// map method - it applies operations on original array and returns new array
// filter - filter the element in the original array which satisfy a certain condition (return new array)
// reduce - ("reduces") all array elements down to one single value (e.g. adding all elements together) (no new array, but only the reduced value)

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// doing same above thing using arrow func
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// herewith this map method all we did was to return each of the strings from the callback
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

// FILTER--------------------------------------------------------------------------------------------
const deposits = movements.filter(function (mov) {
  // we return boolean value
  return mov > 0; // and so now only the array elements for which this condn is true will make it simply to deposits array, rest will bw filtered out
});

console.log(deposits);

// same thing using for of
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);

// REDUCE--------------------------------------------------------------------------------------------
const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur; // final value
}, 0); //initial value) //  it has also got a callback function - generally, first parameter is always the current element of the array, sec is current index, and third id the entire array
// but here the first parameter is the 'accumulator' - which is like a snow ball which keeps on accumulating the values

const balance1 = movements.reduce((acc, cur) => acc + cur, 0);

let balance2 = 0;
for (const mov of movements) balance2 += mov;

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and
calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the 
following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
 humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at 
  least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we 
  calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(dog => (dog <= 2 ? 2 * dog : 16 + dog * 4));
  const adults = humanAges.filter(age => age >= 18);
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  // or we can do eg ayg of (2, 3) can be 2/2 + 3/2
  // const average = adults.reduce((acc, age, i, arr)=>acc+age/arr.length, 0);
  return average;
};

//------POWER OF CHAINING METHODS----------------------------------------------------------------------------------
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0); // with this we converted all the deposits to US dollar & added them
// we'll use these things to calculate the statistics of 'IN', 'OUT', 'INTEREST'

//---------FIND METHOD - also accepts a callback function----------------------------------------------------------
const firstWithdrawal = movements.find(mov => mov < 0); ///it will return only the first element that satisfies the condition

// lets work with array objects (accounts)
const account = accounts.find(acc => acc.owner === 'Jessica Davis'); // we want to get an account where the owner is Jessica Davis

//--------SOME & EVERY---------------------------------------------------------------------------------------------
console.log(movements.includes(-130)); // to check whether the element is present or not   returns a boolean value
const annyDeposits = movements.some(mov => mov > 0); // to check for a condition we use 'some'    "          "
// we'll use this functionality to request a loan from the bank

console.log(movements.every(mov => mov > 0)); // false

//---------FLAT & FLATMAP------------------------------------------------------------------------------------------
const ar = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(ar.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // [Array(2), 3, 4, Array(2), 7, 8] // this means flat level goes only one level deep
console.log(arrDeep.flat(2)); // mentioning the level of depths as 2 (1 was default) [1, 2, 3, 4, 5, 6, 7, 8]

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

const overallBalance2 = accounts
  .map(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

//-----------SORT------------------------------------------------------------------------------------------------
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners);
// Numbers
console.log(movements.sort()); // it will not sort them bec sort function works on strings, we can fix this by using callback

movements.sort((a, b) => {
  // ascending order
  if (a > b) return 1;
  else return -1;
});
// instead of above, we can also do
movements.sort((a, b) => a - b);
console.log(movements); // now it would be sorted

// ---------MORE WAYS OF CREATING AND FILLING ARRAY---------------------------------------------------------------
console.log([1, 2, 3, 4, 5]);
console.log(new Array(1, 2, 3, 4, 5)); //in these cases we already have the data
// we can also generate arrays manually

const x = new Array(7);
console.log(x); // create a new array with 7 empty elements (quite weird😅)
// we can call only 1 method on this empty array and that is fill method
x.fill(1); // it will fill the array with all 1's and will mutate the array
// fill(which element to be filled, from what index, till which index)
x.fill(1, 3, 5); //[empty x 3, 1, 1, empty x 2]
// we can also mutate the filled original array

//---Array.from()---- (can refer video 164)
const y = Array.from({ length: 7 }, () => 1); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (cur, i) => i + 1); // cur is current element and the index [1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements_value'));
  console.log(movementsUI); // we'll get all the 8 movements here
  console.log(movementsUI.map(el => el.textContent.replace('€', ''))); //removing the euro sign // ["1300", "70", "-130", ....] notice strings hence, result not proper, u can convert it into string
  // map method worked here bec movementsUI was a real array at this point but map would not have worked on querySelectorAll
});

// NUMBERS AND DATES-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// All the numbers internally are represented as floating numbers
// console.log(23===23.0); // true
console.log(0.1 + 0.2 === 0.3); // false bec 0.1 + 0.2 = 0.3000000000000004

console.log(+'23'); // it is same as console.log(Number('23')) bec with +'23', java does the type coersion // the o/p will be 23
// so in project, we can do the same (rn I am not replacing😅)

// parsing
console.log(Number.parseInt('30px'), 10); // 30 it will parse the int values but the string should start with a number only, i.e it should not like 'e23'
// it also accets a 2nd arg which is radix, 2nd para is optional, but keeping it makes the code bug free

console.log(Number.parseInt(' 2.5rem')); // 2
console.log(Number.parseFloat(' 2.5rem ')); // 2.5

// NaN - (not a nmber)we can check whether it is a number or not
console.log(Number.isNaN(20)); // false since, 20 is a number
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x')); // true (if we try to convert this string to a number, then it will not be a number)
console.log(Number.isNaN(20 / 0)); // false 23/0 is infinity which is also not a number

console.log(Number.isFinite(20 / 0)); // false
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false   // isFinite number is indeed the best way to check if a value is a number

console.log(Number.isInteger(20)); //true
console.log(Number.isInteger(20.0)); // true

//-------MATH & ROUNDING---------------------------------------------------------------------------------------------------------------------------------
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5

console.log(Math.max(5, 8, 23, 11, 2)); // 23
console.log(Math.max(5, 8, '23', 11, 2)); // 23 bec max function does type coercion however it does not parsing
console.log(Math.max(5, 8, '23px', 11, 2)); //NaN
// similarly min

// if u want to calculate the radius of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

console.log(Math.randon()); // value b/w 0 and 1

console.log(Math.trunc(Math.random() * 6) + 1); // b/w 1 and 6

// trunc, round, ceil, floor func... they too do type coersion

// Rounding decimals
console.log((2.7).toFixed(0)); // 3 (string) it always returns a string and not a number
console.log((2.7).toFixed(3)); //2.700
console.log(+(2.345).toFixed(2)); // 2.35 (this will be a number, since we converted it in a number)

// ----------NUMERIC SEPARATORS----------------------------------------------------------------------------------

const diameter = 287_460_000_000;
console.log(diameter); //287460000000 js ignores the underscores

const priceCents = 345_99;
console.log(priceCents); // 34599

const PI = 3.14_15; // we can place underscores between numbers only

console.log(Number('230_000')); // NaN, it will not work
console.log(parseInt('230_000')); //230 (parts in front of underscore)

//--------BIGINT-------------------------------------------------------------------------------------------------

console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // Same as above

console.log(498490328423298498409238409299); // it will give in form of e
console.log(498490328423298498409238409299n); // it will print the number, thsi n basically tranforms the regular number into a bigInt number
console.log(BigInt(498490328423298498409238409299)); // it will not really give the same result but around it

// exceptions
console.log(20n === 20); // false
console.log(20n == 20); // true
console.log(20n == '20'); // true

// also u cannot use math operatins on it
console.log(Math.sqrt(16n)); // error

console.log(16n / 3n); //3n

//-------------CREATING DATES----------------------------------------------------------------------------------------------------------------------------

const now = new Date();
console.log(now); // will print present day, date & time

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0000

console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // converting days to milliseconds // will print Jan 04

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); // 10 (for Nov)
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 (Thurs)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2037-11-19T15:23:00.000Z
console.log(future.getTime()); // 2142256980000 (this huge amount has passed since that date)

console.log(future.setFullYear(2040)); // will change year from 2037 to 2040

// playing more with dates 😁
const futre = new Date(2037, 10, 19, 15, 23);
console.log(Number(futre)); // 2142256980000 (timestamp in milliseconds)
console.log(+futre); // same o/p

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // if not divided, it will give ans in millisec

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)); // 10

// -------Internationalizing numbers-------------------------------------------------------------
const num = 3884764.23;
const options = {
  style: 'unit', // percent, currency (if u take stle as currency, then unit will be completely ignored and but then u need to define currency)
  unit: 'mile-per-hour',
  // useGrouping: false, // if this is used then numbers will be printed as it is without separators
};
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num)); //US: 3,884,764.23 mph
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num)); // Germany: 3.884.764,23 mi/h
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));

// -------------TIMERS - setTimeout() & setInterval()--------------------------------------------------------------------------------------------
setTimeout(() => console.log(`here is your pizza!`), 3000); // this callback func is the first argument of the setTimeout() func, sec arg is millisecond
// msg will be displayed after 3 sec
console.log('Waiting..'); // now the point to note here is that setTimeout() will not stop its continuation
// means waiting will be displayed as soon as we see, and after that here is your pizza! will be printed after 3 sec
// This mechanism is known as 'Asynchronous js'

// we can also pass args
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  'olives',
  'spinach'
);

// above we can also do as
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

// we can also cancel the timeout before the delay has been passed
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // now, the pizza string will not be printed

// we will use this timer to simulate the approval of our loan

// if we want to repeat a process again and again after a interval
setInterval(function () {
  const now = new Date();
  cosnoloe.log(now);
}, 1000); // after every 1 sec date will be printed
