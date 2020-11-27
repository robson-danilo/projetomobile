import { ToastController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {


  constructor(private ipeteservices: IpetService,
    private toastCtrl: ToastController) {
      this.getDisponibilidades();
     }

  ngOnInit() {
  }

  async alertaDados(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  getDisponibilidades() {
    let dadosEnviar = { cidade: '', disponibilidade: '' };
    console.log(dadosEnviar);    
    this.ipeteservices.buscarDisponibilidadeGeral(dadosEnviar)
      .then((response) => {
        console.log(response);
        if (response != false){
          this.resultados = response;
        }else {
          let mensagem = 'Nenhum resultado encontrado!';
          this.alertaDados(mensagem);
        }

      })
      .catch((erro) => {
        console.error(erro);
      });

  }

  getDisponibilidadesPesquisa(form) {
    console.log(form.value);
    this.ipeteservices.buscarDisponibilidadeGeral(form.value)
      .then((response) => {
        console.log(response);
        if (response != false){
          this.resultados = response;
        }else {
          let mensagem = 'Nenhum resultado encontrado!';
          this.alertaDados(mensagem);
        }

      })
      .catch((erro) => {
        console.error(erro);
      });
      
  }

}
