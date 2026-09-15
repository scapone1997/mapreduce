// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato l'elenco delle rilevazioni di più droni nel formato
// "drone, area misurata", calcoli per ciascun drone la superficie media
// rilevata e restituisca, oltre alle medie dei singoli droni, anche la
// media complessiva di tutte le medie, sotto la chiave "MEDIA_GLOBALE".
// RIS: <drone | media> e <MEDIA_GLOBALE | valore>
// ============================================================

const INPUT = `D1, 120
D2, 80
D1, 140
D3, 200
D2, 100
D1, 160
D3, 220
D2, 120`;

function jobInputSplit(input_str){
    return input_str.split("\n")
}

function jobMap(V_In_Map){
    return V_In_Map.map((item)=>{
        parts = item.split(",");

        drone = parts[0].trim();
        valore = parts[1].trim();

        return keyVal(drone, valore);
    })
}

function jobReduce(K_in_Reduce_V_In_Reduce){
    var results = K_in_Reduce_V_In_Reduce.map((item)=>{

        parts = item.split("|");

        key = parts[0].trim();
        values = parts[1].split(",");

        Reduce = values.reduce(function(a, item){
            return a + parseInt(item);
        }, 0);

        media = Reduce / values.length;

        return keyVal(key, media);

    });

    media_somma_globale = 0;
    count = 0;

    for(const element of results){
        media_somma_globale = media_somma_globale + parseInt(element.split("|")[1]);
        count = count + 1;
    }

    media_globale = media_somma_globale / count;


    results.push(keyVal("MEDIA_GLOBALE", media_globale))


    return results;
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };