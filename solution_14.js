// ============================================================
// TRACCIA 7
// Scrivi il codice JavaScript (sintassi del tool, no pseudocodice)
// che, dato in input un elenco di transazioni bancarie nel formato
// "conto, tipo, importo" (dove tipo è "deposito" oppure "prelievo"),
// calcoli secondo il paradigma MapReduce il SALDO NETTO per ciascun
// conto (somma dei depositi meno somma dei prelievi), restituendo
// solo i conti il cui saldo netto è POSITIVO.
//
// ============================================================

const INPUT = `C001, deposito, 100
C002, deposito, 50
C001, prelievo, 30
C003, deposito, 200
C002, prelievo, 70
C001, deposito, 70
C003, prelievo, 250
C002, deposito, 10`;


function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){
    return V_In_Map.map((i)=>{
        parts = i.split(",");
        conto = parts[0].trim();
        tipo = parts[1].trim();
        importo = parts[2].trim();
        return keyVal(conto, tipo + "-" + importo);
    })

}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((i)=>{
        console.log(i);
        parts = i.split("|");
        value_parts = parts[1].split(",");

        conto = parts[0].trim();
        
        var totale = value_parts.reduce(function(a, i){
            parts = i.split("-");
            tipo = parts[0];
            importo = parseFloat(parts[1]);

            console.log(tipo + "+" + importo);

            if(tipo == "deposito")
                return a + importo
            else return a - importo
        }, 0);
        return keyVal(conto, totale);

    });

    resultsFiltered = [];

    results.forEach((i)=>{
        parts = i.split("|");
        conto = parts[0];
        totale = parseFloat(parts[1]);

        if (totale >= 0)
            resultsFiltered.push(keyVal(conto, totale));
    })

    return resultsFiltered;
}




module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };