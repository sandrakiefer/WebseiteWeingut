// globale Variablen
const VALID = "form-control is-valid";
const INVALID = "form-control is-invalid";

// Aufgabe 1 - Form Validation
function validate() {
    // Inhalte einlesen und speichern
    let name = document.getElementById("input_name");
    let adresse = document.getElementById("input_adresse");
    let nummer = document.getElementById("input_nummer");
    let email = document.getElementById("input_email");
    let sorte = document.getElementById("input_sorte");
    let menge = document.getElementById("input_menge");
    let agb = document.getElementById("input_agb");
    // regular expressions
    let regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let regExName = /\S+\, \S+/;
    let regExAdresse = /\S+\ \d+\, [0-9][0-9][0-9][0-9][0-9]\ \S+/;
    let regExNummer = /\d+ \d+/;
    // leere Felder markieren
    if (name.value == "" || !regExName.test(name.value)) {
        document.getElementById("input_name").className = INVALID;
    } else {
        document.getElementById("input_name").className = VALID;
    }
    if (adresse.value == "" || !regExAdresse.test(adresse.value)) {
        document.getElementById("input_adresse").className = INVALID;
    } else {
        document.getElementById("input_adresse").className = VALID;
    }
    if (nummer.value == "" || !regExNummer.test(nummer.value)) {
        document.getElementById("input_nummer").className = INVALID;
    }else {
        document.getElementById("input_nummer").className = VALID;
    }
    if (email.value == "" || !regExEmail.test(email.value)) {
        document.getElementById("input_email").className = INVALID;
    } else {
        document.getElementById("input_email").className = VALID;
    }
    if (agb.checked == false) {
        document.getElementById("input_agb_farbe").style.color = "red";
    } else {
        document.getElementById("input_agb_farbe").style.color = "green";
    }
    // schließen wenn alles richtig
    if (document.getElementById("input_name").className == VALID && document.getElementById("input_adresse").className == VALID && document.getElementById("input_nummer").className == VALID && document.getElementById("input_email").className == VALID && document.getElementById("input_agb_farbe").style.color == "green") {
        // Aufgabe 2 Bestellübersicht anzeigen
        localStorage.setItem("name", name.value);
        localStorage.setItem("adresse", adresse.value);
        localStorage.setItem("nummer", nummer.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("sorte", sorte.value);
        localStorage.setItem("menge", menge.value);
        document.location.href = "bestelluebersicht.html";
    }
}