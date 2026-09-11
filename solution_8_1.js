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
        dipendente = parts[0].trim();
        ore = parts[1].trim();
        return keyVal(dipendente, ore);
    });
}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((item =>{

        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        var res = values.reduce(function(a, i){
            ore = parseInt(i.trim());
            return a + ore;
        }, 0);

        return keyVal(key, res);

    }));

    results_filtrati = [];
    for(const element of results){
        console.log("element " + element)
        parts = element.split("|");
        key = parts[0];
        value = parseInt(parts[1]);

        if(value > 40)
            results_filtrati.push(keyVal(key, value));

    }
    return results_filtrati;

}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };

