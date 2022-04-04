import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nome1 = ""
  nome2 = ""
  url = "http://lucasreno.kinghost.net/love-calculator/"
  resultado = 0
  mensagem = ""
  calculando = false;
  imagem = false

  constructor(
    public http: HttpClient,
  ) { }

  async enviarDados() {
    let soma = 0;
    this.imagem = false
    while (soma != 10) {
      this.resultado = Math.floor(Math.random() * 100 + 1);
      this.calculando = true;
      soma += 1;
      await this.delay(75);
    }
    this.calculando = false;

    this.http.get<any>(this.url + this.nome1 + "/" + this.nome2).subscribe(
      (resposta: any) => {
        this.resultado = resposta;
        if (this.resultado < 20) this.mensagem = "Desisti, tu só tá se iludindo";
        else if (this.resultado < 40) this.mensagem = "Acho que ele(a) já tem outro(a)";
        else if (this.resultado < 60) this.mensagem = "Dá pra tentar, mas é mais fácil ser golpe";
        else if (this.resultado < 80) this.mensagem = "Vai que a chance você tem, só falta atitude";
        else{ 
          this.imagem = true;
          this.mensagem = "";
        }
      }
    );
    if(this.nome1 == "" || this.nome2 == ""){
      this.mensagem = "Insira certos os nomes, jaguara";
      this.resultado = 0;
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
