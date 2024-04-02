import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { WordsService } from 'src/app/services/words.services';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {

  filaActual: number = 0;
  letters = ['A', 'B', 'C', 'D', 'E'];
  inputValues: string[] = ['', '', '', '', ''];
  palabraSecreta = "";
  numeroFilas = 5;
  level: any;
  player: any;
  nivel: string = "";

  constructor(private wordsService: WordsService) {}

  ngOnInit() {
    this.getPlayer();
    this.getLevel();
    this.getRandomWord();
  }

  getRandomWord() {
    this.wordsService.getRandomWord().subscribe(word => {
      this.palabraSecreta = word.toUpperCase();
      console.log("palabra secreta: ", this.palabraSecreta);
    });
  }

  getPlayer() {
    Storage.get({ key: 'nombre' }).then((result) => {
      this.player = result.value;
      console.log('nombre del jugador:', this.player);
    });
  }

  getLevel() {
    Storage.get({ key: 'nivel' }).then((result) => {
      this.level = result.value;
      console.log('Nivel:', this.level);
      if (this.level == '1') {
        this.nivel = "Fácil";
        this.numeroFilas = 7;
      } else if (this.level == '5') {
        this.nivel = "Intermedio";
        this.numeroFilas = 7;
      } else {
        this.nivel = "Dificil";
        this.numeroFilas = 3;
      }
    });
  }

  getNumberArray(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index);
  }

  verificarPalabra() {
    const palabraIngresada = this.inputValues.slice(this.filaActual * 5, this.filaActual * 5 + 5).join('').toUpperCase();
    const letrasSecretas = this.palabraSecreta.slice(this.filaActual * 5, this.filaActual * 5 + 5);

    for (let i = 0; i < 5; i++) {
      const letraIngresada = palabraIngresada.charAt(i);
      const letraSecreta = letrasSecretas.charAt(i);

      if (letraIngresada === letraSecreta) {
        this.setInputColor(this.filaActual * 5 + i, 'green');
      } else if (letrasSecretas.includes(letraIngresada)) {
        this.setInputColor(this.filaActual * 5 + i, 'yellow');
      } else {
        this.setInputColor(this.filaActual * 5 + i, 'red');
      }
    }

    if (palabraIngresada === letrasSecretas) {
      if (this.filaActual === this.numeroFilas - 1) {
        alert("¡Ganaste el juego!");
      } else {
        this.filaActual++;
        this.inputValues.fill('', this.filaActual * 5, this.filaActual * 5 + 5);
      }
    } else {
      alert("Sigue intentando");
    }
  }

  setInputColor(index: number, color: string) {
    const inputElement = document.getElementById(`input-${index}`);
    if (inputElement) {
      inputElement.style.backgroundColor = color;
    }
  }
}