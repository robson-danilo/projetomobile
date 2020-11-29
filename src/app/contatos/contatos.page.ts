import { IpetService } from './../services/ipet.service';
import { ToastController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {

  constructor(private ipeteservices: IpetService,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {
    this.buscarContatos();
  }

  ngOnInit() {
  }
  stars: string[] = [];
  public contatos;
  buscarContatos() {
    this.ipeteservices.buscarContatos()
      .then((response) => {
        console.log(response);
        if (response != false) {
          console.log(response);
          
          this.contatos = response;
        }else {
          this.contatos = [{nome: "Sem contatos"}];
        }

      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  enviarMensagem(id_usuario, nome_usuario) {
    sessionStorage.setItem('id_usuario_enviar', id_usuario);
    sessionStorage.setItem('nome_usuario_enviar', nome_usuario);
    this.navCtrl.navigateRoot('chat');
  }

  updateEstrelas(estrelas, id_avaliacao){
    //sessionStorage.setItem('estrelas', estrelas);
    sessionStorage.setItem('id_estrelas_update', id_avaliacao);

    this.ipeteservices.editarEstrelas(estrelas)
      .then((response) => {
        console.log(response);
        this.buscarContatos();
      })
      .catch((erro) => {
        console.error(erro);
      });



    //this.navCtrl.navigateRoot('chat');
  }

  inserirEstrelas(estrelas, id_recebeu){
    //sessionStorage.setItem('estrelasInserir', estrelas);
    sessionStorage.setItem('id_recebeu_estrelas', id_recebeu);

    this.ipeteservices.inserirEstrelas(estrelas)
      .then((response) => {
        console.log(response);
        this.buscarContatos();
      })
      .catch((erro) => {
        console.error(erro);
      });




    //this.navCtrl.navigateRoot('chat');
  }

}
