class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Error');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let incomeBtn = document.getElementsByClassName('create-income-button')[0],
      expenseBtn = document.getElementsByClassName('create-expense-button')[0];

    incomeBtn.addEventListener('click', () => {
      App.getModal('newIncome').open();
    });

    expenseBtn.addEventListener('click', () => {
      App.getModal('newExpense').open();
    });
  }
}
