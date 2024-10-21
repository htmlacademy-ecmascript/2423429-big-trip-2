import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type' : 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.base_price,
      'date_from': point.date_from instanceof Date ? point.date_from.toISOString() : null,
      'date_to': point.date_to instanceof Date ? point.date_to.toISOString() : null,
      'destination': point.destination,
      'offers': point.offers,
      'type': point.type,
      'is_favorite': point.is_favorite,
    };

    return adaptedPoint;
  }
}
