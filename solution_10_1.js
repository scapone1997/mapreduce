// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di misurazioni nel formato "sensore, gruppo, valore",
// calcoli per ciascun gruppo la MEDIA DELLE MEDIE: prima la media dei
// valori di ogni singolo sensore all'interno del gruppo, poi la media
// di quelle medie per ottenere un unico valore rappresentativo del
// gruppo.
// ============================================================

const INPUT = `s1, GruppoA, 10
s1, GruppoA, 20
s2, GruppoA, 100
s3, GruppoB, 5
s3, GruppoB, 15
s4, GruppoB, 8`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){

    return V_In_Map.map((item)=>{
        parts = item.split(",");
        sensore = parts[0].trim();
        gruppo = parts[1].trim();
        valore = parts[2].trim();
        return keyVal(sensore, gruppo + "+" + valore);
    })

}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((i)=>{
        parts = i.split("|");
        sensore = parts[0].trim();
        gruppo_valore_list = parts[1].split(",");

        var somma_per_sensore = gruppo_valore_list.reduce(function(a, i){
            parts = i.split("+");
            gruppo = parts[0].trim();
            valore = parseInt(parts[1].trim());

            return a + valore;

        }, 0);

        return keyVal(sensore, gruppo + "+" + (somma_per_sensore / gruppo_valore_list.length));
    
    });

    var media_gruppo = {};

    for(const sensore of results){
        parts = sensore.split("|");
        gruppo_valore_list = parts[1].split("+");
        gruppo = gruppo_valore_list[0];
        valore = parseFloat(gruppo_valore_list[1]);
        console.log("valore" + valore)

        if(!media_gruppo[gruppo]){
            media_gruppo[gruppo] = {gruppo: gruppo, somma: valore, count: 1}
        }else{
            media_gruppo[gruppo] = {gruppo: gruppo, somma: (media_gruppo[gruppo].somma + valore), count: (media_gruppo[gruppo].count + 1) }
        }
    }

    results_finale = []
    for(const gruppo in media_gruppo){
        console.log(media_gruppo[gruppo].somma  + " + " + media_gruppo[gruppo].count);
        results_finale.push(keyVal(gruppo, media_gruppo[gruppo].somma / media_gruppo[gruppo].count))
    }

    return results_finale;
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };