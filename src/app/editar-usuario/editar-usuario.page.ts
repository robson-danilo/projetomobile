import { ToastController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  constructor(private ipeteservices: IpetService,
    private toastCtrl: ToastController) { 
      this.getUsuario();
    }

  ngOnInit() {
  }

  async alertaDados(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  nome = '';
  email = '';
  senha = '';
  numero = '';


  getUsuario() {
    this.ipeteservices.buscarUsuario(sessionStorage.getItem('id_usuario'))
      .then((response) => {
        console.log(response);
          this.nome = response['nome'];
          this.email = response['email'];
          this.senha = response['senha'];
          this.numero = response['numero'];
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  editarUsuario(form) {
    if(form.value['nome']== ""){
      form.value['nome'] = this.nome;
    }
    if(form.value['email']== ""){
      form.value['email'] = this.email;
    }
    if(form.value['senha']== ""){
      form.value['senha'] = this.senha;
    }
    if(form.value['numero']== ""){
      form.value['numero'] = this.numero;
    }
      this.ipeteservices.editarUsuario(form.value)
        .then((response) => {
          //console.log(response);
          console.log('editado com sucesso!');
          var mensagem = 'Editado com sucesso!';
          this.alertaDados(mensagem);
          this.getUsuario();

        })
        .catch((erro) => {
          console.error(erro);
        });
    

  }

}
