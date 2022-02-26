import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario = new Usuario;
  confirmaSenha: string;
  tipoUser: string;

  constructor(

    private servicoDeAutenticacao: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmSenha = event.target.value;
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmaSenha){
      alert('As senhas não conferem')
    } else{
      this.servicoDeAutenticacao.register(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['entrar'])
        alert('Parabéns! Usuário cadastrado com sucesso.')
     })
    }
  }
}