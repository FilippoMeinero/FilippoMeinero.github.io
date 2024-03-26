let giocatore;
let giocatore1;
let sfondo1;
let sfondo2;
let giocatore1Sinistra;
let cattivo1Img;
let cattivo1;
let cattivo2;
let cattivo1Sinistra; // Immagine del nemico quando si muove verso sinistra
let cattivo2Img; // Nuova immagine del cattivo
let cattivo2Sinistra; // Nuova immagine del cattivo quando si muove verso sinistra
let giocatoreSaltoImg; // Nuova immagine per il salto del giocatore
let giocatoreSaltoImgSinistra;
let ultimoTempoDanno = 0;
let intervalloDanno = 3000; // Intervallo di 3 secondi
let gameOver = false;
let sfondoGameOver;
let sfondoVittoria;
let sfondoStart;
let pixelFont;
let schermata1;
let schermata2;
let sfondoPausa;
let bomba;
let esplosione;
let medikit;
let sfondoCommands;

let musicaLobby;
let musicaSchermata1;
let musicaSchermata2;
let musicaSfondo1;
let musicaSfondo2;
let effVictory;
let musicaGameOver;
let musicaCommands;

let musicaLobbyCaricata;
let musicaSchermata1Caricata;
let musicaSchermata2Caricata;
let musicaSfondo1Caricata;
let musicaSfondo2Caricata;
let effVictoryCaricato;
let musGamerOverCaricata;
let musicaCommandsCaricata;

let sfondoCambiato;

let schermata = 0;

let vittoria = false;
let isPaused = false;

let adessoSfondo1 = true;
let tempoDiRifermento = 0;
let intervallo;

let immaginiCorsaGiocatore = []; // Array per memorizzare le immagini del giocatore in corsa
let ultimoTempoCambioImmagine = 0;
const intervalloCambioImmagine = 200; // Intervallo di 0.2 secondi

let gameStarted = false; // Variabile per controllare se il gioco è iniziato
let changeBackground = false; // Variabile per controllare se lo sfondo deve essere cambiato

let bombe = [];
let medikits = [];

let oraSfondo2 = false;

let punteggio = 100;
let timerLivello1;
let timerLivello2;
let tempoInizioLivello1;
let tempoInizioLivello2;
let punteggioFinale;
let punteggioFinaleCalcolato = false;

let posxVitaCattivo = 270;  // Variabile per la posizione x della barra della vita del cattivo

function preload() {
  sfondo1 = loadImage('./img/Sfondo1.gif');
  sfondo2 = loadImage('./img/Sfondo3.gif');
  giocatore1 = loadImage('./img/persPixel_fermo.png');
  giocatore1Sinistra = loadImage('./img/persPixel_fermoSX.png'); // Immagine del giocatore fermo verso sinistra
  giocatoreSaltoImg = loadImage('./img/persPixel_salto.png');
  giocatoreSaltoImgSinistra = loadImage('./img/persPixel_saltoSX.png'); // Immagine del giocatore che salta verso sinistra
  cattivo1Img = loadImage('./img/Nemico1.png');
  cattivo1Sinistra = loadImage('./img/Nemico1SX.png'); // Immagine del nemico quando si muove verso sinistra
  cattivo2Img = loadImage('./img/Nemico3.png');
  cattivo2Sinistra = loadImage('./img/Nemico3SX.png'); // Nuova immagine del cattivo quando si muove verso sinistra
  sfondoGameOver = loadImage('./img/gameOver.jpg');
  sfondoVittoria = loadImage('./img/sfondoVittoria.webp');
  sfondoStart = loadImage('./img/start.gif');
  pixelFont = loadFont('./char/char.ttf');
  schermata1 = loadImage('./img/schermata1.gif');
  schermata2 = loadImage('./img/schermata2.gif');
  sfondoPausa = loadImage('./img/pausa.jpg');
  bomba = loadImage('./img/bomba.png');
  esplosione = loadImage('./img/esplosione.png');
  medikit = loadImage('./img/medikit.png');
  sfondoCommands = loadImage('./img/sfondoCommands.jpg');

  // Carica le immagini del giocatore in corsa
  immaginiCorsaGiocatore[0] = loadImage('./img/persPixel_corsa.png');
  immaginiCorsaGiocatore[1] = loadImage('./img/persPixel_corsa1.png');
  immaginiCorsaGiocatoreSinistra = []; // Array per memorizzare le immagini del giocatore in corsa verso sinistra
  immaginiCorsaGiocatoreSinistra[0] = loadImage('./img/persPixel_corsaSX.png');
  immaginiCorsaGiocatoreSinistra[1] = loadImage('./img/persPixel_corsa1SX.png');

  musicaLobby = loadSound('./musica/musLobby.mp3');
  musicaSchermata1 = loadSound('./musica/musSchermata1.mp3');
  musicaSchermata2 = loadSound('./musica/musSchermata2.mp3');
  musicaSfondo1 = loadSound('./musica/musSfondo1.mp3');
  musicaSfondo2 = loadSound('./musica/musSfondo2.mp3');
  effVictory = loadSound('./musica/effVictory.mp3');
  musicaGameOver = loadSound('./musica/musGameOver.mp3');
  musicaCommands = loadSound('./musica/musCommands.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  giocatore = new Giocatore();
  cattivo1 = new Cattivo(1);
  cattivo2 = new Cattivo(2);

  musicaLobbyCaricata = false;
  musicaSchermata1Caricata = false;
  musicaSchermata2Caricata = false;
  musicaSfondo1Caricata = false;
  musicaSfondo2Caricata = false;
  effSfondo1Caricato = false;
  effVictoryCaricato = false;
  musGamerOverCaricata = false;
  musicaCommandsCaricata = false;


  sfondoCambiato = false;
}

function draw() {
  if (isPaused) {
    // Ferma la musica quando il gioco è in pausa
    //musicaLobby.stop();
    musicaSchermata1.stop();
    musicaSchermata2.stop();
    musicaSfondo1.stop();
    musicaSfondo2.stop();

    // Utilizzo un if per far partire la musica così viene caricata una volta sola
    if(!musicaLobbyCaricata){ // Imposta la musica della lobby quando il gioco è in pausa
      musicaLobby.play();
      musicaLobbyCaricata = true;
    }  
    background(sfondoPausa);
    textSize(50);
    textAlign(CENTER);
    text("Paused", width / 2, height / 4);
    disegnaPulsante(width - 120, height - 60, "Resume", () => {
      isPaused = false;
      if(adessoSfondo1){  //quando viene premuto il pulsante Resume la musica del livello non riparte
        if(!musicaSfondo1Caricata){
          musicaSfondo1.loop(); // Uso loop per far si che quando finisce riparte
          musicaSfondo1Caricata = true;
          adessoSfondo1 = false;
        } 
      }else{
        if(!musicaSfondo2Caricata){
          musicaSfondo2.loop();
          musicaSfondo2Caricata = true;
        }
      }
    });
    disegnaPulsante(120, height - 60, "Quit", () => {
      location.reload();  // Ricarica la pagina web
    });
  } else if (!gameStarted) {
    if (schermata === 0) {
      if(!musicaLobbyCaricata){
        musicaCommands.stop();
        musicaLobby.loop();
        musicaLobbyCaricata = true;
      } 
      background(sfondoStart);
      textFont(pixelFont);
      textSize(80);
      textAlign(CENTER);
      text("Save Metronix", width / 2, height / 4);
      disegnaPulsante(width / 2 + 120, height * 3 / 4, "Start", () => {
        schermata = 1;
      });
      disegnaPulsante(width / 2 - 120, height * 3 / 4, "Commands", () => {
        schermata = 2;
      });
    } else if (schermata === 1) {
      if(!musicaSchermata1Caricata){
        musicaLobby.stop();
        musicaSchermata1.loop();
        musicaSchermata1Caricata = true;
      }      
      background(schermata1);
      textSize(20);
      text("La città di Metronix è un luogo futuristico e i robot controllano ogni cosa. \nIl robot generale, Terminator, è un credele dittatore e costringe \ngli ultimi umani rimasti a vivere come schiavi. \nAlcuni di loro però hanno iniziato una rivolta e tu \nsei l'unica persona che può aiutarli. \nMa per raggiungere Metronix bisogna superare un portale interdimensionale \nper giungere nella dimensione parallela in cui si trova la città. \nQuesto portale però è nascosto nella giungla \ne sorvegliato da un guardiano di pietra...", width / 2, 260);
      disegnaPulsante(width - 120, height - 60, "Start", () => {
        gameStarted = true;
        gameOver = false;
        vittoria = false;
        schermata = 0;
      });
    } else if (schermata === 2) {
      if(!musicaCommandsCaricata){
        musicaLobby.stop();
        musicaCommands.loop();
        musicaCommandsCaricata = true;
      } 
      background(sfondoCommands);   
      textFont(pixelFont);
      textSize(50);
      textAlign(CENTER);
      text("Commands", width / 2, height / 4);

      textSize(25);      
      text("A - SINISTRA | D - DESTRA \nSPAZIO - SALTO \nESC - PAUSA \nMOUSE - ATTACCO \nAttenzione alle bombe che cadono dal cielo \nCerca di raccogliere i medikit perché sono utili per curarti", width / 2, height / 2);
      disegnaPulsante(width - 120, height - 60, "Back", () => {
        schermata = 0;
        musicaLobbyCaricata = false;
        musicaCommandsCaricata = false;
      });
    }
  } else if (!gameOver && !vittoria) {
    if (changeBackground) {
      if(!musicaSchermata2Caricata){
        musicaSfondo1.stop();
        musicaSchermata2.loop();
        musicaSchermata2Caricata = true;
      }      
      background(schermata2);
      textSize(20);
      text("Sconfitto il guardiano ti ritrovi alle porte di Metronix. \nLa città è un luogo cupo e tetro e ora \nl'unico modo per liberare gli umani schiavizzati \ndai robot è quello di sconfiggere il dittatore Terminator \nin uno scontro epico!", width / 2, 260);
      disegnaPulsante(width - 120, height - 60, "Start", () => {
        changeBackground = false;
      });
    } else if (sfondo1 === undefined) {
      // if(!musicaSfondo2Caricata){
      //   musicaSchermata2.stop();
      //   musicaSfondo2.play();
      //   musicaSfondo2Caricata = true;
      // }    

      background(sfondo2);
      // if (keyCode === ESCAPE) {
      //   isPaused = true;
      // }      
    } else {
      if(!musicaSfondo1Caricata){
        musicaSchermata1.stop();
        musicaLobby.stop();
        musicaSfondo1.loop();
        musicaSfondo1Caricata = true;
      }  
      if(sfondoCambiato){
        if(!musicaSfondo2Caricata){
          musicaSchermata2.stop();
          musicaLobby.stop();
          musicaSfondo2.loop();
          musicaSfondo2Caricata = true;
        }
      }
      background(sfondo1);  
      tempoInizioLivello1 = millis();  
      if (keyCode === ESCAPE) { // Quando si preme ESC il gioco viene messo in pausa
        isPaused = true;
      }  
    }

    if (keyIsDown(65)) {  // Se si preme A il player si muove a sinistra
      giocatore.impostaSinistra(true);
    } else if (keyIsDown(68)) { // Se si preme D il player si muove a destra
      giocatore.impostaDestra(true);
    } else {
      giocatore.impostaSinistra(false);
      giocatore.impostaDestra(false);
    }

    if (keyIsDown(32)) {  // Se si preme SPAZIO il player salta
      giocatore.salto();
    }

    if (!changeBackground){ // Quando non c'è una schermata di storia
      cattivo1.mostra();
      cattivo1.aggiorna();

      cattivo2.mostra();
      cattivo2.aggiorna();

      giocatore.mostra();
      giocatore.aggiorna();

      fill(255, 0, 0);
      rect(100, 10, giocatore.vita, 10); // Barra della vita del player in alto a sinistra

      fill(255, 0, 0);
      rect(width - posxVitaCattivo, 10, cattivo1.vita, 10); // Barra della vita del cattivo in alto a destra
    

      
      if (oraSfondo2) { // Se c'è lo sfondo2 (livello 2)
        tempoInizioLivello2 = millis();
        if (random() < 0.01) {  // Probabilità dell'1 % (molto bassa per generare bombe e medikit)
          let numBombe = floor(random(1, 2)); // Genera un numero casuale tra 1 e 3 (4 escluso)
          for (let i = 0; i < numBombe; i++) {  // Scorre tutte le bombe
            bombe.push(new Bomba(random(width), 0));  // Crea per ogni bomba un oggetto Bomba
          }
          medikits.push(new Medikit(random(width)));  // Crea un oggetto Medikit
        }

        for (let bomba of bombe) {  // Verifica collisione per ogni bomba
          giocatore.verificaCollisione(bomba);
        }
    
        for (let i = bombe.length - 1; i >= 0; i--) { // Mostra e aggiorna tutte le bombe
          bombe[i].mostra();
          bombe[i].aggiorna();
          if (bombe[i].exploded && millis() - bombe[i].explosionTime > 1000) {
            bombe.splice(i, 1); // Quando un bomba esplode, dopo 1 sec la elimino dal vettore
          }
        }

        for (let medikit of medikits) { // Mostra e aggiorna tutti i medikit
          medikit.mostra();
          medikit.aggiorna();
          
          giocatore.verificaCollisioneMedikit(medikit); // Verifico la collisione
        }
    
        for (let i = medikits.length - 1; i >= 0; i--) {
          medikits[i].mostra();
          medikits[i].aggiorna();
          if (medikits[i].isExpired) { // Controlla il flag isExpired
            medikits.splice(i, 1); // Rimuovi il medikit dal vettore
          }
        }
      }
    }  


    // Controlla se è passato l'intervallo di tempo per infliggere danni al giocatore
    if (millis() - ultimoTempoDanno >= intervalloDanno) {
      giocatore.vita -= 10; // Infligge 10 danni al giocatore
      ultimoTempoDanno = millis(); // Aggiorna il tempo dell'ultimo danno
    }

    // Controlla se il giocatore è morto
    if (giocatore.vita <= 0) {
      fineGioco();
    }
  } else if (gameOver && !vittoria) {
      // Sfondo del game over
      background(sfondoGameOver);
      if(!musGamerOverCaricata){
        musicaSfondo1.stop();
        musicaSfondo2.stop();
        musicaGameOver.play();
        musGamerOverCaricata = true;
      }
      disegnaPulsante(width / 2, height * 3 / 4, "Restart", () => {
        gameStarted = false;
      });
  } else if (!gameOver && vittoria) {
    timerLivello2 = millis() - tempoInizioLivello2;
      if(!effVictoryCaricato){
        musicaSfondo2.stop();
        effVictory.play();
        effVictoryCaricato = true;
      }      
      background(sfondoVittoria);
      textFont(pixelFont);
      textSize(50);
      textAlign(CENTER);
      text("You Win!", width / 2, height / 4);

      textSize(25); 
      text("Complimenti, hai sconfitto il tiranno Terminator \ne l'umanità di Metronix ti ringrazia", width / 2, height / 3);

      if(!punteggioFinaleCalcolato){
        punteggioFinale = punteggio - floor((timerLivello1 + timerLivello2) / 1000);
        punteggioFinaleCalcolato = true;
        console.log("punteggio calcolato");
      }      
      textSize(40);
      text("Score: " + punteggioFinale, width / 2, height / 2);
      disegnaPulsante(width / 2, height * 3 / 4, "Restart", () => {
      gameStarted = false;
      punteggioFinaleCalcolato = false;
    });
  }
}

// Termina il gioco
function fineGioco() {
  gameOver = true;
}

// Controlla se quando il mouse è premuto il player e il cattivo sono in collisione
function mousePressed() {
  if (
    giocatore.x < cattivo1.x + cattivo1.width &&
    giocatore.x + giocatore1.width > cattivo1.x &&
    giocatore.y < cattivo1.y + cattivo1.height &&
    giocatore.y + giocatore1.height > cattivo1.y
  ) {
    cattivo1.vita -= 20;  //il player toglie 20 di vita al cattivo
  }
}

// Funzione per disegnare i pulsanti
// Prende in input la posizione del pulsante (x, y), il nome, quello che deve fare alla sua pressione
function disegnaPulsante(x, y, label, nextState){
  fill(0, 200, 0);
  rectMode(CENTER);
  rect(x, y, 200, 80);

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(label, x, y);

  // Controllo se il mouse è sopra il pulsante
  if (
    mouseX > x - 100 &&
    mouseX < x + 100 &&
    mouseY > y - 40 &&
    mouseY < y + 40 &&
    mouseIsPressed
  ) {
    // Se il gioco è finito e il pulsante "Restart" è premuto, ricarica la pagina
    if (gameOver || vittoria) {
      location.reload();  // Ricarica la pagina web riavviando il gioco
    } else {
      // Vai al prossimo stato
      nextState();
      // Se il pulsante "Resume" è premuto, ferma la musica della lobby e riproduci la musica di sfondo
      if (label === "Resume") {
        musicaLobby.stop();
        musicaLobbyCaricata = false;
        if (sfondo1 === undefined) {
          if(!musicaSfondo2Caricata){
            musicaSfondo2.loop();
            musicaSfondo2Caricata = true;
          }
        } else {
          if(!musicaSfondo1Caricata){
            musicaSfondo1.loop();
            musicaSfondo1Caricata = true;
          }
        }
      }
    }
  }
}