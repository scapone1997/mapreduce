// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che, 
// dato in input un log di richieste web nel formato "URL, status_code", 
// conti quante volte compare status code 404 per ciascun URL.
// ============================================================

const INPUT = `/home, 200
/login, 404
/home, 200
/api/users, 500
/login, 404
/api/users, 404
/home, 404
/login, 200`;


function jobInputSplit(input_str){
    return input_str.split("\n");
}


function jobMap(V_In_Map){
    
    return V_In_Map.map((item) => {
        const parts = item.split(",");
        const key = parts[0];
        const value = parseInt(parts[1]);
        return keyVal(key, value)
    });
}

//Riceve: home|200,200,404
function jobReduce(K_In_Reduce_V_In_Reduce){

    var result = K_In_Reduce_V_In_Reduce.map((item)=> {
        const parts = item.split("|");
        const key = parts[0];
        const values = parts[1].split(",");

        Reduce = values.reduce(function(accumulator, item) {
            if(parseInt(item) == 404)
                return accumulator + 1;
            else
                return accumulator;
        }, 0);

        return keyVal(key, Reduce);
    });

    return result;
    
}



module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };