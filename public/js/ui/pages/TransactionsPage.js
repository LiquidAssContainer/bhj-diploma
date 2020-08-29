class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Error');
    }
    this.element = element;
    this.registerEvents();
    this.lastOptions = '';
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    let options = this.lastOptions;
    this.render(options);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let removeAccBtn = this.element.querySelector('.remove-account');

    removeAccBtn.addEventListener('click', (e) => {
      let id = e.target.dataset.account_id;
      this.removeAccount(id);
    });

    this.element.addEventListener('click', (e) => {
      let btn = e.target.closest('button');
      if (btn && btn.classList.contains('transaction__remove')) {
        this.removeTransaction(btn.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount(account_id) {
    if (confirm('Узнали? Согласны?')) {
      let promise = Account.remove(account_id);

      promise.then((response) => {
        if (response.success) {
          this.clear();
          let active = document.querySelector(`.account[data-id="${account_id}"]`);
          active.remove();
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    if (confirm('Согласны?')) {
      let promise = Transaction.remove(id);
      promise.then((response) => {
        if (response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (!options) {
      return;
    }

    this.lastOptions = options;
    let accountPromise = Account.get(options.account_id);

    accountPromise.then((response) => {
      this.renderTitle(response.data.name);
      let removeAccBtn = this.element.querySelector('.remove-account');
      removeAccBtn.dataset.account_id = options.account_id;
    });

    let transactionPromise = Transaction.list(options);

    transactionPromise.then((response) => {
      this.renderTransactions(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    let title = document.getElementsByClassName('content-title')[0];
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(dateString) {
    let date = new Date(dateString);
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    let formattedDate = date.toLocaleDateString('ru-RU', options);
    formattedDate = formattedDate.replace(',', ' в')
    return formattedDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let date = this.formatDate(item.created_at);
    return `
    <div class="transaction transaction_${item.type.toLowerCase()} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${date}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let html = '';
    for (let item of data) {
      html += this.getTransactionHTML(item);
    }
    let content = document.getElementsByClassName('content')[0];
    content.innerHTML = html;
  }
}
