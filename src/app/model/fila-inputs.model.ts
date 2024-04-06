export class FilaInputs {
    datos: Record<string, string>;
    habilitada: boolean;
  
    constructor() {
      this.datos = {
        letra1: '',
        letra2: '',
        letra3: '',
        letra4: '',
        letra5: ''
      };
      this.habilitada = false; // inicialente todas las filas estan inhabilitadas
    }
  }