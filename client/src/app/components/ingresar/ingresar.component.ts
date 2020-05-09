import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  usuario = {};
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  singIn() {
    this.authService.singIn(this.usuario)
    .subscribe(
      res => {
        //console.log(res);
        this.message = '';
        localStorage.setItem('token', res.token);
        this.router.navigate(['/contacto']);
      },
      err => {
        //console.log(err);
        this.message = err.error;
      }
    )
  }

}
