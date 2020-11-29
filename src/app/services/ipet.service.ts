import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
export interface ApiImage {
  _id: string;
  name: string;
  createAt: Date;
  url: string;
}
*/
@Injectable({
  providedIn: 'root'
})
export class IpetService {

  private api: string = 'http://localhost/welcome/testar/';

  constructor(private http: HttpClient) { }

  inserirUsuario(dados: string) {
    let url = 'http://localhost/welcome/inserir/' + dados['nome'] + '/' + dados['email'] + '/' + dados['senha'] + '/' + dados['numero'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    return this.http.post(url, header).toPromise();

  }

  editarUsuario(dados: string) {
    let url = 'http://localhost/welcome/editarUsuario/' + dados['nome'] + '/' + dados['email'] + '/' + dados['senha'] + '/' + dados['numero'] + '/' + sessionStorage.getItem('id_usuario');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    return this.http.post(url, header).toPromise();

  }

  buscarUsuario(id: string) {
    let url = 'http://localhost/welcome/buscarUsuario/' + id;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }

  inserirDisponibilidade(dados: string) {
    let url = 'http://localhost/welcome/inserirDisponibilidade/' + dados['cidade'] + '/' + dados['bairro'] + '/' + dados['numero'] + '/' + sessionStorage.getItem('id_usuario') + '/' + dados['opcao'] + '/' + dados['valor'] + '/' + 1;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    return this.http.post(url, header).toPromise();

  }

  editarDisponibilidade(dados: string) {
    let url = 'http://localhost/welcome/editarDisponibilidade/' + dados['cidade'] + '/' + dados['bairro'] + '/' + dados['numero'] + '/' + sessionStorage.getItem('id_usuario') + '/' + dados['opcao'] + '/' + dados['valor'] + '/' + 1;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    return this.http.post(url, header).toPromise();

  }

  buscarDisponibilidade(id: string) {
    let url = 'http://localhost/welcome/buscarDisponibilidade/' + id;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }

  buscarDisponibilidadeGeral(dados: string) {
    if (dados['cidade'] == '') {
      dados['cidade'] = null;
    }
    let url = 'http://localhost/welcome/buscarDisponibilidadePesquisa/' + dados['cidade'] + '/' + dados['disponibilidade'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }


  confirmarLogin(dados: string) {
    let url = 'http://localhost/welcome/buscar/' + dados['email'] + '/' + dados['senha'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }

  verificarEmail(dados: string) {
    let url = 'http://localhost/welcome/verificar/' + dados['email'];

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }

  buscarMensagens() {
    let url = 'http://localhost/welcome/ListarConversa/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }

  enviarMensagens(mensagem: string) {
    let url = 'http://localhost/welcome/EnviarConversa/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar') + '/' + mensagem;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.post(url, header).toPromise();

  }

  deletarMensagemDuplicada(id: string) {
    let url = 'http://localhost/welcome/deletarMensagem/' + id ;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.delete(url, header).toPromise();

  }

  buscarContatos() {
    let url = 'http://localhost/welcome/ListarContatos/' + sessionStorage.getItem('id_usuario');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.get(url, header).toPromise();

  }

  editarEstrelas(estrelas: number) {
    let url = 'http://localhost/welcome/editarAvaliacao/' + estrelas + '/' + sessionStorage.getItem('id_estrelas_update') ;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.post(url, header).toPromise();

  }

  inserirEstrelas(estrelas: number) {
    let url = 'http://localhost/welcome/inserirAvaliacao/' + estrelas + '/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_recebeu_estrelas') ;

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    return this.http.post(url, header).toPromise();

  }

  /*


  url = 'http://localhost/welcome/uploadTeste/';

  uploadImage(blobData, name, ext) {
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    console.log(blobData);
    //let url = 'http://localhost/welcome/uploadTeste' + formData;

    //return this.http.ost()

    return this.http.post(`${this.url}image`, formData);
  }
  */
}
