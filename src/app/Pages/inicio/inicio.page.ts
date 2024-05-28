import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public vidas: number=0;
  public username: string="";
  public nivel: number=0;
  
  
  buttons: { id: number, label: string, color: string, level: number, vida: number }[] = [
    { id: 1, label: 'Facil', color: "primary", level: 1, vida: 7 },
    { id: 2, label: 'Medio', color: "success", level: 2, vida: 5},
    { id: 3, label: 'Dificil', color: "danger" , level: 3, vida: 3},
  ]

  constructor(public router:Router) { 
    
  }
  



  ngOnInit() {

   return 0
  }

  goTorecor(){
    this.router.navigateByUrl("/recor")
  }


  async Onplay(selectedButton: { id: number, label: string, color: string, level: number, vida: number }) {
    console.log('Nivel seleccionado:', selectedButton.level);

    // Guardar el nivel seleccionado en el almacenamiento local
    await Storage.set({
      key: 'nombre',
      value: this.username.toUpperCase()
    })

    await Storage.set({
      key: 'nivel',
      value: selectedButton.level.toString() // Convertir el nivel a una cadena antes de guardarlo
    });

    // Asignar valores a las variables de la clase
    this.nivel = selectedButton.level;
    this.username = "";
    this.vidas = selectedButton.vida;
    console.log("Vidas: ", this.vidas);

    // Navegar a la página de juego
    await this.router.navigateByUrl('/juego');
  }
}