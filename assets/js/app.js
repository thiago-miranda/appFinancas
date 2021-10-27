class UI {
  constructor(){
    this.budgetInput = document.getElementById('budget-input');
    this.budgetAmount = document.getElementById('budget-amount');

    this.balance = document.getElementById('balancen');
    this.balanceAmount = document.getElementById('balance-amount');

    this.expenseInput = document.getElementById('expense-input');
    this.amountInput = document.getElementById('amount-input');
    this.expenseAmount = document.getElementById('expense-amount');

    this.expenseList = document.getElementById('expense-list');

    this.itemList = [];
    this.itemId = 0;
  }
}

function eventListeners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();
  budgetForm.addEventListener('submit',function(event){
    event.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener('submit',function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  });
}
document.addEventListener('DOMContentLoaded',function(){
  eventListeners();
});