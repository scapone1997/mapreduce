// ============================================================
// Scrivi il codice MapReduce (sintassi del tool, no pseudocodice) che,
// dato un elenco di turni di lavoro nel formato "dipendente, reparto, ore",
// calcoli prima il TOTALE ORE lavorate da ciascun dipendente in ciascun
// reparto, poi determini, PER OGNI REPARTO, quale dipendente ha lavorato
// MENO ore in quel reparto (restituendo il nome del dipendente e le ore).
// In caso di parità, vince il nome alfabeticamente precedente.
// ============================================================

const INPUT = `Rossi, Vendite, 10
Bianchi, Vendite, 25
Rossi, Vendite, 5
Verdi, Magazzino, 40
Bianchi, Magazzino, 20
Neri, Magazzino, 20`;

function jobInputSplit(input_str){
    return input_str.split("\n");
}

function jobMap(V_In_Map){

    return V_In_Map.map((item)=>{
        parts = item.split(",");
        nome = parts[0].trim();
        reparto = parts[1].trim();
        ore = parts[2].trim();

        return keyVal(nome + "-" + reparto, ore);
    })
    
}

function jobReduce(K_In_Reduce_V_In_Reduce){

    var results = K_In_Reduce_V_In_Reduce.map((item) => {
        parts = item.split("|");
        nome_reparto = parts[0].trim();
        ore = parts[1].split(",");

        orePerNomeReparto = ore.reduce(function(acc, item){
            return acc + parseInt(item);
        }, 0)

        return keyVal(nome_reparto, orePerNomeReparto);
    })


    //return results;

    reparti = {}

    results.forEach(element => {
        parts = element.split("|");
        nome_reparto = parts[0].split("-");
        nome = nome_reparto[0];
        reparto = nome_reparto[1];
        ore = parseInt(parts[1]);

        if (!reparti[reparto] || ore < reparti[reparto].orePersona ||
        (ore === reparti[reparto].orePersona && nome.localeCompare(reparti[reparto].nomePersona) < 0)) {
            reparti[reparto] = {nomePersona: nome, orePersona: ore};
        }
    });

    var risultatoFinale = []

    for(var reparto in reparti){
        var dati = reparti[reparto];
        risultatoFinale.push(keyVal(reparto, dati.nomePersona + " " + dati.orePersona))
    }

    return risultatoFinale;
}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };