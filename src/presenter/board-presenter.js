
import SortView from '../view/sort.js';
import listView from '../view/tripEventsList.js';
import {render} from '../framework/render.js';
import ListEmpty from '../view/listEmpty.js';
import PointPresenter from './point-presenter.js';
export default class BoardPresenter {
  #tripListComponent = new listView();
  #sortComponent = new SortView();
  #boardPoints = [];
  #listEmpty = new ListEmpty();
  pointPresenters = [];

  #renderPoint(point){

    const pointPresenter = new PointPresenter ({
      pointListContainer: this.container,
      offersModel: this.offersModel
    });

    pointPresenter.init(point, this.closeEditors(this.pointPresenters));
    //TODO: нужно созранить все pointPresenter по аналогии с boardPoints
    this.pointPresenters.push(pointPresenter);
    //TODO: this.pointPresenters.push(pointPresenter)
    //console.log(this.pointPresenters);
  }

  #renderPoints() {
    if(this.#boardPoints.length === 0){
      render(this.#listEmpty, this.container.querySelector('.trip-events__list'));
    } else {
      for (let i = 0 ; i < this.#boardPoints.length; i++){
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  }

  constructor({container, pointModel, offersModel}){
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
  }

  init() {
    this.#boardPoints = [...this.pointModel.element];
    render(this.#sortComponent, this.container);
    render(this.#tripListComponent, this.container);
    this.#renderPoints();
  }

  closeEditors (pointPresenters){
    //TODO: пройтись по pointPresenters и вызвать метод закрытия формы (вызов метода editorToPoint)
    for (let i = 0 ; pointPresenters[i] < pointPresenters.length; i++){
      console.log(pointPresenters[i]);
      pointPresenters.replaceEditorToPoint();
    }
  }
}
