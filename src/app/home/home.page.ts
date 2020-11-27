import { Router } from '@angular/router';
import { IpetService } from './../services/ipet.service';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ipeteservices: IpetService,
    private router: Router) { }


  async cadastrar() {
    this.router.navigateByUrl('/cadastro');
  }

  async login(form) {
    var email = form.value['email'];
    var senha = form.value['senha'];
    var enviar = true;
    var mensagem = '';
    console.log('Confirm Ok');
    if (email == undefined) {
      mensagem = 'Preencha corretamente o e-mail!';
      enviar = false;
    } else if (senha == undefined) {
      mensagem = 'Preencha corretamente a senha!';
      enviar = false;
    }

    if (enviar == false) {
      this.alertaDados(mensagem);
      return false;
    } else {

      this.buscar(form.value);
      console.log('Login realizado com sucesso!');
      return true;
    }

  }

  async alertaDados(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }


  async buscar(dados: string) {
    this.ipeteservices.confirmarLogin(dados)
      .then((response) => {
        console.log(response);
        if (response == false) {
          var mensagem = 'Email ou senha incorretos!';
          this.alertaDados(mensagem);
        } else {
          sessionStorage.setItem('id_usuario', response['id']);
          sessionStorage.setItem('nome_usuario', response['nome']);
          sessionStorage.setItem('email_usuario', response['email']);
          sessionStorage.setItem('logado', 'true');
          this.inicio();
        }

      })
      .catch((erro) => {
        console.error(erro);
      });
  }


  async inicio() {
    this.router.navigateByUrl('/inicio');
    var mensagem = 'Logado com sucesso!';
    this.alertaDados(mensagem);
  }

}
