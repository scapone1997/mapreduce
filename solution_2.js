// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato in input un insieme di record del tipo "matricola, corso, voto",
// calcoli la media dei voti per ciascun corso.
// ============================================================

const INPUT = `12345, Analisi, 28
12346, Analisi, 24
12347, Fisica, 30
12345, Fisica, 27
12348, Analisi, 30
12346, Fisica, 25`;

//Come  splittare la riga del dataset.
function jobInputSplit(input_str) {
  return input_str.split("\n");
}

function jobMap(V_In_Map) {
  return V_In_Map.map((item) => {
    parts = item.split(",");
    key = parts[1].trim();
    value = parseInt(parts[2].trim());
    return keyVal(key, value);
  });
}

//Input: Analisi|28,30
function jobReduce(K_In_Reduce_V_In_Reduce) {
  var risultati = K_In_Reduce_V_In_Reduce.map((item) => {
    parts = item.split("|");
    key = parts[0];
    values = parts[1].split(",");

    var Reduce = values.reduce(function (accumulator, item) {
      return parseInt(accumulator) + parseInt(item);
    });

    const media = Reduce / values.length;

    return keyVal(key, media);
  });
  return risultati;
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };
