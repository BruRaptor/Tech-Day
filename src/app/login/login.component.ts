import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private servicoDeAutenticacao: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  login() {
    this.servicoDeAutenticacao.login(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp

        environment.foto = this.usuarioLogin.foto
        environment.nome = this.usuarioLogin.nome
        environment.id = this.usuarioLogin.id
        environment.token = this.usuarioLogin.token

        this.router.navigate(['/login'])
      },
      error: erro => {
        if(erro.status == 401){
          alert('Usuário ou senha incorretos!')
        }
      }
    })
  }
}
