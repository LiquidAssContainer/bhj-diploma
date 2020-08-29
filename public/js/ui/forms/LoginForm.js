class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    let promise = User.login(options);

    promise.then((response) => {
      if (response.success) {
        App.setState('user-logged');
        App.getModal('login').close();
      } else {
        console.log(response.error);
      }
    });
  }
}
