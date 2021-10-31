class UI {
  constructor() {
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");

    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");

    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseAmount = document.getElementById("expense-amount");

    this.expenseList = document.getElementById("expense-list");

    this.budgetFeedBack = document.querySelector(".budget-feedback");
    this.expenseNameFeedback = document.querySelector(".expense-NameFeedback");
    this.expenseValueFeedback = document.querySelector(
      ".expense-valueFeedback"
    );

    this.itemList = [];
    this.itemId = 0;
  }
  removerAviso() {
    setTimeout(
      function () {
        this.budgetFeedBack.style.display = "none";
      }.bind(this),
      3000
    );
  }

  submitBudgetForm() {
    const budgetInput = this.budgetInput.value;
    if (budgetInput === "" || budgetInput < 0) {
      this.budgetFeedBack.classList.add("showItem");
      this.budgetFeedBack.style.display = "block";

      this.budgetFeedBack.innerHTML = `<p>Seu orçamento não pode fica vazio ou negativo</p>`;
      this.removerAviso(this);
    } else {
      this.budgetAmount.textContent = budgetInput;
      this.budgetInput.value = "";

      this.showBalance();
    }
  }
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;

    if (total < 0) {
      this.balance.classList.remove("showGreen");
      this.balance.classList.add("showRed");
    } else if (total > 0) {
      this.balance.classList.remove("showRed");
      this.balance.classList.add("showGreen");
    } else {
      this.balance.classList.remove("showRed", "showGreen");
    }

    this.balanceAmount.textContent = total;
  }

  submitExpenseForm() {
    const expenseInput = this.expenseInput.value;
    const amountInput = this.amountInput.value;

    if (expenseInput === "") {
      this.expenseNameFeedback.classList.add("showItem");
      this.expenseNameFeedback.style.display = "block";
      this.expenseNameFeedback.innerHTML =
        "<p>Insira um nome para o gasto.</p>";
      this.removerAviso(this);
    } else if (amountInput === "" || amountInput < 0) {
      this.expenseValueFeedback.classList.add("showItem");
      this.expenseValueFeedback.style.display = "block";
      this.expenseValueFeedback.innerHTML =
        "<p>O valor do seu gasto não pode ficar vazio ou negativo.</p>";
      this.removerAviso(this);
    } else {
      let amount = parseInt(amountInput);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemId,
        title: expenseInput,
        amount: amount,
      };
      this.itemId++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  totalExpense() {
    let total = 0;
    let itemList = this.itemList;
    if (itemList.length > 0) {
      total = itemList.reduce((sum, obj) => {
        return (sum += obj.amount);
      }, 0);
    }

    this.expenseAmount.textContent = total;
    return total;
  }

  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");

    div.innerHTML = `
    <p class="list-item">${expense.title}</p>
    <p class="list-item">R$${expense.amount}</p>

    <div class="list-item">
      <a href="#"class="edit-icon" data-id="${expense.id}">
        Editar
      </a>
      <span> | </span>
      <a href="#" class="delete-icon" data-id="${expense.id}">
        Excluir
      </a>
    </div>
    `;
    this.expenseList.appendChild(div);
  }
  editExpense(element) {
    let id = parseInt(element.dataset.id);

    let parent = element.parentElement.parentElement;

    this.expenseList.removeChild(parent);

    let expense = this.itemList.filter((item) => {
      return item.id === id;
    });

    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    let tempList = this.itemList.filter((item) => {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();
  }

  deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement;
    this.expenseList.removeChild(parent);

    let tempList = this.itemList.filter((item) => {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  const ui = new UI();
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });

  expenseList.addEventListener("click", function (event) {
    let element = event.target;

    if (element.classList.contains("edit-icon")) {
      ui.editExpense(element);
    } else if (element.classList.contains("delete-icon")) {
      ui.deleteExpense(element);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
