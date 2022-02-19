import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MagicServiceService {
  private URI = 'http://217.71.207.199/api';

  constructor(private http: HttpClient) {}

  /**
   * Funcion que modifica el header añadiendole el token a la petición
   * @returns header:HttpHeaders
   */
  private getHeader() {
    var header: HttpHeaders;
    var token = sessionStorage.getItem('x-auth-token');
    if (token) {
      header = new HttpHeaders().set('x-auth-token', token);
    } else {
      header = new HttpHeaders().set('x-auth-token', '');
    }
    return header;
  }

  /**
   * Función para obtener todas las cartas por nombre
   */
  getCardsByName(name: string): Observable<any> {
    return this.http.get(
      `https://api.magicthegathering.io/v1/cards?name=${name}&language=spanish`
    );
  }

  /**
   * Función para obtener una carta por ID
   */
  getCardById(id: string): Observable<any> {
    return this.http.get(`https://api.magicthegathering.io/v1/cards/${id}`);
  }

  /**
   * Funcion para registrar una carta en el usuario
   * @param cardData
   * @returns
   */
  storeCard(cardData: any): Observable<any> {
    const URL = this.URI + '/storeCard';
    return this.http.post(URL, cardData, { headers: this.getHeader() });
  }

  /**
   * Funcion que devuelve las cartas registradas de un usuario
   * @returns
   */
  getCardsByUser() {
    var user_id = sessionStorage.getItem('user_id');
    const URL = this.URI + '/getCards';
    var data = {
      user_id: user_id,
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   * Funcion que devuelve las cartas registradas de un usuario fitradas por nombre
   * @returns
   */
  getUserCardsByName(nombre: string) {
    var user_id = sessionStorage.getItem('user_id');
    var data = {
      user_id: user_id,
      nombre: nombre,
    };
    const URL = this.URI + '/getUserCardsByName';
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   *  Función que crea un mazo con nombre
   * @param nombre
   * @returns
   */
  createMazo(nombre: any) {
    var user_id = sessionStorage.getItem('user_id');
    const URL = this.URI + '/createMazo';
    var data = {
      user_id: user_id,
      nombre: nombre,
    };
    console.log(data);
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   * Función que obtiene los mazos del usuario
   * @returns
   */
  getMazos() {
    var user_id = sessionStorage.getItem('user_id');
    const URL = this.URI + '/getMazos';
    var data = {
      user_id: user_id,
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   *  Función que obtiene las cartas de un mazo
   * @param mazo_id
   * @returns
   */
  getCardsByMazo(mazo_id: any) {
    const URL = this.URI + '/getCardsFromMazo';
    var data = {
      mazo_id: mazo_id,
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   *  Función que obtiene las cartas de un mazo
   * @param mazo_id
   * @returns
   */
  getMazoById(mazo_id: any) {
    const URL = this.URI + '/getMazo';
    var data = {
      mazo_id: mazo_id,
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   *  Función que elimina un mazo
   * @param mazo_id
   * @returns
   */
  deleteMazoById(mazo_id: any) {
    const URL = this.URI + '/deleteMazo';
    var data = {
      mazo_id: mazo_id,
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  /**
   * Función que añade una carta a un mazo
   * @param card_id
   * @returns
   */
  addCarta(card_id: any, mazo_id: any) {
    const URL = this.URI + '/addCarta';
    var data = {
      mazo_id: mazo_id,
      carta_id: card_id,
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }

  borrarFromMazo(card_id: any, mazo_id: any) {
    const URL = this.URI + '/borrarFromMazo';
    var data = {
      mazo_id: mazo_id,
      carta_id: card_id
    };
    return this.http.post(URL, data, { headers: this.getHeader() });
  }
}
