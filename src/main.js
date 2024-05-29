
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.trip-main');

const boardPresenter = new BoardPresenter({container: siteMainElement});

boardPresenter.init();
