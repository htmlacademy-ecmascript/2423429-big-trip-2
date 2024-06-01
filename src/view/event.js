import { createElement } from '../render.js';

function createNewEvent(){
  return `
    <section class="trip-events">
          <h2 class="visually-hidden"><ya-tr-span data-index="10-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Trip events" data-translation="События поездки" data-ch="0" data-type="trSpan" style="visibility: initial !important;">События поездки</ya-tr-span></h2>

          <ul class="trip-events__list">

            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18"><ya-tr-span data-index="41-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="MAR 18" data-translation="18 МАРТА" data-ch="1" data-type="trSpan" style="visibility: initial !important;">18 МАРТА</ya-tr-span></time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Значок типа события">
                </div>
                <h3 class="event__title"><ya-tr-span data-index="42-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Check-in Chamonix" data-translation="Регистрация в Шамони" data-ch="0" data-type="trSpan" style="visibility: initial !important;">Регистрация в Шамони</ya-tr-span></h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25"><ya-tr-span data-index="43-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="16:20" data-translation="16:20" data-ch="0" data-type="trSpan" style="visibility: initial !important;">16:20</ya-tr-span></time><ya-tr-span data-index="43-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value=" — " data-translation=" — " data-ch="0" data-type="trSpan" style="visibility: initial !important;">  —  </ya-tr-span><time class="event__end-time" datetime="2019-03-18T13:35"><ya-tr-span data-index="43-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="17:00" data-translation="17:00" data-ch="0" data-type="trSpan" style="visibility: initial !important;">17:00</ya-tr-span></time>
                  </p>
                  <p class="event__duration"><ya-tr-span data-index="44-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="40M" data-translation="40 м" data-ch="0" data-type="trSpan" style="visibility: initial !important;">40 м</ya-tr-span></p>
                </div>
                <p class="event__price"><ya-tr-span data-index="45-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value=" € " data-translation=" € " data-ch="0" data-type="trSpan" style="visibility: initial !important;">  € </ya-tr-span><span class="event__price-value"><ya-tr-span data-index="45-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="600" data-translation="600" data-ch="0" data-type="trSpan" style="visibility: initial !important;">600</ya-tr-span></span>
                </p>
                <h4 class="visually-hidden"><ya-tr-span data-index="46-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Offers:" data-translation="Предложения:" data-ch="1" data-type="trSpan" style="visibility: initial !important;">Предложения:</ya-tr-span></h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title"><ya-tr-span data-index="47-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="Add breakfast" data-translation="Добавить завтрак" data-ch="0" data-type="trSpan" style="visibility: initial !important;">Добавить завтрак</ya-tr-span></span><ya-tr-span data-index="47-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value=" +€ " data-translation=" + " data-ch="0" data-type="trSpan" style="visibility: initial !important;"> + </ya-tr-span><span class="event__offer-price"><ya-tr-span data-index="47-0" data-translated="true" data-source-lang="en" data-target-lang="ru" data-value="50" data-translation="50 евро" data-ch="0" data-type="trSpan" style="visibility: initial !important;">50 евро</ya-tr-span></span>
                  </li>
                </ul>
                <button class="event__favorite-btn event__favorite-btn--active" type="button">
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
          </ul>
        </section>`;
}

export default class PointView {
  getTemplate(){
    return createNewEvent();
  }

  getElement(){
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
