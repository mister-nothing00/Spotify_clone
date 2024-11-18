# Spotify Clone 🎶

Questo progetto è un clone di Spotify che permette agli utenti di ascoltare musica, gestire playlist e, se si è amministratori, di aggiungere o rimuovere canzoni e playlist. Il design è semplice e completamente responsive!

## Funzionalità

- Autenticazione con JWT per l’accesso sicuro
- Creazione, modifica e cancellazione di playlist
- Aggiunta e rimozione di canzoni alle playlist
- Caricamento e gestione dei file musicali tramite Cloudinary
- Funzionalità amministrative per la gestione dei contenuti

## Requisiti di Sistema

- [Node.js](https://nodejs.org/) (v14 o superiore)
- [MongoDB](https://www.mongodb.com/) (locale o su un servizio di hosting come MongoDB Atlas)
- [Cloudinary](https://cloudinary.com/) per la gestione dei file multimediali

## Struttura del Progetto

La struttura del progetto è organizzata come segue:

- **client/**: contiene il frontend sviluppato in React con Vite
- **server/**: contiene il backend sviluppato in Node.js con Express e MongoDB
- **package.json e package-lock.json**: file di configurazione globale per gestire le dipendenze e le variabili d'ambiente

## Configurazione

### 1. Clona il repository

   ```bash
   git clone <url-del-tuo-repository>
   cd <nome-cartella-del-tuo-progetto>
```

# Configurazione MongoDB
MONGO_URL=mongodb://localhost:27017

# Configurazione Cloudinary
CLOUD_NAME=<nome-del-tuo-cloud>
CLOUD_API=<chiave-api-cloudinary>
CLOUD_SECRET=<segredo-cloudinary>

# Configurazione JWT
JWT_SECRET=<inserisci-una-password-segreta>

# Configurazione della Porta
PORT=5000

##
```bash
MONGODB_URL: URL per connettersi al database MongoDB. Puoi usare quello di default mongodb://localhost:27017/spotify-clone.

JWT_SECRET: una chiave segreta per generare il token di accesso. Scegli una stringa complessa e sicura.

CLOUD_NAME, CLOUD_API, e CLOUD_SECRET: registrati su Cloudinary, crea un cloud, e inserisci i valori appropriati. 

Per ottenere il CLOUD_SECRET, dovrai confermare l'email e riceverai un codice di autenticazione.
```

# Installazione delle Dipendenze

Vai nella directory principale del progetto e installa le dipendenze comuni:

```bash
Copia codice
npm install
```
Successivamente

# Backend
cd server
npm install

# Frontend
cd ../client
npm install

# Avvio del Progetto

Avviare il Backend
Nella directory principale, usa il seguente comando per avviare il backend in modalità di sviluppo:

```bash

npm run dev
```

# Avviare il Frontend
Nella directory client, usa il seguente comando per avviare il frontend:

```bash
Copia codice
npm run dev
```


# Tecnologie Utilizzate
 -Frontend: React, Vite
-Backend: Node.js, Express
-Database: MongoDB
-Storage: Cloudinary per il caricamento e la gestione dei file
<<<<<<< HEAD
-Autenticazione: JWT (JSON Web Tokens)
=======
-Autenticazione: JWT (JSON Web Tokens)
>>>>>>> 602d911755873658465c4dacef1e55be94e0df6a
