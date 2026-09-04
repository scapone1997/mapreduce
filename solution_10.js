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
        parts = item.split(",")
        sensor = parts[0].trim();
        groupSensor = parts[1].trim();
        value = parts[2].trim();

        return keyVal(sensor + "-" + groupSensor, value);
    })
}

function jobReduce(K_In_Reduce_V_In_Reduce){
    var mediaPerSensore = K_In_Reduce_V_In_Reduce.map((item)=>{
        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        var somma = values.reduce(function(accumulator, item){
            return accumulator + parseInt(item.trim())
        }, 0)

        var media = somma / values.length;

        return keyVal(key, media);

    });

    var gruppi = {};

    mediaPerSensore.forEach(function(riga){
        parts = riga.split("|");
        var sensoreGruppo = parts[0].split("-");
        var nomeGruppo = sensoreGruppo[1];
        var mediaSensore = parseFloat(parts[1]);

        if(!gruppi[nomeGruppo]){
            gruppi[nomeGruppo]= [];
        }
        gruppi[nomeGruppo].push(mediaSensore);

    });

    var risultatoFinale = [];
    for(var nomeGruppo in gruppi){
        var listaMedie = gruppi[nomeGruppo];
        var sommaMedia = listaMedie.reduce(function(acc, m){
            return acc + m;
        }, 0);
        var mediaDelleMedie = sommaMedia / listaMedie.length;
        risultatoFinale.push(keyVal(nomeGruppo, mediaDelleMedie));
    }
    return risultatoFinale;
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };