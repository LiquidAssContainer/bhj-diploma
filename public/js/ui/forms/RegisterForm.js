class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    let promise = User.register(options);

    promise.then((response) => {
      if (response.success) {
        App.setState('user-logged');
        App.getModal('register').close();
      }
    });
  }
}
