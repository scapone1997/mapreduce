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

    var results = K_In_Reduce_V_In_Reduce.map((item)=>{
        parts = item.split("|");
        dip_reparto = parts[0];
        ore = parts[1].split(",");

        var totale_ore = ore.reduce(function(a, n){
            numero_ora = parseInt(n.trim())
            return a + numero_ora;
        }, 0);

        return keyVal(dip_reparto, totale_ore)
    })

    mappa = {};
    for(const element of results){
        parts = element.split("|");
        key = parts[0];

        nome_reparto = key.split("-");
        nome = nome_reparto[0];
        reparto = nome_reparto[1];

        value = parseInt(parts[1]);

        if(!mappa[reparto]){
            mappa[reparto] = {dipendente: nome, reparto: reparto, ore: value}
        }else{
            if(value < mappa[reparto].ore){
                mappa[reparto] = {dipendente: nome, reparto: reparto, ore: value}
            }
        }
    }

    final_res = []
    for(const reparto in mappa)
        final_res.push(keyVal(mappa[reparto].dipendente + "-" + mappa[reparto].reparto, mappa[reparto].ore));

    return final_res;

}


module.exports = { INPUT, jobInputSplit, jobMap, jobReduce };