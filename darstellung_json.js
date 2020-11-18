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

// Kundendaten speichern
let gesetztSpeichern = false;
function safe() {
    if (gesetztSpeichern == false) {
        console.log('in put data --- ist dieser Error richtig und gewollt?');
        let datum = new Date();
        let datumString = datum.toLocaleString();
        fetch ('./kundendaten.json' , {
            method: 'post',
            mode: 'cors',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                "kunde": [
                    {
                        "name": name,
                        "adresse": adresse,
                        "nummer": nummer,
                        "email": email,
                        "sorte": sorte,
                        "menge": menge,
                        "datum": datum
                    }
                ]
            }
        })
        gesetztSpeichern = true;
    }
}

// in Tabelle schreiben und sichtbar machen
let gesetztTabelle = false;
function tabelleSichtbar() {
    if (gesetztTabelle == false) {
        fetch('kundendaten.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                let kundendaten = result.kunde;
                let tabelle = document.getElementById("verstecken");
                for (let i = 0; i < kundendaten.length; i++) {
                    let kunde = kundendaten[i];
                    let row = createRow(
                        kunde.name,
                        kunde.adresse,
                        kunde.nummer,
                        kunde.email,
                        kunde.sorte,
                        kunde.menge,
                        kunde.datum
                    );
                    tabelle.tBodies[0].appendChild(row);
                }
                document.getElementById("verstecken").style.display = "inline";
                document.getElementById("suchleiste").style.display = "inline";
                document.getElementById("sortierbutton").style.display = "inline";
                gesetztTabelle = true;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

// Tabellenspalte erzeugen 
function createRow(name, adresse, nummer, email, sorte, menge, datum) {
    let row = document.createElement('tr');
    let colName = document.createElement('td');
    let colAdresse = document.createElement('td');
    let colNummer = document.createElement('td');
    let colEmail = document.createElement('td');
    let colSorte = document.createElement('td');
    let colMenge = document.createElement('td');
    let colDatum = document.createElement('td');
    colName.appendChild(document.createTextNode(name));
    colAdresse.appendChild(document.createTextNode(adresse));
    colNummer.appendChild(document.createTextNode(nummer));
    colEmail.appendChild(document.createTextNode(email));
    colSorte.appendChild(document.createTextNode(sorte));
    colMenge.appendChild(document.createTextNode(menge));
    colDatum.appendChild(document.createTextNode(datum));
    row.appendChild(colName);
    row.appendChild(colAdresse);
    row.appendChild(colNummer);
    row.appendChild(colEmail);
    row.appendChild(colSorte);
    row.appendChild(colMenge);
    row.appendChild(colDatum);
    return row;
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