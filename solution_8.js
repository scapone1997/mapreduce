// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di ore lavorate nel formato "dipendente, ore",
// individui i dipendenti che hanno lavorato complessivamente più di 40
// ore in totale, restituendo per ciascuno il totale ore.
// ============================================================

const INPUT = `Rossi, 15
Bianchi, 20
Rossi, 30
Verdi, 10
Bianchi, 25
Verdi, 12`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}


function jobMap(V_In_Map){
    return V_In_Map.map((item)=>{
        parts = item.split(",");
        key = parts[0];
        value = parseInt(parts[1].trim());
        return keyVal(key, value);
    });


}

//Riceve: Rossi|25,30
function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((item)=>{

        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        Reduce = values.reduce(function(accumulator, item){
            return parseInt(item) + accumulator
        }, 0);

        return keyVal(key, Reduce);

    });

    var resultsFiltered = results.filter((item)=>{
        parts = item.split("|");
        return parseInt(parts[1]) > 40
    })

    return resultsFiltered;
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };

