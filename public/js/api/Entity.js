class Entity {
  static url = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data) {
    return createRequest({
      data,
      method: 'GET',
      url: this.url,
      responseType: 'json',
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data) {
    let modifiedData = Object.assign({ _method: 'PUT' }, data);
    return createRequest({
      data: modifiedData,
      method: 'POST',
      url: this.url,
      responseType: 'json',
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data = {}) {
    return createRequest({
      data,
      method: 'GET',
      url: this.url + '/' + id,
      responseType: 'json',
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '') {
    let data = { _method: 'DELETE', id };
    return createRequest({
      data,
      method: 'POST',
      url: this.url,
      responseType: 'json',
    });
  }
}
