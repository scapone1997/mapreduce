// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato l'elenco delle vendite mensili di un negozio nel formato
// "mese, articolo, copie vendute", calcoli per ciascun articolo la
// media delle copie vendute sui mesi disponibili e restituisca, in
// un'unica struttura dati, il solo articolo con la media più alta.
// RIS: <articolo | media>
// ============================================================

const INPUT = `Gennaio, Tastiera, 30
Gennaio, Mouse, 45
Gennaio, Monitor, 12
Febbraio, Tastiera, 22
Febbraio, Mouse, 51
Febbraio, Monitor, 18
Marzo, Tastiera, 35
Marzo, Mouse, 40
Marzo, Monitor, 27
Aprile, Tastiera, 29
Aprile, Mouse, 44
Aprile, Monitor, 15`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){
    return V_In_Map.map((i)=>{
        parts = i.split(",");
        mese = parts[0].trim();
        articolo = parts[1].trim();
        copie_vendute = parts[2].trim();
        return keyVal(articolo, copie_vendute);
    })
}

function jobReduce(K_in_Reduce_V_In_Reduce){
    var results = K_in_Reduce_V_In_Reduce.map((i)=>{

        parts = i.split("|");
        key = parts[0];
        values = parts[1].split(",");

        var somma_articolo = values.reduce(function(a, i){
            value = parseInt(i);
            return a + value;
        }, 0)

        var media_articolo = somma_articolo / values.length;

        return keyVal(key, media_articolo);

    })

    max_vendita = 0;
    key_max = null;

    for(const item of results){
        parts = item.split("|");
        key = parts[0];
        value = parseInt(parts[1]);

        if(value > max_vendita){
            max_vendita = value;
            key_max = key;
        }
    }

    return [keyVal(key_max, max_vendita)];
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };