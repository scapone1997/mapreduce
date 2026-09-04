// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di relazioni "follower, seguito" su un social network
// (ogni riga indica che "follower" segue l'utente "seguito"), conti per
// ciascun utente QUANTI FOLLOWER ha, e determini l'unico utente con
// più follower in assoluto su tutta la rete (non per categoria: un
// solo vincitore globale). Restituisci il nome dell'utente vincitore
// e il suo numero di follower.
// ============================================================

const INPUT = `Anna, Marco
Luigi, Marco
Anna, Sara
Bruno, Marco
Luigi, Sara
Bruno, Sara
Anna, Bruno,
Vanessa, Sara`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){

    return V_In_Map.map((item)=>{
        parts = item.split(",");
        follower = parts[0].trim();
        seguito = parts[1].trim();
        return keyVal(seguito, follower);
    })
    
}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((item)=>{
        parts = item.split("|");
        seguito = parts[0];
        followers_list = parts[1].split(",");

        quantiFollowers = followers_list.reduce(function(a, i){
            return a + 1;
        }, 0);

        return keyVal(seguito, quantiFollowers);

    })

    //return results;
    vincitore = null;
    follower_vincitore = null;

    console.log(results);

    for(var element of results){
        parts = element.split("|");
        key = parts[0];
        value = parseInt(parts[1]);

        if(vincitore !== null || value >  follower_vincitore){
            vincitore = key;
            follower_vincitore = value;
            console.log(vincitore);
        }
    }

    resultFinale = []
    resultFinale.push(keyVal(vincitore, follower_vincitore))

    return resultFinale;

    
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };