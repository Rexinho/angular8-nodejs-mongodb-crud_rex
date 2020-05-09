import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../models/Contacto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  formData: Contacto;
  list: Contacto[];
  distritoList = ['ANCON','ATE','CALLAO','RIMAC','SAN BORJA','SURCO','VENTANILLA'];
  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

   postContacto(formData: Contacto){
    return this.http.post(this.URL + '/contactos', formData);
   }

   refreshList(){
     this.http.get(this.URL + '/contactos')
     .toPromise().then(res => this.list = res as Contacto[]);
   }

   putContacto(formData: Contacto){
     return this.http.put(this.URL + '/contactos/' + formData._id, formData);
    }

    deleteContacto(id: string){
     return this.http.delete(this.URL + '/contactos/' + id);
    }

}
