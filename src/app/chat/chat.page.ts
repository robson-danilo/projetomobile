import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = "";
  id_usuario_enviar = "";
  nome_usuario_enviar = "";

  constructor(private ipeteservices: IpetService,
    private toastCtrl: ToastController,
    private datePipe: DatePipe) {

    this.getMensagens();
    this.id_usuario_enviar = sessionStorage.getItem('id_usuario_enviar');
    this.nome_usuario_enviar = sessionStorage.getItem('nome_usuario_enviar');
  }

  ngOnInit() {
  }

  public mensagens;
  getMensagens() {
    this.ipeteservices.buscarMensagens()
      .then((response) => {
        console.log(response);
        this.mensagens = response;
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  limparTexto() {
    this.message = "";
  }

  public id_deletar;
  enviarMensagem() {
    this.ipeteservices.enviarMensagens(this.message)
      .then((response) => {
        this.id_deletar = response;
        this.ipeteservices.deletarMensagemDuplicada(this.id_deletar)
          .then((response) => {
            this.message = "";
            this.getMensagens();
          })
          .catch((erro) => {
            console.error(erro);
          });

      })
      .catch((erro) => {
        console.error(erro);
      });
  }

}
