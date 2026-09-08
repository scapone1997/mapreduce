// ============================================================

// TRACCIA 8
// Scrivi il codice JavaScript (sintassi del tool, no pseudocodice)
// che, dato in input un elenco di prezzi rilevati per diversi
// prodotti in vari negozi, nel formato "prodotto, negozio, prezzo",
// trovi secondo il paradigma MapReduce il PREZZO MINIMO per
// ciascun prodotto (cioè il negozio più conveniente), restituendo
// solo i prodotti il cui prezzo minimo è INFERIORE a una soglia
// data (es. 50).

// ============================================================
const INPUT = `Cuffie, NegozioA, 45
Mouse, NegozioA, 15
Cuffie, NegozioB, 39
Tastiera, NegozioA, 60
Mouse, NegozioB, 12
Tastiera, NegozioB, 55
Cuffie, NegozioC, 52
Mouse, NegozioC, 18`;


function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){
    return V_In_Map.map((i)=>{
        parts = i.split(",");
        prodotto = parts[0].trim();
        negozio = parts[1].trim();
        prezzo = parts[2].trim();
        return keyVal(prodotto, negozio + "-" + prezzo);

    });


}

function jobReduce(K_In_Reduce_V_In_Reduce) {
  const SOGLIA = 50;
  var risultati = [];
 
  K_In_Reduce_V_In_Reduce.forEach((i) => {
    var parts = i.split("|");
    var prodotto = parts[0].trim();
    var values = parts[1].split(",");
 
    var minimo = null;
 
    values.forEach((element) => {
      var p = element.split("-");
      var negozio = p[0].trim();
      var prezzo = parseInt(p[1].trim());
 
      if (!minimo || prezzo < minimo.prezzo) {
        minimo = { negozio: negozio, prezzo: prezzo };
      }
    });
 
    if (minimo.prezzo < SOGLIA) {
      risultati.push(keyVal(prodotto, minimo.prezzo));
    }
  });
 
  return risultati;
}



module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };