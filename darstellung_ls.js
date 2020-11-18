// Dateien aus local Storage bekommen
let name = localStorage.getItem("name");
let adresse = localStorage.getItem("adresse");
let nummer = localStorage.getItem("nummer");
let email = localStorage.getItem("email");
let sorte = localStorage.getItem("sorte");
let menge = localStorage.getItem("menge");

// Daten entsprechend anzeigen
document.getElementById("output_name").innerHTML = name;
document.getElementById("output_adresse").innerHTML = adresse;
document.getElementById("output_nummer").innerHTML = nummer;
document.getElementById("output_email").innerHTML = email;
document.getElementById("output_sorte").innerHTML = sorte;
document.getElementById("output_menge").innerHTML = menge;

// DOM und XML
let domParser = new DOMParser();
let xmlSerializer = new XMLSerializer();

// Kundendaten speichern
let gesetztSpeichern = false;
function safe() {
    if (gesetztSpeichern == false) {
        let datum = new Date();
        let datumString = datum.toLocaleString();
        let text = `<?xml version="1.0" encoding="UTF-8"?>
        <kunde>
        <name>${name}</name>
        <adresse>${adresse}</adresse>
        <nummer>${nummer}</nummer>
        <email>${email}</email>
        <sorte>${sorte}</sorte>
        <menge>${menge}</menge>
        <datum>${datumString}</datum>
        </kunde>`;
        if (localStorage.getItem("anzahl") == null) {
            localStorage.setItem("anzahl", 1);
        } else {
            let tmp = parseInt(localStorage.getItem("anzahl"));
            tmp = tmp + 1;
            localStorage.setItem("anzahl", tmp);
        }
        let tmp = localStorage.getItem("anzahl");
        localStorage.setItem("kunden"+tmp, text);
        gesetztSpeichern = true;
    }
}

// in Tabelle schreiben und sichtbar machen
let gesetztTabelle = false;
function tabelleSichtbar() {
    if (gesetztTabelle == false) {
        for (let i = 1; i <= localStorage.getItem("anzahl"); i++) {
            let tmp = localStorage.getItem("kunden"+i);
            let xmlDOM = domParser.parseFromString(tmp, 'text/xml');
            let x = xmlDOM.getElementsByTagName("kunde");
            for (let j = 0; j < x.length; j++) {
                let tabelle = document.getElementById("verstecken");
                let reihe = tabelle.insertRow(i);
                reihe.insertCell().innerText = x[j].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                reihe.insertCell().innerText = x[j].getElementsByTagName("adresse")[0].childNodes[0].nodeValue;
                reihe.insertCell().innerText = x[j].getElementsByTagName("nummer")[0].childNodes[0].nodeValue;
                reihe.insertCell().innerText = x[j].getElementsByTagName("email")[0].childNodes[0].nodeValue;
                reihe.insertCell().innerText = x[j].getElementsByTagName("sorte")[0].childNodes[0].nodeValue;
                reihe.insertCell().innerText = x[j].getElementsByTagName("menge")[0].childNodes[0].nodeValue;
                reihe.insertCell().innerText = x[j].getElementsByTagName("datum")[0].childNodes[0].nodeValue;
            }
        }
        document.getElementById("verstecken").style.display = "inline";
        document.getElementById("suchleiste").style.display = "inline";
        document.getElementById("sortierbutton").style.display = "inline";
        gesetztTabelle = true;
    }
}

// Suchleiste nach Namen
function search() {
    let input = document.getElementById("suchleiste");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("verstecken");
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
}

// Sortieren nach Bestelldatum (aufsteigend und absteigen wechselnd)
let tmp = true;
function sort() {
    let rows, i, x, y, shouldSwitch;
    let table = document.getElementById("verstecken");
    let switching = true;
    if (tmp == true) {
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[6];
                y = rows[i + 1].getElementsByTagName("TD")[6];
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            }
        }
        tmp = false;
    } else {
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[6];
                y = rows[i + 1].getElementsByTagName("TD")[6];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            }
        }
        tmp = true;
    }
}