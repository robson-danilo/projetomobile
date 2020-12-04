import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface ApiImage {
  _id: string;
  name: string;
  createAt: Date;
  url: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  photo: SafeResourceUrl;
  imagens: any[] = [];

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
        this.message = "";
        this.getMensagens();

      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      saveToGallery: true,
    });
    console.log(image);
    console.log('imaeg: ', image);

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    console.log(blobData);
    const imageName = 'Give me a name';

    this.ipeteservices.uploadImageChat(blobData, imageName, image.format).then((response) => {
      //console.log(response);
      console.log('Foto Enviada');
      this.message = "";
      this.getMensagens();
      //var mensagem = 'Foto inserida com sucesso';
      //this.alertaDados(mensagem);
      //this.getUsuario();

    })
      .catch((erro) => {
        console.error(erro);
      });
    //this.getUsuario();

    //this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

    //let imagens = { url: image['dataUrl'], id: sessionStorage.getItem('id_usuario') }
    //this.imagens.push(imagens);

    //this.updateFoto(image['dataUrl']);

  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
