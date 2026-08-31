// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// data in input una matrice di numeri (una riga per riga di matrice, valori
// separati da virgola), trovi tutte le combinazioni riga-colonna in cui il
// valore è uguale a un valore dato (es. 0).
// ============================================================

const INPUT = `5, 0, 3
0, 8, 0
2, 0, 9`;

const VALORE_CERCATO = 0;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){
    return V_In_Map.map((item, rowIndex)=>{
        parts = item.split(",");

        results = parts.map((valore, colIndex) => {
            key = parseInt(valore);
            value = String(rowIndex + "-" + colIndex );
            return keyVal(key, value);
        })
        return results;

    }).flat();
}


//Input: 
function jobReduce(K_In_Reduce_V_In_Reduce){
    console.log(K_In_Reduce_V_In_Reduce);
    var result = K_In_Reduce_V_In_Reduce.map((item)=>{

        parts = item.split("|");
        key = parts[0];
        values = parts[1].split(",");

        if(parseInt(key) === VALORE_CERCATO)
            return keyVal(key, values);
        return undefined;

    });
    return result.filter(function(x){ return x !== undefined; });

}



module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };



// function jobMap(V_In_Map){
//     return V_In_Map.map((item, rowIndex) => {
//         var parts = item.split(",");
//         return parts.map((valore, colIndex) => {
//             var value = parseInt(valore);
//             if (value === VALORE_CERCATO) {
//                 var key = rowIndex + "-" + colIndex;
//                 return keyVal(key, value);
//             }
//             return undefined;
//         });
//     }).flat().filter(function(x){ return x !== undefined; });
// }

// function jobReduce(K_In_Reduce_V_In_Reduce){
//     // arrivano già solo le celle giuste: non serve altro lavoro
//     return K_In_Reduce_V_In_Reduce;
// }