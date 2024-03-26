class Bomba {
  constructor(x, y) {
      this.x = x;  // Posizione orizzontale della bomba
      this.y = y;  // Posizione verticale della bomba
      this.speed = 2;  // Velocità di caduta della bomba
      this.exploded = false;  // Stato dell'esplosione della bomba
      this.explosionTime = 0;  // Tempo dell'esplosione
      this.hasDamaged = false;  // Stato del danno causato dall'esplosione
  }

  // Metodo per visualizzare la bomba o l'esplosione
  mostra() {
    if (!this.exploded) {
      // Se la bomba raggiunge y = 480 esplode
      if (this.y >= 480) {
        this.exploded = true;
        this.explosionTime = millis();
      } else {
        // Visualizza l'immagine della bomba
        image(bomba, this.x, this.y, 50, 120);
      }
    } else if (millis() - this.explosionTime < 1000) {
      // Visualizza l'immagine dell'esplosione per 1 secondo
      image(esplosione, this.x, this.y, 150, 150);
    }
  }

  // Metodo per aggiornare la posizione della bomba
  aggiorna() {
    if (!this.exploded) {
      // La bomba cade verso il basso
      this.y += this.speed;
      // Se la bomba supera l'altezza del canvas, esplode
      if (this.y > height) {
        this.exploded = true;
        this.explosionTime = millis();
      }
    }
  }
}
