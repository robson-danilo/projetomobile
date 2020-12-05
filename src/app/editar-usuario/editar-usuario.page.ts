import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

export interface ApiImage {
  _id: string;
  name: string;
  createAt: Date;
  url: string;
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  constructor(private ipeteservices: IpetService,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    private camera: Camera) {
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

  photo: SafeResourceUrl;
  imagens: any[] = [];
  nome = '';
  email = '';
  senha = '';
  numero = '';
  foto = '';


  getUsuario() {
    this.ipeteservices.buscarUsuario(sessionStorage.getItem('id_usuario'))
      .then((response) => {
        console.log(response);
        this.nome = response['nome'];
        this.email = response['email'];
        this.senha = response['senha'];
        this.numero = response['numero'];
        this.foto = response['foto'];

      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  editarUsuario(form) {
    if (form.value['nome'] == "") {
      form.value['nome'] = this.nome;
    }
    if (form.value['email'] == "") {
      form.value['email'] = this.email;
    }
    if (form.value['senha'] == "") {
      form.value['senha'] = this.senha;
    }
    if (form.value['numero'] == "") {
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


  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      saveToGallery: false,
    });

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'Give me a name';

    this.ipeteservices.uploadImage(blobData, imageName, image.format).then((response) => {
      //console.log(response);
      console.log('Foto inserida com sucesso');
      var mensagem = 'Foto inserida com sucesso';
      this.alertaDados(mensagem);
      this.getUsuario();

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


  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      const blobData = this.b64toBlob(imageData, `image/png`);
      const imageName = 'Give me a name';

      this.ipeteservices.uploadImage(blobData, imageName, 'png').then((response) => {
        //console.log(response);
        console.log('Foto inserida com sucesso');
        var mensagem = 'Foto inserida com sucesso';
        this.alertaDados(mensagem);
        this.getUsuario();

      })
        .catch((erro) => {
          console.error(erro);
        });
    }, (err) => {
      alert('ocorreu um erro');
      alert(err);
    })
  }


}
