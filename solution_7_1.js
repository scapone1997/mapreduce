// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di acquisti nel formato "cliente, importo", individui
// i clienti che hanno speso complessivamente più di 100 in totale,
// restituendo per ciascuno la spesa totale.
// ============================================================

const INPUT = `Mario, 40
Luigi, 120
Mario, 70
Cristina, 25
Anna, 30
Luigi, 15
Anna, 90`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Reduce){

    return V_In_Reduce.map((i)=>{
        parts = i.split(",");
        nome = parts[0].trim();
        importo = parts[1].trim();
        return keyVal(nome, importo);
    })
}

function jobReduce(K_in_Reduce_V_In_Reduce){

    var results = K_in_Reduce_V_In_Reduce.map((i)=>{
        parts = i.split("|");
        key = parts[0];
        values = parts[1].split(",");

        var totale = values.reduce(function(a, i){
            value = parseInt(i);
            return a + value;
        }, 0);

        return keyVal(key, totale);

    })

    results_filtered = []
    for(const item of results){
        console.log(item)
        parts = item.split("|");
        key = parts[0];
        value = parseInt(parts[1]);
        if(value > 100){
            results_filtered.push(keyVal(key, value))
        }
    }

    return results_filtered;


}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };

