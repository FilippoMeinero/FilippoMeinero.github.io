let temp = true; // Variabile temporanea per tenere traccia del tipo di cattivo

class Cattivo {
    constructor(id) {
      this.id = id; // Salva l'identificativo del cattivo
      this.x = 900; // Imposta la posizione iniziale sull'asse x del cattivo
      this.y = 320; // Imposta la posizione iniziale sull'asse y del cattivo
      this.xVelocita = 2; // Velocità di movimento del cattivo sull'asse x
      this.yVelocita = 0; // Velocità di movimento del cattivo sull'asse y
      this.width = 50; // Larghezza del cattivo
      this.height = 50; // Altezza del cattivo
      this.vita = 500; // Punti vita del cattivo
      this.staGuardandoSinistra = false; // Flag per tenere traccia della direzione del cattivo
    }
  
    mostra() {
      // Se il cattivo sta guardando a sinistra, mostra l'immagine del cattivo rivolta a sinistra
      // Altrimenti, mostra l'immagine del cattivo rivolta a destra
      if (this.staGuardandoSinistra) {
        image(cattivo1Img, this.x, this.y, 250, 320);
      } else {
        image(cattivo1Sinistra, this.x, this.y, 250, 320);
      }
    }
  
    aggiorna() {
      // Aggiorna la posizione del cattivo sottraendo la velocità sull'asse x alla posizione attuale
      this.x -= this.xVelocita;
      
      // Se il cattivo raggiunge il bordo sinistro del canvas, inverto la direzione e faccio guardare il cattivo a destra
      // Se il cattivo raggiunge il bordo destro del canvas, inverto la direzione e faccio guardare il cattivo a sinistra
      if (this.x < 0) {
        this.x = 0;
        this.xVelocita *= -1;
        this.staGuardandoSinistra = !this.staGuardandoSinistra;
      } else if (this.x > width - this.width) {
        this.x = width - this.width;
        this.xVelocita *= -1;
        this.staGuardandoSinistra = !this.staGuardandoSinistra;
      }
      
      // Controllo che la posizione del cattivo rimanga all'interno dei bordi del canvas
      this.x = constrain(this.x, 0, width - this.width);
    
      // Se il cattivo si scontra con il giocatore inverto la direzione del cattivo
      if (
        this.x + this.width >= giocatore.x &&
        this.x <= giocatore.x + giocatore1.width &&
        this.y + this.height >= giocatore.y &&
        this.y <= giocatore.y + giocatore1.height
      ) {
        this.xVelocita *= -1;
        this.staGuardandoSinistra = !this.staGuardandoSinistra;
      }
    
      // Se la vita del cattivo scende a 0
      if (this.vita <= 0) {
        if (temp) { // Se il cattivo è cattivo1
          console.log("cattivo1 morto");
          // Cambio lo sfondo
          sfondo1 = sfondo2;
          sfondoCambiato = true;
          // Cambio l'immagine del cattivo
          cattivo1Img = cattivo2Img;
          cattivo1Sinistra = cattivo2Sinistra;
          // Incremento la vita del cattivo e resetto quella del giocatore
          this.vita = 700;
          giocatore.vita = 200;

          temp = false;
          changeBackground = true;

          intervalloDanno = 1500;  // Per il livello finale diminuisco l'intervallo di danno

          oraSfondo2 = true;

          timerLivello1 = millis() - tempoInizioLivello1;

          posxVitaCattivo = 350;
        } else if (!temp) { // Se il cattivo è cattivo2
          console.log("cattivo2 morto");
          vittoria = true;
        }
        // Resetto la direzione del cattivo
        this.staGuardandoSinistra = false;
      }
    }      
}
