class User {
  static url = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let user = localStorage.user;
    return user ? JSON.parse(user) : undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data) {
    let options = {
      data,
      method: 'GET',
      url: this.url + '/current',
      responseType: 'json',
    };

    let promise = createRequest(options);

    promise.then((response) => {
      if (response.success) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
    });

    return promise;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data) {
    let options = {
      data,
      method: 'POST',
      url: this.url + '/login',
      responseType: 'json',
    };

    let promise = createRequest(options);

    promise.then((response) => {
      if (response.success) {
        let { id, name } = response.user;
        User.setCurrent({ id, name });
      } else {
        console.log(response.error);
      }
    });

    return promise;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data) {
    let options = {
      data,
      method: 'POST',
      url: this.url + '/register',
      responseType: 'json',
    };

    let promise = createRequest(options);

    promise.then((response) => {
      if (response.success) {
        let { id, name } = response.user;
        User.setCurrent({ id, name });
      } else {
        console.log(response.error);
      }
    });

    return promise;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data) {
    let options = {
      data,
      method: 'POST',
      url: this.url + '/logout',
      responseType: 'json',
    };

    let promise = createRequest(options);

    promise.then((response) => {
      if (response.success) {
        User.unsetCurrent();
        App.getPage('transactions').lastOptions = '';
      }
    });

    return promise;
  }
}
