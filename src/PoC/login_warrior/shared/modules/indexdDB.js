async function readDB() {
  return new Promise((resolve, reject) => {
    let db = null;
    const request = indexedDB.open("Login-Warrior");
    request.onsuccess = e => {
      db = e.target.result;
      try {
        const tx = db.transaction("Data", "readonly");
        const pNotes = tx.objectStore("Data");
        const request = pNotes.openCursor();
        request.onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            resolve(cursor.value.text);
          }
        };
      } catch (error) {
        resolve(null);
      }
    };
    request.onerror = e => {
      alert("Errore nell'estrazione dei dati");
    };
  });
}

function updateDB(variabile) {
  let db = null;
  const request = indexedDB.open("Login-Warrior");
  request.onupgradeneeded = e => { }
  request.onsuccess = e => {
    const note = {
      title: "Data",
      text: variabile
    }
    db = e.target.result;
    const tx = db.transaction("Data", "readwrite");
    const pNotes = tx.objectStore("Data");
    pNotes.add(note);
  }
  request.onerror = e => {
    alert("Errore nell'aggiunta dei dati");
  }
}

function createDB() {
  let db = null;
  const request = indexedDB.open("Login-Warrior");
  request.onupgradeneeded = e => {
    db = e.target.result;
    const pNotes = db.createObjectStore("Data", { autoIncrement: true });
  }
  request.onsuccess = e => {
    db = e.target.result;
  }
  request.onerror = e => {
    alert("Errore nell'apertura del DB");
  }
}

function deleteDB() {
  indexedDB.deleteDatabase("Login-Warrior");
}

export { createDB, deleteDB, readDB, updateDB };
