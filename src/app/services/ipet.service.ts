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

  private api: string = 'https://gaosoft.com.br/apiMobile/welcome/testar/';

  constructor(private http: HttpClient) { }

  private urlteste = 'https://gaosoft.com.br/apiMobile/welcome/buscarusuario/1';

  testando() {
    return this.http.get(this.urlteste);
  }


  inserirUsuario(dados: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/inserir/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('nome', dados['nome']);
    formData.append('email', dados['email']);
    formData.append('senha', dados['senha']);
    formData.append('numero', dados['numero']);
  
    return this.http.post(url, formData).toPromise();
  }

  enviarLoca(lat, long) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/enviarlocal/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('lat', lat);
    formData.append('long', long);
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));


    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  editarUsuario(dados: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/editarUsuario/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('nome', dados['nome']);
    formData.append('email', dados['email']);
    formData.append('senha', dados['senha']);
    formData.append('numero', dados['numero']);
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));
    
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  buscarUsuario(id: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/buscarUsuario/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('id', id);
    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }

  buscarPorTipos(tipo: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/buscarLocal/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));
    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }

  inserirDisponibilidade(dados: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/inserirDisponibilidade/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('cidade', dados['cidade']);
    formData.append('bairro', dados['bairro']);
    formData.append('numero', dados['numero']);
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));
    formData.append('opcao', dados['opcao']);
    formData.append('valor', dados['valor']);
    formData.append('cadastrado', '1');

    


    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  editarDisponibilidade(dados: string) {
    console.log(dados);
    let url = 'https://gaosoft.com.br/apiMobile/welcome/editarDisponibilidade/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }
    const formData = new FormData();
    formData.append('cidade', dados['cidade']);
    formData.append('bairro', dados['bairro']);
    formData.append('numero', dados['numero']);
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));
    formData.append('opcao', dados['opcao']);
    formData.append('valor', dados['valor']);
    formData.append('cadastrado', '1');
    return this.http.post(url, formData).toPromise();

    //let param = {nome: dados};
    //return this.http.post(url, header).toPromise();

  }

  buscarDisponibilidade(id: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/buscarDisponibilidade/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }
    const formData = new FormData();
    formData.append('id', id);
    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }

  buscarDisponibilidadeGeral(dados: string) {
    if (dados['cidade'] == '') {
      dados['cidade'] = null;
    }
    let url = 'https://gaosoft.com.br/apiMobile/welcome/buscarDisponibilidadePesquisa/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('cidade', dados['cidade']);
    formData.append('disponibilidade', dados['disponibilidade']);

    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }


  confirmarLogin(dados: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/buscar/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('email', dados['email']);
    formData.append('senha', dados['senha']);

    //let param = {nome: dados};
    return this.http.post(url, formData).toPromise();
    //return this.http.get(url, header).toPromise();

  }

  verificarEmail(dados: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/verificar/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }
    const formData = new FormData();
    formData.append('email', dados['email']);
    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }

  buscarMensagens() {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/ListarConversa/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));
    formData.append('outro_id', sessionStorage.getItem('id_usuario_enviar'));

    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }

  enviarMensagens(mensagem: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/EnviarConversa/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('id_usuario', sessionStorage.getItem('id_usuario'));
    formData.append('id_usuario_enviar', sessionStorage.getItem('id_usuario_enviar'));
    formData.append('mensagem', mensagem);
    return this.http.post(url, formData).toPromise();
    //let param = {nome: dados};

    //return this.http.post(url, header).toPromise();

  }

  deletarMensagemDuplicada(id: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/deletarMensagem/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData).toPromise();

    //return this.http.delete(url).toPromise();

  }

  buscarContatos() {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/ListarContatos/' + sessionStorage.getItem('id_usuario');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    const formData = new FormData();
    formData.append('id', sessionStorage.getItem('id_usuario'));

    //let param = {nome: dados};

    return this.http.post(url, formData).toPromise();

  }

  editarEstrelas(estrelas: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/editarAvaliacao/';

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};
    const formData = new FormData();
    formData.append('estrelas', estrelas);
    formData.append('id_estrelas_update', sessionStorage.getItem('id_estrelas_update'));
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //return this.http.post(url, header).toPromise();

  }

  inserirEstrelas(estrelas: string) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/inserirAvaliacao/' + estrelas + '/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_recebeu_estrelas');

    var header = {
      headers: new HttpHeaders()
        .set('Content-type', `application/json`)
    }

    //let param = {nome: dados};

    const formData = new FormData();
    formData.append('estrelas', estrelas);
    formData.append('id_enviou', sessionStorage.getItem('id_usuario'));
    formData.append('id_recebeu', sessionStorage.getItem('id_recebeu_estrelas'));
   
    
    console.log(formData);
    return this.http.post(url, formData).toPromise();

    //return this.http.post(url, header).toPromise();

  }




  //url = 'https://gaosoft.com.br/apiMobile/welcome/uploadImagemEditar/' + sessionStorage.getItem('id_usuario') + '/';

  uploadImage(blobData, name, ext) {
    let url = 'https://gaosoft.com.br/apiMobile/welcome/uploadImagemEditar/' + sessionStorage.getItem('id_usuario');


    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    console.log(blobData);
    //let url = 'https://gaosoft.com.br/apiMobile/welcome/uploadteste' + formData;

    //return this.http.ost()

    return this.http.post(url, formData).toPromise();

  }

  //urlChat = 'https://gaosoft.com.br/apiMobile/welcome/uploadImagemChat/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar') + '/';

  uploadImageChat(blobData, name, ext) {

    let urlChat = 'https://gaosoft.com.br/apiMobile/welcome/uploadImagemChat/' + sessionStorage.getItem('id_usuario') + '/' + sessionStorage.getItem('id_usuario_enviar') + '/';
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    console.log(blobData);
    //let url = 'https://gaosoft.com.br/apiMobile/welcome/uploadteste' + formData;

    //return this.http.ost()
    return this.http.post(urlChat, formData).toPromise();

  }


}
