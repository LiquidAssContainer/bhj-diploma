class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let toggleBtn = document.querySelector('.sidebar-toggle');
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let registerBtn = document.querySelector('.menu-item_register');
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    let loginBtn = document.querySelector('.menu-item_login');
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    let logoutBtn = document.querySelector('.menu-item_logout');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();

      let promise = User.logout(User.current());
      promise.then((response) => {
        if (response.success) {
          App.setState('init');
        }
      });
    });
  }
}
