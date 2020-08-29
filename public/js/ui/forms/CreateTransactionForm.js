class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    if (user) {
      let promise = Account.list(user);

      promise.then((response) => {
        if (response.success) {
          let incomeSelect = document.getElementById('income-accounts-list'),
            expenseSelect = document.getElementById('expense-accounts-list');

          let options = '';
          for (let item of response.data) {
            options += `<option value="${item.id}">${item.name}</option>`;
          }

          incomeSelect.innerHTML = options;
          expenseSelect.innerHTML = options;
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    let promise = Transaction.create(options);

    promise.then((response) => {
      if (response.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else {
        console.log(response.error);
      }
    });
  }
}
