import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackServiceService {

  private URI = 'http://217.71.207.199:3500/api';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Funcion para loguearse
   * @param userData
   * @returns
   */
  public register(userData: any): Observable<any> {
    const URL = this.URI + '/register';
    return this.http.post(URL, userData);
  }

   /**
    * Funcion para registrarse
    * @param userData
    * @returns
    */
  public login(userData: any): Observable<any> {
    const URL = this.URI + '/login';
    return this.http.post(URL, userData);
  }

  /**
   * Función para desconectarse
   * @returns
   */
  public logOut(){
    sessionStorage.removeItem('x-auth-token');
    sessionStorage.removeItem('user_username');
    sessionStorage.removeItem('user_id');
    return this.router.navigate(['/']).then(() => false);
  }

  /**
   * Funcion que comprueba si el usuario está logeado
   * @returns
   */
  public isLogin(): any{
    let login: boolean;
    if(sessionStorage.getItem('x-auth-token')){
      login=true;
    } else {
      login=false;
    }
    return login;
  }

}
