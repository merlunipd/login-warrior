
// la sintassi "e => {}" equivale a scrivere "function(e) {}"

let db = null

function viewNotes(variabile) {
  const request = indexedDB.open("Login-Warrior");
  request.onsuccess = e => {
    const tx = db.transaction("Data", "readonly");
    const pNotes = tx.objectStore("Data");
    const request = pNotes.openCursor();
    request.onsuccess = e => {
      let Extracteddata = null;
      const cursor = e.target.result
      if (cursor) {
        Extracteddata=cursor.value.text;
        alert("Iterazione elementi DB: "+Extracteddata);
        cursor.continue();
      }
      console.log(Extracteddata);
      return Extracteddata;
    }
  }
  request.onerror = e => {
    alert("Errore nell'ertrazioene dei dati");
  }
}

function addNote(variabile) {
  const request = indexedDB.open("Login-Warrior");
  request.onupgradeneeded = e => {
    alert("Aggiornamento avvenuto con successo");
  }
  request.onsuccess = e => {
    const note = {
      title: "Data",
      text: variabile
    }
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
    alert("Errore nell'apertura del DB");
  }
}
