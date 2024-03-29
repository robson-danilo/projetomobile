import { ToastController, LoadingController } from '@ionic/angular';
import { IpetService } from './../services/ipet.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Map, tileLayer, marker, Popup } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';





@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.page.html',
  styleUrls: ['./disponibilidade.page.scss'],
})
export class DisponibilidadePage implements OnInit {

  ngOnInit() {
  }

  cadastrado = 0;
  cidade = '';
  bairro = '';
  numero = '';
  opcao = '';
  valor = '';
  public esconder = true;

  map: Map;
  popup: Popup;
  newMarker: any;
  address: string[];
  latitude: any = '';
  longitude: any = '';


  constructor(private sanitizer: DomSanitizer,
    private ipeteservices: IpetService,
    private toastCtrl: ToastController,
    public loadingController: LoadingController,
    private geoLocation: Geolocation) {
    /*
  let fotoJson = localStorage.getItem('foto');
  let id_foto = localStorage.getItem('id_foto');
  if(fotoJson!=null && id_foto == sessionStorage.getItem('id_usuario')){
    this.photo = fotoJson;
  }
  */

    
  console.log(this.map);

    this.getDisponibilidade();
    console.log(sessionStorage.getItem('id_usuario'));

    //this.teste(null);

  }

  async alertaDados(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }


  tipo(op: any,) {
    if (op.detail.value != "PetShop") {
      console.log(op.detail.value);
      this.esconder = false;
    } else {
      this.esconder = true;
    }
  }

  getDisponibilidade() {
    this.ipeteservices.buscarDisponibilidade(sessionStorage.getItem('id_usuario'))
      .then((response) => {
        console.log(response);
        if (response == false) {
          this.cadastrado = 0;
        } else {
          this.cadastrado = response['cadastrado'];
          this.cidade = response['cidade'];
          this.bairro = response['bairro'];
          this.numero = response['num'];
          this.opcao = response['disponibilidade'];
          this.valor = response['valor'];
          if (response['disponibilidade'] != "PetShop") {
            this.esconder = false;
          }
          if (response['latitude'] == null && response['longitude'] == null) {
            console.log("entrou aqui");
          this.geoLocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            this.loadMap(this.latitude, this.longitude);
            this.map.on('dblclick', (e) => { this.onMapClick(e) });
          }).catch((error) => {
            console.log('Error ao buscar localização', error);
          });
          } else {
            this.latitude = response['latitude'];
            this.longitude = response['longitude'];
            this.loadMap(this.latitude, this.longitude);
            this.map.on('dblclick', (e) => { this.onMapClick(e) });
          }
          //this.inicio();
        }

      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  adicionarDisponibilidade(form) {
    if (form.value['cidade'] == "") {
      form.value['cidade'] = this.cidade;
    }
    if (form.value['bairro'] == "") {
      form.value['bairro'] = this.bairro;
    }
    if (form.value['numero'] == "") {
      form.value['numero'] = this.numero;
    }
    if (form.value['opcao'] == "") {
      form.value['opcao'] = this.opcao;
    }
    if (form.value['valor'] == "") {
      form.value['valor'] = this.valor;
    }

    if (form.value['opcao'] == "PetShop") {
      form.value['valor'] = 0;
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


  onMapClick(e) {

    if (this.newMarker == undefined) {
      this.newMarker = marker([e.latlng.lat, e.latlng.lng], {
        draggable: false
      }).addTo(this.map);
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;
    } else {
      console.log(this.newMarker);
      this.map.removeLayer(this.newMarker);
      this.newMarker = marker([e.latlng.lat, e.latlng.lng], {
        draggable: false
      }).addTo(this.map);
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;
    }


  }
  loadMap(lat, long) {
    this.map = new Map("mapId").setView([lat, long], 15);
    this.newMarker = marker([lat, long], {
      draggable: false
    }).addTo(this.map);
    this.latitude = lat;
    this.longitude = long;
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(this.map);
  }


  async locatePosition() {

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Buscando localização atual...',
      duration: 3000
    });
    await loading.present();
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      if (this.newMarker == undefined) {
        this.newMarker = marker([e.latitude, e.longitude], {
          draggable: false
        }).addTo(this.map);
        this.latitude = e.latitude;
        this.longitude = e.longitude;
      } else {
        this.map.removeLayer(this.newMarker);
        this.newMarker = marker([e.latitude, e.longitude], {
          draggable: false
        }).addTo(this.map);
        this.latitude = e.latitude;
        this.longitude = e.longitude;
      }
    });
  }


  enviarlocal(){

    this.ipeteservices.enviarLoca(this.latitude,this.longitude)
        .then((response) => {
          //console.log(response);
          console.log('Localização salva com sucesso!');
          var mensagem = 'Localização salva com sucesso!';
          this.alertaDados(mensagem);
          this.getDisponibilidade();
        })
        .catch((erro) => {
          console.error(erro);
        });
  }


}
