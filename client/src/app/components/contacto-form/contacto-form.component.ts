import { Component, OnInit } from '@angular/core';
import { ContactosService } from 'src/app/services/contactos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto-form',
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.css']
})
export class ContactoFormComponent implements OnInit {

  constructor(private contactosService: ContactosService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.contactosService.formData = {
      _id: null,
      tipo_documento:'',
      numero_documento:'',
      nombres:'',
      primer_apellido:'',
      segundo_apellido:'',
      fecha_nacimiento: new Date(),
      correo:'',
      direccion:'',
      celular:'',
      distrito:''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.contactosService.postContacto(form.value).subscribe(res => {
      this.resetForm(form);
      this.contactosService.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.contactosService.putContacto(form.value).subscribe(res => {
      this.resetForm(form);
      this.contactosService.refreshList();
    });

  }

}
