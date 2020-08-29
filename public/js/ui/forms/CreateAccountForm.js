class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    let promise = Account.create(options);

    promise.then((response) => {
      if (response.success) {
        App.getModal('createAccount').close();
        App.getWidget('accounts').update();
        this.element.reset();
      }
    });
  }
}
