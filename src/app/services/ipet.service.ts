import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface ApiImage {
  _id: string;
  name: string;
  createAt: Date;
  url: string;
}



@Injectable({
  providedIn: 'root'
})
export class IpetService {

  private api: string = 'https://solidariounifg.000webhostapp.com/welcome/testar/';

  constructor(private http: HttpClient) { }

  private urlteste = 'https://solidariounifg.000webhostapp.com/welcome/buscarusuario/1';

  testando() {
    return this.http.get(this.urlteste);
  }


  inserirUsuario(dados: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/inserir/' + dados['nome'] + '/' + dados['email'] + '/' + dados['senha'] + '/' + dados['numero'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('name', 'teste');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();



    //let url = 'https://solidariounifg.000webhostapp.com/welcome/uploadteste' + formData;

    //return this.http.ost()
    //return this.http.post(`${this.urlChat}image`, formData).toPromise();




  }

  editarUsuario(dados: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/editarUsuario/' + dados['nome'] + '/' + dados['email'] + '/' + dados['senha'] + '/' + dados['numero'] + '/' + sessionStorage.getItem('id_usuario');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  buscarUsuario(id: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/buscarUsuario/' + id;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url).toPromise();

  }

  inserirDisponibilidade(dados: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/inserirDisponibilidade/' + dados['cidade'] + '/' + dados['bairro'] + '/' + dados['numero'] + '/' + sessionStorage.getItem('id_usuario') + '/' + dados['opcao'] + '/' + dados['valor'] + '/' + 1;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  editarDisponibilidade(dados: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/editarDisponibilidade/' + dados['cidade'] + '/' + dados['bairro'] + '/' + dados['numero'] + '/' + sessionStorage.getItem('id_usuario') + '/' + dados['opcao'] + '/' + dados['valor'] + '/' + 1;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }
    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  buscarDisponibilidade(id: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/buscarDisponibilidade/' + id;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url).toPromise();

  }

  buscarDisponibilidadeGeral(dados: string) {
    if (dados['cidade'] == '') {
      dados['cidade'] = null;
    }
    let url = 'https://solidariounifg.000webhostapp.com/welcome/buscarDisponibilidadePesquisa/' + dados['cidade'] + '/' + dados['disponibilidade'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url).toPromise();

  }


  confirmarLogin(dados: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/buscar/' + dados['email'] + '/' + dados['senha'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    return this.http.get(url).toPromise();
    //return this.http.get(url, header).toPromise();

  }

  verificarEmail(dados: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/verificar/' + dados['email'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url).toPromise();

  }

  buscarMensagens() {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/ListarConversa/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url).toPromise();

  }

  enviarMensagens(mensagem: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/EnviarConversa/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar') + '/' + mensagem;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();
    //let param = {nome: dados};

    //return this.http.post(url, header).toPromise();

  }

  deletarMensagemDuplicada(id: string) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/deletarMensagem/' + id;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //return this.http.delete(url).toPromise();

  }

  buscarContatos() {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/ListarContatos/' + sessionStorage.getItem('id_usuario');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url).toPromise();

  }

  editarEstrelas(estrelas: number) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/editarAvaliacao/' + estrelas + '/' + sessionStorage.getItem('id_estrelas_update');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //return this.http.post(url, header).toPromise();

  }

  inserirEstrelas(estrelas: number) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/inserirAvaliacao/' + estrelas + '/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_recebeu_estrelas');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    const formData = new FormData();
    formData.append('name', 'testando');
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //return this.http.post(url, header).toPromise();

  }




  //url = 'https://solidariounifg.000webhostapp.com/welcome/uploadImagemEditar/' + sessionStorage.getItem('id_usuario') + '/';

  uploadImage(blobData, name, ext) {
    let url = 'https://solidariounifg.000webhostapp.com/welcome/uploadImagemEditar/' + sessionStorage.getItem('id_usuario');


    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    console.log(blobData);
    //let url = 'https://solidariounifg.000webhostapp.com/welcome/uploadteste' + formData;

    //return this.http.ost()

    return this.http.post(url, formData).toPromise();

  }

  //urlChat = 'https://solidariounifg.000webhostapp.com/welcome/uploadImagemChat/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar') + '/';

  uploadImageChat(blobData, name, ext) {

    let urlChat = 'https://solidariounifg.000webhostapp.com/welcome/uploadImagemChat/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar') + '/';
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    console.log(blobData);
    //let url = 'https://solidariounifg.000webhostapp.com/welcome/uploadteste' + formData;

    //return this.http.ost()
    return this.http.post(urlChat, formData).toPromise();

  }


}
