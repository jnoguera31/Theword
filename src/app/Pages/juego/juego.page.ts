import { RecordService } from 'src/app/services/record.services';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { WordsService } from 'src/app/services/words.services';
import { FilaInputs } from 'src/app/model/fila-inputs.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.services';




@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit, OnDestroy {
  @ViewChildren('inputFila', { read: ElementRef }) inputsFila: QueryList<ElementRef>;


  // VARIABLES

  minutes:number= 0;
  seconds:number = 0;
  private interval: any;
  filas: FilaInputs[] = [];
  numeroFilas=7 
  palabraSecreta = "";
  filaActual: number = 0; 
  intentos: number = 0;
  level: any;
  player: any;
  nivel: string = "";
  words: any[]=[];
  puntos: number = 0;
  tiempo: any = 0;
  attemps: number = 0;
  highestPoints: number=0;
  photoUrl: string | undefined;
  

  constructor(private wordsService: WordsService, private photoService: PhotoService, private alertController: AlertController, public router: Router, private RecordService: RecordService) {
    this.inputsFila = new QueryList<ElementRef>();
  }

  ngOnInit() {

    this.getPlayer();
    this.getLevel();
    this.GetWordRam();
    this.starTimer();
    this.Get1Record();
 

    
   
    
  

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  Get1Record(){

    this.RecordService.getHighestRecordPoints().subscribe(points => {
      this.highestPoints = points;
      console.log('Highest Points:', this.highestPoints);
    });
    
  }


  starTimer(){
    this.interval = setInterval(() => {
      this.seconds++;
      if (this.seconds == 60) {
        this.minutes++;
        this.seconds = 0;
      }
    }, 1000);
  }

  BackHome(){
    this.router.navigateByUrl("/inicio")
    this.ClearData();
  }


  async GetWordRam() {
    try {
      const palabraS = await this.wordsService.GetWords();
      this.palabraSecreta = palabraS.toUpperCase();
      console.log("palabra secreta:", palabraS);

    } catch (error) {
      console.error("Error al obtener las palabras:", error);
    }
  }

  calculatePuntos(): void {
    this.puntos = (this.level - this.attemps) +10 + this.tiempo + 450;
    console.log("PUNTOS",this.puntos)
  }
  


  /* -- Obtener palabras del archivo json local

  getRandomWord() {
    this.wordsService.getRandomWord().subscribe(word => {
      this.palabraSecreta = word.toUpperCase();
      console.log("palabra secreta: ", this.palabraSecreta);
    });
  }
  */

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
        this.intentos=7
        console.log('Número de filas para nivel fácil:', this.numeroFilas);
      } else if (this.level == '2') {
        this.nivel = "Intermedio";
        this.numeroFilas = 5;
        this.intentos=5;
        console.log('Número de filas para nivel Intermedio:', this.numeroFilas);
      } else {
        this.nivel = "Difícil";
        this.numeroFilas = 3;
        this.intentos=3;
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
    this.intentos=this.intentos-1;
    this.attemps= this.attemps + 1;
    if (this.intentos==0){
      this.Perder();
    }
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


  async Ganar() {
    try {
        // Ejecutar calculatePuntos y esperar a que termine
        await this.calculatePuntos();
        
        console.log("REC: ", this.highestPoints);
        
        // Verificar si los puntos son mayores que el puntaje más alto
        if (this.puntos > this.highestPoints) {
            alert("¡Felicidades! Eres el nuevo Top 1");
            alert("Necesitamos una foto tuya");
            
            // Tomar y guardar la foto y esperar a que termine
            await this.takeAndSavePhoto();
        }
        
        // Presentar la alerta y esperar a que termine
        await this.presentAlert();
        
        // Agregar el registro y esperar a que termine
        await this.Addrecord();
    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución
        console.error('Error:', error);
    }
}


  Perder(){
    alert("PERDISTE")
    alert("La palabra era: "+this.palabraSecreta)
    this.ClearData();
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

  Addrecord(): void {

    
    this.tiempo=this.minutes+":"+this.seconds;
    const newRecord = {
      nombre: this.player,
      palabra: this.palabraSecreta,
      nivel: this.level,
      tiempo: this.tiempo,
      intentos: this.attemps,
      puntos: this.puntos,
      foto: this.photoUrl
      
    };

    this.RecordService.addRecord(newRecord).subscribe(response => {
      console.log('Record agregado correctamente', response);
    }, error => {
      console.error('Error al añadir record', error);
    });

    this.ClearData()

  }


  ClearData(){
    console.log("Vaciando datos ...")
    Storage.remove({ key: 'nombre' });
    Storage.remove({ key: 'nivel' });
    this.palabraSecreta="";
    this.intentos=0;
    this.nivel="";
    this.player="";
    this.router.navigateByUrl('/inicio');
    this.photoUrl="";

  }

  async takeAndSavePhoto() {
    try {
      this.photoUrl = await this.photoService.savePhotoToVariable();
    } catch (error) {
      this.photoUrl="NO PHOTO"
      console.error("Error taking photo:", error);
    }
  }


}