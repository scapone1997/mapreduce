// run.js
// Harness che esegue solution.js. Non serve modificarlo.

global.S = ["|", ","];
global.keyVal = function keyVal(k, v) {
  const value = Array.isArray(v) ? v.join(global.S[1]) : v;
  return `${k}${global.S[0]}${value}`;
};

const fileName = process.argv[2] || "solution.js";
const { INPUT, jobInputSplit, jobMap, jobReduce } = require("./" + fileName);

function assertArray(value, phaseName) {
  if (!Array.isArray(value)) {
    throw new Error(
      `la funzione della fase ${phaseName} deve restituire un array, ricevuto: ${JSON.stringify(value)}`
    );
  }
}

function splitKV(item) {
  const sepIdx = item.indexOf(S[0]);
  if (sepIdx === -1) {
    return { key: item, valuesStr: "" };
  }
  return { key: item.slice(0, sepIdx), valuesStr: item.slice(sepIdx + 1) };
}

function printSimplePhase(title, arr) {
  console.log(`\n=== ${title} ===`);
  arr.forEach((item, idx) => console.log(`${idx + 1}. ${item}`));
}

function printKVPhase(title, arr) {
  console.log(`\n=== ${title} ===`);
  arr.forEach((item, idx) => {
    const { key, valuesStr } = splitKV(item);
    const values = valuesStr.split(S[1]).join(", ");
    console.log(`${idx + 1}. ${key} -> ${values}`);
  });
}

function main() {
  console.log(`INPUT: "${INPUT}"`);

  // --- SPLIT ---
  let arraySplit;
  try {
    arraySplit = jobInputSplit(INPUT);
    assertArray(arraySplit, "SPLIT (jobInputSplit)");
  } catch (err) {
    console.error(`\n[ERRORE - SPLIT] ${err.message}`);
    return;
  }
  printSimplePhase("SPLIT", arraySplit);

  // --- MAP ---
  let arrayMap;
  try {
    arrayMap = jobMap(arraySplit);
    assertArray(arrayMap, "MAP (jobMap)");
    arrayMap = arrayMap.filter((v) => v !== undefined && v !== null);
  } catch (err) {
    console.error(`\n[ERRORE - MAP] ${err.message}`);
    return;
  }
  printKVPhase("MAP", arrayMap);

  // --- SHUFFLE ---
  let arrayShuffle;
  try {
    arrayShuffle = [...arrayMap].sort((a, b) => {
      const keyA = splitKV(a).key;
      const keyB = splitKV(b).key;
      return keyA.localeCompare(keyB);
    });
  } catch (err) {
    console.error(`\n[ERRORE - SHUFFLE] ${err.message}`);
    return;
  }
  printKVPhase("SHUFFLE", arrayShuffle);

  // --- MERGE ---
  let arrayMerge;
  try {
    const groups = new Map();
    arrayShuffle.forEach((item) => {
      const { key, valuesStr } = splitKV(item);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(...valuesStr.split(S[1]));
    });
    arrayMerge = Array.from(groups.entries()).map(
      ([key, values]) => `${key}${S[0]}${values.join(S[1])}`
    );
  } catch (err) {
    console.error(`\n[ERRORE - MERGE] ${err.message}`);
    return;
  }
  printKVPhase("MERGE", arrayMerge);

  // --- REDUCE ---
  let result;
  try {
    result = jobReduce(arrayMerge);
    assertArray(result, "REDUCE (jobReduce)");
  } catch (err) {
    console.error(`\n[ERRORE - REDUCE] ${err.message}`);
    return;
  }
  printKVPhase("REDUCE", result);
}

main();
