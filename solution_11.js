// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di transazioni nel formato "cliente, categoria, importo",
// calcoli prima la SPESA TOTALE di ciascun cliente in ciascuna categoria,
// poi determini, PER OGNI CATEGORIA, quale cliente ha speso di più in
// quella categoria (restituendo il nome del cliente e l'importo speso).
// ============================================================

const INPUT = `Mario, Elettronica, 100
Luigi, Elettronica, 50
Mario, Elettronica, 80
Anna, Cibo, 30
Mario, Cibo, 60
Luigi, Cibo, 45
Anna, Elettronica, 200`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){

    return V_In_Map.map((item)=>{
        parts = item.split(",");
        nome = parts[0].trim();
        categoria = parts[1].trim();
        importo = parts[2].trim();

        return keyVal(nome + "-" + categoria, importo);
    })
    
}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var spesaTotaleClientePerCategoria = K_In_Reduce_V_In_Reduce.map((item)=>{
        parts = item.split("|");
        key = parts[0].trim();
        values = parts[1].split(",");

        spesaTotale = values.reduce(function(acc , item){
            return acc + parseInt(item);
        }, 0);

        return keyVal(key, spesaTotale);

    });

    categoriaMax = {};
    spesaTotaleClientePerCategoria.forEach((riga)=>{
        parts = riga.split("|");
        key = parts[0].trim();
        partsKey = key.split("-");

        nome = partsKey[0];
        categoria = partsKey[1];
        value = parseInt(parts[1].split(","));


        if(!categoriaMax[categoria] || value > categoriaMax[categoria].importo){
            categoriaMax[categoria] = {cliente: nome, importo: value};
        }
    })

    var risultatoFinale = [];

    for (var categoria in categoriaMax){
        var dati = categoriaMax[categoria];
        risultatoFinale.push(keyVal(categoria, dati.cliente + " (" + dati.importo + ")"));
    }

    return risultatoFinale;
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };