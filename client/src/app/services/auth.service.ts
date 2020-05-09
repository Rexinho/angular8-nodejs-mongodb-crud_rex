import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  singUp(usuario) {
    return this.http.post<any>(this.URL + '/registrar', usuario);
  }

  singIn(usuario) {
    return this.http.post<any>(this.URL + '/ingresar', usuario);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/ingresar']);
  }
}
