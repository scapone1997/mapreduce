// Esercizio 1
const nome = "simone";
const annoNascita = 1997;
const studiaJavaScript = true;

console.log(nome, annoNascita, studiaJavaScript);

// Esercizio 2
const colori = ["giallo", "verde", "rosso"];

console.log(colori[1]);
console.log(colori.length);
colori.push("celeste");

console.log(colori);

// Esercizio 3
const animali = ["bue", "gatto", "cane"];

for (let i = 0; i < animali.length; i++) {
  console.log(animali[i]);
}

//Esercizio 4
const testo = "  mela pera banana  ";

const pulito = testo.trim();
console.log(pulito);

const parole = pulito.split(" ");
console.log(parole.indexOf("pera"));
console.log(pulito.slice(0, 4));

const unione = parole.join("-");
console.log(unione);

//Esercizio 5
const numero1 = "25";
const numero2 = "10.5";
const valore = 100;

const numero1_Int = parseInt(numero1);
console.log(numero1_Int);

const numero2_Float = parseFloat(numero2);
console.log(numero2_Float);

const valore_String = String(valore);

console.log(valore_String);

//Esercizio 6
function moltiplica(a, b){
    return a * b;
}

const totale = moltiplica(4, 5);
console.log(totale);


//Esercizio 7
const numeri = [2, 4, 6];

const numeriX3 = numeri.map(function(n){
    return n*3;
});
console.log(numeriX3);


//Esercizio 8
const numeri2 = [3, 8, 12, 5, 20];

const only10 = numeri2.filter(function(n){
    return n > 10;
});
console.log(only10);


//Esercizio 9
const numeri3 = [5, 10, 15];

const somma = numeri3.reduce(function(a, i) {
    return a + i;
}, 0);
console.log(somma)


//Esercizio 10
const libro = {
    titolo: "Cime tempestose",
    autore: "Persona X",
    anno: 1997
}
console.log(libro.titolo)
console.log(libro["autore"])


//Esercizio 11
const utente = {
    nome4: "Luca",
    eta: 30
};
const numeri4 = [10, 20];

const {nome4, eta} = utente;
console.log(nome4, eta);

const[primo, secondo] = numeri4
console.log(primo, secondo);