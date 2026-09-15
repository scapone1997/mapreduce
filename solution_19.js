// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// data una matrice di correlazione tra sensori, individui tutte le
// combinazioni riga-colonna il cui valore è maggiore o uguale a 0.7,
// escludendo la diagonale principale. Per ogni sensore di riga va
// restituito l'elenco dei sensori di colonna correlati.
// Ogni riga dell'input ha il formato "etichetta, v1, v2, ... vn" e le
// colonne sono nell'ordine S1, S2, S3, S4.
// RIS: <sensore | sensore1, sensore2, ...>
// ============================================================

const INPUT = `S1, 1.00, 0.85, 0.20, 0.45
S2, 0.85, 1.00, 0.72, 0.10
S3, 0.20, 0.72, 1.00, 0.65
S4, 0.45, 0.10, 0.65, 1.00`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){
    return V_In_Map.map((item)=>{
        parts = item.split(",");

        sensor_key = parts[0].trim();

        valore_uno = parts[1].trim();
        valore_due = parts[2].trim();
        valore_tre = parts[3].trim();
        valore_quattro = parts[4].trim();

        return keyVal(sensor_key, valore_uno + "-" + valore_due + "-" + valore_tre + "-" + valore_quattro);



    });
}

function jobReduce(K_in_Reduce_V_In_Reduce){
    var results_final = [];

    for(const item of K_in_Reduce_V_In_Reduce){
        var parts = item.split("|");
        var sensor_key = parts[0];
        var values = parts[1].split("-");
        var correlati = [];

        for(var i = 0; i < values.length; i++){
            var colonna = "S" + (i+1);
            if(sensor_key !== colonna && parseFloat(values[i]) >= 0.7){
                correlati.push(colonna);
            }
        }

        if(correlati.length > 0){
            results_final.push(keyVal(sensor_key, correlati.join(", ")));
        }
    }

    return results_final;
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };