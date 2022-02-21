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
      reject()
    };
  });
}

async function updateDB(variabile) {
  return new Promise((resolve, reject) => {
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
      resolve();
    }
    request.onerror = e => {
      alert("Errore nell'aggiunta dei dati");
      reject();
    }
  });
}

async function createDB() {
  return new Promise((resolve, reject) => {
    let db = null;
    const request = indexedDB.open("Login-Warrior");
    request.onupgradeneeded = e => {
      db = e.target.result;
      const pNotes = db.createObjectStore("Data", { autoIncrement: true });
      resolve();
    }
    request.onsuccess = e => {
      db = e.target.result;
      resolve();
    }
    request.onerror = e => {
      alert("Errore nell'apertura del DB");
      reject();
    }
  });
}

async function deleteDB() {
  return new Promise((resolve, reject) => {
    indexedDB.deleteDatabase("Login-Warrior");
    resolve();
  });
}

export { createDB, deleteDB, readDB, updateDB };
