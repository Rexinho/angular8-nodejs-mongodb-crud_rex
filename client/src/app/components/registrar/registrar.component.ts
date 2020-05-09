import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  usuario = {
    email: '',
    password: ''
  };
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  singUp() {
    this.authService.singUp(this.usuario)
    .subscribe(
      res => {
        //console.log(res);
        this.message = '';
        localStorage.setItem('token', res.token);
        this.router.navigate(['/contacto']);
      },
      err => {
        this.message = err.error;
      }
    )
  }
}
