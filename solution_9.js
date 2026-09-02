// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di ore lavorate nel formato "dipendente, ore",
// individui i dipendenti che hanno lavorato complessivamente più di 40
// ore in totale, restituendo per ciascuno il totale ore.
// ============================================================

const INPUT = `A, B
A, C
B, C
C, A
D, C
B, A`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}


function jobMap(V_In_Map){
    return V_In_Map.map((item)=>{
        parts = item.split(",")
        key = parts[1].trim();
        value = parts[0].trim();
        return keyVal(key, value);
    });
}

//Riceve: A|B,C
function jobReduce(K_In_Reduce_V_In_Reduce){

    return K_In_Reduce_V_In_Reduce.map((item)=>{

        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        Reduce = values.reduce(function(accumulator, item){
            return accumulator + 1;
        }, 0);

        return keyVal(key, Reduce);
    });
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };

