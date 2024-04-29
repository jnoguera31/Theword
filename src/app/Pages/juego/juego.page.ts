import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { WordsService } from 'src/app/services/words.services';
import { FilaInputs } from 'src/app/model/fila-inputs.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
  @ViewChildren('inputFila', { read: ElementRef }) inputsFila: QueryList<ElementRef>;
  // VARIABLES

  filas: FilaInputs[] = [];
  numeroFilas=7 // Puedes cambiar este valor según tus necesidades
  palabraSecreta = "";
  filaActual: number = 0; 
  level: any;
  player: any;
  nivel: string = "";
  

  constructor(private wordsService: WordsService, private alertController: AlertController, public router: Router) {
    this.inputsFila = new QueryList<ElementRef>();
  }

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
        console.log('Número de filas para nivel fácil:', this.numeroFilas);
      } else if (this.level == '2') {
        this.nivel = "Intermedio";
        this.numeroFilas = 5;
        console.log('Número de filas para nivel Intermedio:', this.numeroFilas);
      } else {
        this.nivel = "Difícil";
        this.numeroFilas = 3;
        console.log('Número de filas para nivel dificil:', this.numeroFilas);
      }

    this.crearFilasSegunVariable(this.numeroFilas)
    });
  }


  crearFilasSegunVariable(cantidad: number) {
    for (let i = 0; i < cantidad; i++) {
      const nuevaFila = new FilaInputs();
      nuevaFila.habilitada = i === 0; // Habilitar solo la primera fila
      this.filas.push(nuevaFila);
    }
  }

  agregarFila() {
    const nuevaFila = new FilaInputs();
    nuevaFila.habilitada = this.filas.length === this.filaActual; // Habilitar solo la fila en la posición filaActual
    this.filas.push(new FilaInputs());
  }

  verificarFila(): boolean {

    // Obtener las letras ingresadas por el jugador en la fila actual

    const inputs = this.inputsFila.filter((_, i) => Math.floor((i as number) / 5) === this.filaActual);
    const letrasIngresadas = inputs.map(input => input.nativeElement.value.trim().toUpperCase());
  
    // Verificar si todos los campos están llenos

    for (const input of inputs) {
      if (input.nativeElement.value.trim() === '') {
        console.log('Falta llenar uno o más campos en la fila', this.filaActual + 1);
        return false;
      }
    }
  
    // Obtener las letras de la palabra secreta

    const letrasPalabraSecreta = this.palabraSecreta.split('');
    
    const todasCoinciden = letrasIngresadas.every((letra, i) => letra === letrasPalabraSecreta[i]);

    if(todasCoinciden){
      this.Ganar()
    }
    // Comparar las letras

    letrasIngresadas.forEach((letra, i) => {
      const input = inputs[i];
      const letraSecreta = letrasPalabraSecreta[i];
  
      if (letra === letraSecreta) {

        // Coinciden con la posición
        input.nativeElement.style.backgroundColor = 'green';
        input.nativeElement.style.color = 'white';
      } else if (letrasPalabraSecreta.includes(letra)) {
        // Existe, pero no en la misma posición
        input.nativeElement.style.backgroundColor = 'yellow';
        input.nativeElement.style.color = 'white';
      } else {
        // No existe en la palabra secreta
        input.nativeElement.style.backgroundColor = 'darkgray';
        input.nativeElement.style.color = 'white';
      }


    });
  
    // Si todos los campos están llenos, pasar a la siguiente fila
    console.log('Todos los campos de la fila', this.filaActual + 1, 'están llenos');
    this.siguienteFila();
    return true;
  }
  

  siguienteFila() {

    // Deshabilitar la fila anterior

    if (this.filaActual > 0) {
      this.filas[this.filaActual - 1].habilitada = false;
    }
  
    // Habilitar la nueva fila actual

    if (this.filaActual < this.filas.length) {
      this.filas[this.filaActual].habilitada = true;
    }
  
    this.filaActual++;
  }


  Ganar(){

    // Mensaje de fecilitacion
    
    this.presentAlert()


    /// Logica para guardar info en DB
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'GANASTE',
      subHeader: "Resumen de juego",
      message: "Palabra secreta: " + this.palabraSecreta + "<br>" + "Nivel: " + this.nivel + "<br>" + "Jugador: " + this.player,
      
      
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {

            this.router.navigateByUrl('/inicio')
          },
        },
      
        
      ],
    });
  
    await alert.present();
  }



}