// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di temperature registrate in diverse città, conti quante
// misurazioni superano i 30 gradi per ciascuna città.
// ============================================================

const INPUT = `Roma, 32
Milano, 28
Roma, 35
Napoli, 31
Milano, 25
Roma, 29
Napoli, 33
Milano, 30`;


function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){
    return V_In_Map.map((item) => {
        parts = item.split(",");
        key = parts[0];
        value = parseInt(parts[1]);
        return keyVal(key, value);
    });
}

function jobReduce(K_In_Reduce_V_In_Reduce){
    var results = K_In_Reduce_V_In_Reduce.map((item)=>{
        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        Reduce = values.reduce(function(accumulator, item){
            if (parseInt(item) > 30)
                return accumulator = accumulator + 1;
            
            else
                return accumulator
        }, 0);

        return keyVal(key, Reduce);

    });
    return results;

}



module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };