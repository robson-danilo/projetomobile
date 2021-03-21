import { Router } from '@angular/router';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email;

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ipeteservices: IpetService,
    private router: Router,
    private sto: Storage,
    private mediaCapture: MediaCapture,
    private file: File
  ) { }

  ngOnInit() {
    this.ipeteservices.testando().subscribe(response => {
      console.log(response);
    })

    this.sto.get('email').then((val) => {
      if (val != null) {
        this.email = val;
      }
    });
  }


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
      this.sto.set('email', form.value['email']);
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

  videoPath;
  videoFileUpload;

  video() {
    let options: CaptureVideoOptions = { limit: 1 }
    this.mediaCapture.captureVideo(options)
      .then((videoData: MediaFile[]) => {
        var i, path, len;
        for (i = 0, len = videoData.length; i < len; i += 1) {
          path = videoData[i].fullPath;
        }
        this.videoPath = path;

        alert(path);


        try {
          let n = path.lastIndexOf("/");
          let x = path.lastIndexOf("g");
          let nameFile = path.substring(n + 1, x + 1);
          let directory = path.substring(0, n);


          alert(n);
          alert(x);
          alert(nameFile);
          alert(directory);


          alert("nombre archivo :" + nameFile + " *directory: " + directory.toString() + " *allPath: " + path);
          //this.file.readAsArrayBuffer(directory.toString(), nameFile).then((res) => {
          this.file.readAsArrayBuffer('file:///storage/emulated/0/DCIM/Camera/', '20210321_170304.mp4').then((res) => {
            try {

              let blob = new Blob([res], {type: "video/mp4"});
              alert("gerou blobl");
              alert(blob);

              this.ipeteservices.uploadVideo(blob).then((response) => {
                //console.log(response);
                alert(response);
                console.log('Foto inserida com sucesso');
                var mensagem = 'Foto inserida com sucesso';
                //this.alertaDados(mensagem);
                //this.getUsuario();
          
              })
                .catch((erro) => {
                  console.error(erro);
                });



            } catch (z) {
              alert('error al crear blob' + z);
            }
          }).catch(err => alert('error al leer el archivo ' + JSON.stringify(err)));
        } catch (z) {
          alert(z);
        }

      })
      .catch((err: CaptureError) => err)
  }
  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);

        this.ipeteservices.uploadVideo(this.file).then((response) => {
          //console.log(response);
          alert(response);
          console.log('Foto inserida com sucesso');
          var mensagem = 'Foto inserida com sucesso';
          //this.alertaDados(mensagem);
          //this.getUsuario();
    
        })
          .catch((erro) => {
            console.error(erro);
          });

  }

}
