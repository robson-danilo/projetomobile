import { IpetService } from './../../services/ipet.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(private toastCtrl: ToastController,
    private ipeteservices: IpetService,
    private router: Router) { }

  ngOnInit() {
  }

  async adicionar(form) {
    var nome = form.value['nome'];
    var email = form.value['email'];
    var senha = form.value['senha'];
    var numero = form.value['numero'];
    var enviar = true;
    var mensagem = '';
    if (nome.length < 5) {
      mensagem = 'O nome deve ter no minimo 6 caracteres!';
      enviar = false;
    } else if (email.length < 8) {
      mensagem = 'Preencha corretamente o email!';
      enviar = false;
    } else if (senha.length < 5) {
      mensagem = 'A senha deve ter no minimo 6 caracteres!';
      enviar = false;
    } else if (numero.length <= 8) {
      mensagem = 'Preencha corretamente o número!';
      enviar = false;
    }

    if (enviar == false) {
      this.alertaDados(mensagem);
      return false;
    } else {
      this.add(form.value);
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

  async home(cadastrado = null) {
    this.router.navigateByUrl('/home');
    if (cadastrado == true) {
      var mensagem = 'Inserido com sucesso!';

      this.alertaDados(mensagem);
    }

  }


  async add(dados: string) {
    this.ipeteservices.inserirUsuario(dados)
      .then((response) => {
        if (response == true) {
          this.home(true);
        }else {
          var mensagem = 'Email já cadastrado!';
          this.alertaDados(mensagem);
        }

      })
      .catch((erro) => {
        var mensagem = 'Falha ao inserir';
        this.alertaDados(mensagem);
        //this.home(true);
      });
  }


}
