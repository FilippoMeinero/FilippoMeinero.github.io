class Medikit {
  constructor(x) {
      this.x = x; // Posizione sull'asse x del medikit
      this.y = 520; // Posizione sull'asse y del medikit
      this.startTime = millis(); // Tempo di inizio dell'oggetto medikit
      this.isExpired = false; // Flag per indicare se il medikit è scaduto
      this.hasHealed = false; // Flag per indicare se il medikit ha già curato
  }

  // Metodo per mostrare l'immagine del medikit
  mostra() {
    image(medikit, this.x, this.y, 100, 100); // Disegna l'immagine del medikit alle coordinate x, y
  }

  // Metodo per aggiornare lo stato del medikit
  aggiorna() {
    // Se sono passati più di 2 secondi dal tempo di inizio
    if (millis() - this.startTime > 2000) {
      this.isExpired = true; // Imposta il flag isExpired a true quando il medikit è scaduto
    }
  }
}
