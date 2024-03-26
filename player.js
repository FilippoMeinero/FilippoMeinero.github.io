class Giocatore {
  constructor() {
    this.x = 100; // Posizione iniziale del giocatore sull'asse x
    this.y = 500; // Posizione iniziale del giocatore sull'asse y
    this.xVelocita = 5; // Velocità del giocatore sull'asse x
    this.yVelocita = 0; // Velocità del giocatore sull'asse y
    this.gravità = 0.2; // Forza di gravità applicata al giocatore
    this.staSaltando = false; // Flag per verificare se il giocatore sta saltando
    this.muoviSinistraFlag = false; // Flag per verificare se il giocatore si sta muovendo a sinistra
    this.muoviDestraFlag = false; // Flag per verificare se il giocatore si sta muovendo a destra
    this.vita = 200;  // Punti vita del giocatore
    this.immagineCorsaAttuale = 0; // Indice dell'immagine corrente per l'animazione di corsa
    this.staGuardandoSinistra = false;  // Flag per verificare se il giocatore sta guardando a sinistra
  }
  
    // Metodo per far vedere il player
    // Se il giocatore sta saltando, visualizza l'immagine di salto
    // Altrimenti, se il giocatore si sta muovendo, visualizza l'immagine di corsa
    // Se il giocatore non si sta muovendo, visualizza l'immagine ferma
    mostra() {
      if (this.staSaltando) {
        if (this.staGuardandoSinistra) {
          image(giocatoreSaltoImgSinistra, this.x, this.y, 95, 150);
        } else {
          image(giocatoreSaltoImg, this.x, this.y, 95, 150);
        }
      } else if (this.muoviSinistraFlag || this.muoviDestraFlag) {
        if (millis() - ultimoTempoCambioImmagine >= intervalloCambioImmagine) {
          this.immagineCorsaAttuale = (this.immagineCorsaAttuale + 1) % immaginiCorsaGiocatore.length;
          ultimoTempoCambioImmagine = millis();
        }
        if (this.staGuardandoSinistra) {
          image(immaginiCorsaGiocatoreSinistra[this.immagineCorsaAttuale], this.x, this.y, 95, 150);
        } else {
          image(immaginiCorsaGiocatore[this.immagineCorsaAttuale], this.x, this.y, 95, 150);
        }
      } else {
        if (this.staGuardandoSinistra) {
          image(giocatore1Sinistra, this.x, this.y, 95, 150);
        } else {
          image(giocatore1, this.x, this.y, 95, 150);
        }
      }
    }
  
    // Metodo per per aggiornare l'immagine e la posizione del personaggio
    // Se il flag muoviSinistraFlag è true, muove il giocatore a sinistra
    // Se il flag muoviDestraFlag è true, muove il giocatore a destra
    // Aggiorna la posizione y del giocatore in base alla velocità y e alla gravità
    // Impedisce al giocatore di scendere oltre un certo limite sull'asse y
    aggiorna() {
      if (this.muoviSinistraFlag) {
        this.muoviSinistra();
      } else if (this.muoviDestraFlag) {
        this.muoviDestra();
      }
  
      this.y += this.yVelocita;
      this.yVelocita += this.gravità;
  
      // Limita la posizione verticale del giocatore per non permettergli di scendere oltre un certo limite (180)
      this.y = constrain(this.y, 0, height - 180); 
  
      if (this.y >= height - 180) {
        this.staSaltando = false;
      }
    }
  
    // Metodo per muovere il giocatore a sinistra
    // Se il giocatore non supera il bordo sinistro del canvas muove il giocatore a sinistra
    // Imposta il flag staGuardandoSinistra a true
    muoviSinistra() {
      if (this.x - this.xVelocita >= 0) { // Verifica se il giocatore non supera il bordo sinistro del canvas
        this.x -= this.xVelocita; // Sposta l'img del player a sx
      }
      this.staGuardandoSinistra = true;
    }
    
    // Metodo per muovere il giocatore a destra
    // Se il giocatore non supera il bordo destro del canvas muove il giocatore a destra
    // Imposta il flag staGuardandoSinistra a false
    muoviDestra() {
      if (this.x + this.xVelocita + 95 <= width) { // Verifica se il giocatore non supera il bordo destro del canvas (95 è la larghezza dell'immagine del giocatore)
        this.x += this.xVelocita; // Sposta l'img del player a dx
      }
      this.staGuardandoSinistra = false;
    }
  
    // Metodo per impostare il flag muoviSinistraFlag
    impostaSinistra(valore) {
      this.muoviSinistraFlag = valore;
    }
  
    // Metodo per impostare il flag muoviDestraFlag
    impostaDestra(valore) {
      this.muoviDestraFlag = valore;
    }
  
    // Metodo per far saltare il giocatore
    salto() {
      if (!this.staSaltando) {  // Il player può saltare solo quando non sta saltando
        this.yVelocita = -7;  
        this.staSaltando = true;
      }
    }

    // Metodo per verificare la collisione tra il giocatore e una bomba
    // Se la bomba è esplosa e non ha ancora causato danni, verifica se il giocatore è a distanza di collisione
    // Se il giocatore è a distanza di collisione, riduce i punti vita del giocatore e segna la bomba come "ha causato danni"
    verificaCollisione(bomba) {
      let distanza = dist(this.x, this.y, bomba.x, bomba.y);  // Restituisce la distanza tra i due punti per verificare la collisione tra il player e la bomba
      if (bomba.exploded && !bomba.hasDamaged && distanza < 100) { // 100 è la somma dei raggi del giocatore e dell'esplosione
          this.vita -= 20;
          bomba.hasDamaged = true; // Imposta l'attributo hasDamaged a true dopo aver causato danni
      }
    }  

    // Metodo per verificare la collisione tra il giocatore e un medikit
    // Se il medikit non ha ancora curato e il giocatore è a distanza di collisione aumenta i punti vita del giocatore e segna il medikit come "ha curato"
    verificaCollisioneMedikit(medikit) {
      let distanza = dist(this.x, this.y, medikit.x, medikit.y);  // Restituisce la distanza tra i due punti per verificare la collisione tra il player e il medikit
      if (!medikit.hasHealed && distanza < 100) { // 100 è la somma dei raggi del giocatore e del medikit
          this.vita += 20;
          medikit.hasHealed = true; // Imposta l'attributo hasHealed a true dopo aver curato
      }
  }    
}