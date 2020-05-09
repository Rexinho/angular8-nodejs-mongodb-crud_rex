import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/Contacto';

@Component({
  selector: 'app-contacto-list',
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.css']
})

export class ContactoListComponent implements OnInit {

  pageOfItems: Array<any>;
  pageSize = 5;
  maxPages = 5;
  registroIni = 0;
  registroFin = 0;
  registroTot = 0;
  
  constructor(private contactosService: ContactosService) { }

  ngOnInit() {
    this.contactosService.refreshList();
  }

  populateForm(contacto: Contacto) {
    this.contactosService.formData = Object.assign({}, contacto);
  }

  onDelete(id: string) {
    if (confirm('¿Está seguro de eliminar el registro?')) {
      this.contactosService.deleteContacto(id).subscribe(res => {
        this.contactosService.refreshList();
      });
    }
  }

  // Paginacion
  onChangePage(pageOfItems: Array<any>) {
    //console.log(pageOfItems);
    this.pageOfItems = pageOfItems;
    this.registroTot = this.contactosService.list.length;
  }

}
