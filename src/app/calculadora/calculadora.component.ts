import { Component } from '@angular/core';
import { DadosService } from '../dados.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dados } from '../dados';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  Dados: Dados[] = [];

  inputString: string = '';
  numberArray: number[] = [];
  heightArray: number[] = [];
  average: number = 0;
  variance: number = 0;
  deviation: number = 0;
  result: String = "";
  formGroupDados: FormGroup;


  constructor(private dadosService: DadosService,
    private formBuilder: FormBuilder) {
    this.formGroupDados = formBuilder.group({
      id: [''],
      altura: [''],
      inputString: [''],
      result: ['']
    });
  }


  extractHeights(): void {
    this.heightArray = this.Dados.map(dado => dado.altura);
  }


  convertStringToArray(): void {
    console.log(this.Dados)
    const stringArray = this.inputString.split(';');

    this.numberArray = stringArray.map(num => Number(num.trim()));

    if (this.numberArray.length > 0) {
      const sum = this.numberArray.reduce((acc, curr) => acc + curr, 0);
      this.average = sum / this.numberArray.length;
    }
    else {
      this.average = 0;
    }

    if (this.numberArray.length > 0) {
      const sum = this.numberArray.reduce((acc, curr) => acc + curr, 0);
      this.average = sum / this.numberArray.length;

      const squaredDifferences = this.numberArray.map(num => Math.pow(num - this.average, 2));
      const sumOfSquaredDifferences = squaredDifferences.reduce((acc, curr) => acc + curr, 0);
      this.variance = sumOfSquaredDifferences / this.numberArray.length;

      this.deviation = Math.sqrt(this.variance);
    } else {
      this.average = 0;
      this.variance = 0;
      this.deviation = 0;
    }

    this.result = "Média: " + this.average.toFixed(4) + "\n" + "\n" +
      "Variância: " + this.variance.toFixed(4) + "\n" + "\n" +
      "Desvio Padrão: " + this.deviation.toFixed(4);
  }


  ngOnInit(): void {
    this.loadDados();
  }

  loadDados() {
    this.dadosService.getDados().subscribe(
      {
        next: data => {
          this.Dados = data
          this.extractHeights();
        }
      }
    );
  }


  copyToClipboard(): void {
    const heightString = this.heightArray.join(';');
    navigator.clipboard.writeText(heightString).then(() => {
      console.log('Texto copiado com sucesso!');
    }).catch(err => {
      console.error('Não foi possível copiar o texto', err);
    });
  }
}
