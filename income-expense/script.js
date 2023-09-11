const transactionsEl = document.querySelector(".transactions");
const balanceNumberEl = document.querySelector(".balance-number");
const numberIncomeEl = document.querySelector(".number--income");
const numberExpensesEl = document.querySelector(".number--expenses");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.querySelector(".input--description");
const inputAmountEl = document.querySelector(".input--amount");

const handleSubmit = (event) => {
  event.preventDefault();
  //getting valuese of the input
  const description = inputDescriptionEl.value;
  const amount = +inputAmountEl.value;

  //create transaction HTML
  const transactionItemHTML = `
        <li class="transaction transaction--${
          amount > 0 ? "income" : "expense"
        }">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">${
              amount > 0 ? "+" : ""
            }${amount}</span>
            <button class="transaction__btn">X</button>
        </li>`;

  transactionsEl.insertAdjacentHTML("beforeend", transactionItemHTML);
  //clear input value
  inputAmountEl.value = "";
  inputDescriptionEl.value = "";

  //blur inputs
  inputAmountEl.blur();
  inputDescriptionEl.blur();

  // update income or expesne
  if (amount > 0) {
    const currenIncomet = +numberIncomeEl.textContent;
    const incomeBalance = currenIncomet + amount;
    numberIncomeEl.textContent = incomeBalance;
  } else {
    const currentExpenses = +numberExpensesEl.textContent;
    const expensesBalance = currentExpenses + amount * -1;
    numberExpensesEl.textContent = expensesBalance;
  }

  //update the balance
  const incomes = +numberIncomeEl.textContent;
  const expenses = +numberExpensesEl.textContent;
  balanceNumberEl.textContent = incomes - expenses;

  //make the balance red if it is negative
  incomes - expenses < 0
    ? (balanceNumberEl.style.color = "red")
    : (balanceNumberEl.style.color = "inherit");
};

const handleDeleteAmount = (event) => {
  // removing the selected transaction visually
  const clickedEl = event.target.parentNode;
  clickedEl.remove();

  // update income or expesne
  const amountEl = clickedEl.querySelector(".transaction__amount");
  const amount = +amountEl.textContent;
  if (amount > 0) {
    const currenIncomet = +numberIncomeEl.textContent;
    const incomeBalance = currenIncomet - amount;
    numberIncomeEl.textContent = incomeBalance;
  } else {
    const currentExpenses = +numberExpensesEl.textContent;
    const expensesBalance = currentExpenses - amount * -1;
    numberExpensesEl.textContent = expensesBalance;
  }

  //update the balance
  const incomes = +numberIncomeEl.textContent;
  const expenses = +numberExpensesEl.textContent;
  balanceNumberEl.textContent = incomes - expenses;
  //make the balance red if it is negative
  incomes - expenses < 0
    ? (balanceNumberEl.style.color = "red")
    : (balanceNumberEl.style.color = "inherit");
};

transactionsEl.addEventListener("click", handleDeleteAmount);
formEl.addEventListener("submit", handleSubmit);
