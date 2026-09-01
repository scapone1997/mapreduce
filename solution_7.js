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

function jobMap(V_In_Map){
    return V_In_Map.map((item)=>{
        parts = item.split(",")
        key = parts[0].trim();
        value = parseInt(parts[1].trim());
        return keyVal(key, value);
    })
}

//INput: Anna|30,90
function jobReduce(K_In_Map_V_In_Reduce){

    var results = K_In_Map_V_In_Reduce.map((item)=>{
        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        var totale =  values.reduce(function(accumulator, item){
            itemInt = parseInt(item.trim());
            return itemInt + accumulator;
        }, 0)

        return keyVal(key, totale)
    })

    return results.filter((riga)=>{
        var valore = parseInt(riga.split(S[0])[1]);   // <-- filtra sulla RIGA (keyVal), non su un numero sciolto
        return valore > 100;
    });
}

module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };

