import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../render.js';
import {humanizeEventDate} from '../utils.js';


function createNewEvent(point, offers){

  const dateStartHours = humanizeEventDate(point.date_from, 'HH:mm'); // 00:00
  const dateStartDate = humanizeEventDate(point.date_from, 'MMM:DD'); // MON 00
  const dateEndHours = humanizeEventDate(point.date_to, 'HH:mm');

  return `
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateStartDate}"><ya-tr-span data-index="41-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${dateStartDate}" data-translation="${dateStartDate}" data-ch="1" data-type="trSpan" style="visibility: initial !important;">${dateStartDate}</ya-tr-span></time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Значок типа события">
                </div>
                <h3 class="event__title"><ya-tr-span data-index="42-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${point.type} Chamonix" data-translation="${point.type} в ${point.destination}" data-ch="0" data-type="trSpan" style="visibility: initial !important;">${point.type} в ${point.destination}</ya-tr-span></h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateStartHours}"><ya-tr-span data-index="43-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${dateStartHours}" data-translation="${dateStartHours}" data-ch="0" data-type="trSpan" style="visibility: initial !important;">${dateStartHours}</ya-tr-span></time><ya-tr-span data-index="43-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value=" — " data-translation=" — " data-ch="0" data-type="trSpan" style="visibility: initial !important;">  —  </ya-tr-span><time class="event__end-time" ${dateEndHours}"><ya-tr-span data-index="43-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${dateEndHours}" data-translation="${dateEndHours}" data-ch="0" data-type="trSpan" style="visibility: initial !important;">${dateEndHours}</ya-tr-span></time>
                  </p>
                  <p class="event__duration"><ya-tr-span data-index="44-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="40M" data-translation="40 м" data-ch="0" data-type="trSpan" style="visibility: initial !important;">40 м</ya-tr-span></p>
                </div>
                <p class="event__price"><ya-tr-span data-index="45-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value=" € " data-translation=" € " data-ch="0" data-type="trSpan" style="visibility: initial !important;">  € </ya-tr-span><span class="event__price-value"><ya-tr-span data-index="45-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${point.base_price}" data-translation="${point.base_price}" data-ch="0" data-type="trSpan" style="visibility: initial !important;">${point.base_price}</ya-tr-span></span>
                </p>
                <h4 class="visually-hidden"><ya-tr-span data-index="46-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Offers:" data-translation="Предложения:" data-ch="1" data-type="trSpan" style="visibility: initial !important;">Предложения:</ya-tr-span></h4>
                <ul class="event__selected-offers">
                //TODO: в списке точек маршрута нужно выводить только выбранные офферы
                  ${createInformationForOffers(filterOffers(offers, point.type))}
                </ul>
                <button class="event__favorite-btn ${point.is_favorite}" type="button">
                  <span class="visually-hidden"><ya-tr-span data-index="48-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Add to favorite" data-translation="Добавить в избранное" data-ch="1" data-type="trSpan" style="visibility: initial !important;">Добавить в избранное</ya-tr-span></span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden"><ya-tr-span data-index="48-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Open event" data-translation="Открытое мероприятие" data-ch="1" data-type="trSpan" style="visibility: initial !important;">Открытое мероприятие</ya-tr-span></span>
                </button>
              </div>
            </li>
          `;
}

function filterOffers (offers, type){
  const filtredOffer = offers.find((offer) => offer.type === type);
  return filtredOffer;
}

function createInformationForOffers (offersForInformation) {
  return offersForInformation.offers.map((offer) =>
    `<li class="event__offer">
                    <span class="event__offer-title"><ya-tr-span data-index="47-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${offer.title}" data-translation="${offer.title}" data-ch="0" data-type="trSpan" style="visibility: initial !important;">${offer.title}</ya-tr-span></span><ya-tr-span data-index="47-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value=" +€ " data-translation=" + " data-ch="0" data-type="trSpan" style="visibility: initial !important;"> + </ya-tr-span><span class="event__offer-price"><ya-tr-span data-index="47-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="${offer.price}" data-translation="${offer.price} евро" data-ch="0" data-type="trSpan" style="visibility: initial !important;">${offer.price} евро</ya-tr-span></span>
                  </li>`).join('');
}

export default class PointView extends AbstractView{
  #element = null;
  constructor({point, onPointClick, offers}){
    super();
    this.point = point;
    this.offers = offers;
    this.onPointClick = onPointClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.onPointClick);
  }

  get template (){
    return createNewEvent(this.point, this.offers);
  }

  get element () {
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }
}
