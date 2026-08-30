// ============================================================
// TRACCIA 1
// Scrivi il codice JavaScript (sintassi del tool, no pseudocodice)
// che, dato in input un insieme di record del tipo
// "prodotto, categoria, quantità_venduta", calcoli secondo il
// paradigma MapReduce la quantità totale venduta per ciascuna
// categoria, restituendo solo le categorie che hanno venduto
// più di una soglia (es. 50 unità totali).
// ============================================================

const INPUT = `Mela, Frutta, 30
Pane, Panetteria, 20
Pera, Frutta, 25
Latte, Latticini, 40
Croissant, Panetteria, 35
Banana, Frutta, 10`;

//Come  splittare la riga del dataset.
function jobInputSplit(input_str) {
  return input_str.split("\n");
}

function jobMap(V_In_Map) {
  // V_In_Map è l'array prodotto da jobInputSplit: ogni elemento è UNA RIGA
  // di testo grezza, es. "Roma, 28" (stringa unica, città e valore non ancora separati)
  return V_In_Map.map((item) => {
    const parts = item.split(",");
    const prodotto = parts[0].trim();
    const categoria = parts[1].trim();
    const quantita_venduta = parseInt(parts[2].trim());
    const result = keyVal(categoria, quantita_venduta);
    //console.log(result)
    return result;
  });
}

function jobReduce(K_In_Reduce_V_In_Reduce) {
  var risultati = K_In_Reduce_V_In_Reduce.map(function (items) {
    console.log(items);
    var key = items.split(S[0])[0];
    var value = items.split(S[0])[1].split(S[1]);

    var Reduce = value.reduce(function (accumulator, item) {
      return parseFloat(accumulator) + parseInt(item);
    });

    return keyVal(key, Reduce);
  });

  return risultati.filter((riga) => {
    var valore = parseInt(riga.split(S[0])[1]);
    return valore > 50;
  });
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };
