import { ToastController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.page.html',
  styleUrls: ['./disponibilidade.page.scss'],
})
export class DisponibilidadePage implements OnInit {

  ngOnInit() {
  }

  photo: SafeResourceUrl;
  imagens: any[] = [];

  constructor(private sanitizer: DomSanitizer,
    private ipeteservices: IpetService,
    private toastCtrl: ToastController) {
    /*
  let fotoJson = localStorage.getItem('foto');
  let id_foto = localStorage.getItem('id_foto');
  if(fotoJson!=null && id_foto == sessionStorage.getItem('id_usuario')){
    this.photo = fotoJson;
  }
  */
    this.getDisponibilidade();

  }

  async alertaDados(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  getDisponibilidade() {
    this.ipeteservices.buscarDisponibilidade(sessionStorage.getItem('id_usuario'))
      .then((response) => {
        console.log(response);
        if (response == false) {
          this.cadastrado = 0;
        } else {
          this.cadastrado = response.cadastrado;
          this.cidade = response.cidade;
          this.bairro = response.bairro;
          this.numero = response.num;
          this.opcao = response.disponibilidade; 
          this.valor = response.valor
          //this.inicio();
        }

      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  adicionarDisponibilidade(form) {
    if(form.value['cidade']== ""){
      form.value['cidade'] = this.cidade;
    }
    if(form.value['bairro']== ""){
      form.value['bairro'] = this.bairro;
    }
    if(form.value['numero']== ""){
      form.value['numero'] = this.numero;
    }
    if(form.value['opcao']== ""){
      form.value['opcao'] = this.opcao;
    }
    if(form.value['valor']== ""){
      form.value['valor'] = this.valor;
    }

    if (this.cadastrado == 0) {
      this.ipeteservices.inserirDisponibilidade(form.value)
        .then((response) => {
          //console.log(response);
          console.log('adicionado com sucesso!');
          var mensagem = 'Cadastrado com sucesso!';
          this.alertaDados(mensagem);
          this.getDisponibilidade();
        })
        .catch((erro) => {
          console.error(erro);
        });
    } else {
      this.ipeteservices.editarDisponibilidade(form.value)
        .then((response) => {
          //console.log(response);
          console.log('editado com sucesso!');
          var mensagem = 'Editado com sucesso!';
          this.alertaDados(mensagem);
          this.getDisponibilidade();

        })
        .catch((erro) => {
          console.error(erro);
        });
    }

  }
  /*
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true,
    });

    //console.log(image['dataUrl']);

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

    let imagens = { url: image['dataUrl'], id: sessionStorage.getItem('id_usuario') }
    this.imagens.push(imagens);

    this.updateFoto(image['dataUrl']);

  }

  updateFoto(image) {
    console.log(localStorage.getItem('fotos'));
    localStorage.setItem('id_foto', sessionStorage.getItem('id_usuario'));
    localStorage.setItem('foto', image);
    localStorage.setItem('fotos', JSON.stringify(this.imagens));
    sessionStorage.setItem('fotos', JSON.stringify(this.imagens));
  }
  */
}
