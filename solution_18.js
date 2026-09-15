// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un testo, raggruppi le parole in base al loro numero di lettere.
// Per ogni lunghezza va restituito l'elenco delle parole distinte, cioè
// senza ripetizioni, scartando i gruppi formati da meno di due parole.
// RIS: <lunghezza | parola1, parola2, ...>
// ============================================================

const INPUT = `il gatto dorme sul divano il cane corre nel prato il gatto salta e il cane dorme`;


function jobInputSplit(input_str){
    return input_str.split(" ");
}

function jobMap(V_In_Map){
    return V_In_Map.map((item)=>{
        return keyVal(item.trim().length, item.trim());
    })
}

function jobReduce(V_In_Reduce){

    var results = V_In_Reduce.map((item)=>{
        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        return keyVal(key, Array.from(new Set(values)));
    })

    var results_final = []
    for(const item of results){
        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        if(values.length >= 2)
            results_final.push(keyVal(key, values))


    }

    return results_final;
    
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };