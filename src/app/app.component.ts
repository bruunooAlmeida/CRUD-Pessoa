import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common'; // Importe o CommonModule aqui
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Consumir-Api';
  http = inject(HttpClient);
  url = 'http://localhost:5075';
  pessoas$?: Observable<Pessoa[]>;

  pessoaEncontrada$?: Observable<Pessoa>;
  valorBuscaPessoa = '';
  nomeAdicionar = '';
  idAtualizar = '';
  nomeAtualizar = '';

  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas() {
    this.pessoas$ = this.http.get<Pessoa[]>(`${this.url}/pessoas`);

  }

  obterPessoa(){
    if (!this.valorBuscaPessoa) return;
    this.pessoaEncontrada$ = this.http.get<Pessoa>(`${this.url}/pessoas/${this.valorBuscaPessoa}`);
  }

  AdicionarPessoa(){
    if (!this.nomeAdicionar) return;
    const novaPessoa: Pessoa = {
      id: "b9216a6f-ec89-4109-bd29-5f2c69797f00",
      nome: this.nomeAdicionar,
    };


    this.http.post<void>(`${this.url}/pessoas`, novaPessoa)
      .subscribe((_) => this.obterPessoas());
  }

  ObterDadosAtualizar( pessoa: Pessoa){
    console.log(pessoa.id);
      this.idAtualizar = pessoa.id;
      this.nomeAtualizar =  pessoa.nome;

  }

  AtualizarNome(){
      if (!this.AtualizarNome) return;
      console.log(this.idAtualizar);
      const atualizarPessoa: Pessoa = {
            id: this.idAtualizar,
            nome: this.nomeAtualizar,
      };

      const url = `${this.url}/pessoas/${this.idAtualizar}`;

      console.log(url);

      this.http
        .put<Pessoa>(url, atualizarPessoa)
        .subscribe((_) => {
          this.obterPessoas()
          this.nomeAtualizar = '';
        }
        );

  }

}
