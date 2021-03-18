import { Component } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async alertaDados(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  async logout(mensagem = null){
    sessionStorage.removeItem('id_usuario');
    sessionStorage.removeItem('nome_usuario');
    sessionStorage.removeItem('email_usuario');
    sessionStorage.setItem('logado', 'false');
    this.navCtrl.navigateRoot('home');
    if(mensagem != null){
      this.alertaDados(mensagem);
    }    
  }

  async listar(){
    var mensagem = '';
    var logado = sessionStorage.getItem('logado');
    if (logado == 'true'){
      this.navCtrl.navigateRoot('listar');  
    }else {
      mensagem = 'Faça o login ou cadastra-se';
      this.logout(mensagem);      
    }
  }

  async map(){
    var mensagem = '';
    var logado = sessionStorage.getItem('logado');
    if (logado == 'true'){
      this.navCtrl.navigateRoot('map');  
    }else {
      mensagem = 'Faça o login ou cadastra-se';
      this.logout(mensagem);      
    }
  }

  async Contatos(){
    var mensagem = '';
    var logado = sessionStorage.getItem('logado');
    if (logado == 'true'){
      this.navCtrl.navigateRoot('contatos');
    }else {
      mensagem = 'Faça o login ou cadastra-se';
      this.logout(mensagem);      
    }
  }

  async Disponibilidade(){
    var mensagem = '';
    var logado = sessionStorage.getItem('logado');
    if (logado == 'true'){
      this.navCtrl.navigateRoot('disponibilidade');
    }else {
      mensagem = 'Faça o login ou cadastra-se';
      this.logout(mensagem);      
    }
  }

  async Editar(){
    var mensagem = '';
    var logado = sessionStorage.getItem('logado');
    if (logado == 'true'){
      this.navCtrl.navigateRoot('editar-usuario');   
    }else {
      mensagem = 'Faça o login ou cadastra-se';
      this.logout(mensagem);      
    }
  }
}
