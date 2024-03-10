'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// one obj for each account.... Why not map instead of obj? The thing is we're gonna pretend that this
//  data is coming from a Web API & whenever we get data from API, this data usually comes in form of objects
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// starting
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yeserday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0); // on string we are callig padStart func, bec of which it will display 3 to 03
    // const month = `${date.getMonth() + 1}`.padStart(2, 0); // since, this one is 0 based, hence added 1
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // innerHTML returns everything, including the HTML, while textContent returns only the text
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; // if sort is true then sort otherwise same
  movs.forEach(function (mov, i) {
    // now we have to create a HTML, that looks like ....
    // we need to see whether is deposit type or withdrawal type
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    // creating HTML template // below is hard coded data, with our actual movements data
    const html = `  
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>
    `;
    // now we want to find a way to actually add this html onto the webpage here,
    //  we need to attach the html somehow into the container, for this we will use a method 'insertAdjacentHTML'(refer mdn)
    containerMovements.insertAdjacentHTML('afterbegin', html); //we'll call this method on 'movements' element, this method accepts 2 strings, first is the position in which we want to attach HTML & second is the string containing html that we want to insert
    // but in the output along with our array elements we'll see old entries(-378, & 4000) as well, since we are appending and not overriding
    // so this is the first thing to do i.e to empty the entire container & only then we start adding new elements, so, we'll do containerMovements.innerHTML = ''
    // if we would have used 'beforehand', then order of elements would be inverted, each new element would be added after the previous one
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1; //int is interest
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
  // `${interest.toFixed(2)}€`;
};

// computing usernames

// const createUsernames = function (user) {
//   const username = user
//     .toLowerCase()
//     .split(' ')
//     .map(function (name) {
//       return name[0];
//     })
//     .join('');
//   return username;
// };
// console.log(createUsernames('Steven Thomas Williams')); // we want stw
// But now we actually want to compute one username for each of the account holders in our account array, so for that should
// we use the map or forEach method? Well, we do not want to create a new array in this situation, all we want to do is to modify the object i.e. accounts array

// also generalizing it..
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
// console.log(accounts); you can see what it will o/p (it will return account obj with username replaced)

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// func for logout timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print thr remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }

    // decrease 1 sec
    time--;
  };
  // Setting time to 5 minutes
  let time = 30;
  tick();
  // Call the timer after every sec
  const timer = setInterval(tick, 1000);
  return timer;
};
// Event listener - login, pin
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // e is event parameter
  e.preventDefault(); // it will prevent form from submitting
  // console.log('LOG IN'); // if above line is removed then, just for a flash, the message will appear and then disappear as page reloaded
  // & that's bec this is the button in the form element, & so, in HTML the default behaviour is when we click the submit button, is for the page to reload
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // (currentAccount is being checked using optional chaining)
    // Display UI nad welcome message                      //if both username and pin are correct
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`; // displaying the first name
    containerApp.style.opacity = 100;

    // Create current date and time
    // it makes more sense to not define the local manually but instead to simply get it from user's browser, but in this case we will take it from current account
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // 2-digit, long could also be used
      year: 'numeric', //2-digit could also be used
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(
      now // on the formatter we are calling format & in that we are passing the date, we want to format
    );
    // const day = `${now.getDate()}`.padStart(2, 0); // on string we are callig padStart func, bec of which it will display 3 to 03
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // since, this one is 0 based, hence added 1
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // to lose focus in pin field(cursor blinking)

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);

    // reseting timers if requesting loan or transfering money
    clearInterval(timer);
    timer = startLogOutTimer(); // overriding the initial timer
  }
});

// implementing transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // this needs to be used in the form
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // clean the input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // update UI
    updateUI(currentAccount);
  }
});

// request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // Add movement here
    setTimeout(function () {
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // update UI
      updateUI(currentAccount);
      // reseting timers if requesting loan or transfering money
      clearInterval(timer);
      timer = startLogOutTimer(); // overriding the initial timer
    }, 2500);
  }
  inputLoanAmount.value = '';
});

// close account functionality (remove that account)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputCloseUsername.value = '';
});

let sorted = false; // keeping a check of the state so, that if we again click sort, it gets reset
// sort
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // flip
});

//---------------FLOATING NUMBERS---------------------------------------------------------------------------------------
