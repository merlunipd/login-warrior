
// la sintassi "e => {}" equivale a scrivere "function(e) {}"

let db = null

let Extracteddata=null;

const note = {
  title: "Data",
  text: variabile
}



function viewNotes() {
  const request = indexedDB.open("Login-Warrior");

  request.onsuccess = e => {
    const tx = db.transaction("Data", "readonly");
    const pNotes = tx.objectStore("Data");
    const request = pNotes.openCursor();
    request.onsuccess = e => {
      const cursor = e.target.result
      if (cursor) {
        alert(`Title: ${cursor.key} Text: ${cursor.value.text} `);
        Extracteddata=cursor.value.text;
        cursor.continue();
      }
      console.log(Extracteddata);
    }
  }

  request.onerror = e => {
    alert("Errore nell'ertrazioene dei dati");
  }


}

function addNote() {
  const request = indexedDB.open("Login-Warrior");

  request.onupgradeneeded = e => {
    alert("Aggiornamento avvenuto con successo");
  }

  request.onsuccess = e => {
    db = e.target.result;
    const tx = db.transaction("Data", "readwrite");
    const pNotes = tx.objectStore("Data");
    pNotes.add(note);
    alert("Dati aggiunti con successo");
  }

  request.onerror = e => {
    alert("Errore nell'aggiunta dei dati");
  }
}

function createDB() {

  const request = indexedDB.open("Login-Warrior");

  request.onupgradeneeded = e => {
    db = e.target.result;
    const pNotes = db.createObjectStore("Data",{autoIncrement: true});
    alert("DB aggiornato");
  }
  request.onsuccess = e => {
    db = e.target.result;
    alert("DB creato");
  }
  request.onerror = e => {
    alert(`Errore nell'apertura del DB`);
  }
}
