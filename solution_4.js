// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un testo, raggruppi le parole in base alla loro lunghezza (numero di lettere)
// e conti quante parole ci sono per ciascuna lunghezza.
// ============================================================

const INPUT = `gatto cane sole mare pane luna fiore casa rosa`;

function jobInputSplit(input_str){
    return input_str.split(" ");
}


function jobMap(V_In_Map){

    return V_In_Map.map((item)=>{
        key = item.length;
        value = item;
        return keyVal(key, value);
    });

}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((item)=>{

        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");
        
        Reduce = values.reduce(function(accumulator, item){
            return accumulator+1;
        }, 0);

        return keyVal(key, Reduce);
    });

    return results;
    
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };