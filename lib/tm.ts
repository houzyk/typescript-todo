// tm for L = {0n1n2n: n >= 1}
const tm = (symbol: (number | string)[]): boolean => {
  if (!symbol.every(c => (c === 0 || c === 1 || c === 2))) return false;
  if (symbol.length === 0) return false;

  let selectedSymbolIndex: number = 0;
  const blank: string = "$";

  // init input
  symbol.unshift(blank);
  symbol.push(blank);

  const states: string[] = ["Q0", "Q1", "Q2", "Q3", "Q4", "QA"];
  let headState: string = states[0];

  const handleTapeEnd = (index: number): void => {
    if (symbol[index] === undefined) symbol.push(blank);
  }

  function compute(): boolean {
    switch (headState) {
      case "Q0":
        if (symbol[selectedSymbolIndex] === 0) {
          // header write
          symbol[selectedSymbolIndex] = "X";
          // header shift
          selectedSymbolIndex += 1;
          handleTapeEnd(selectedSymbolIndex);
          // state transition
          headState = states[1];
        } else if (symbol[selectedSymbolIndex] === "Y") {
          // header shift
          selectedSymbolIndex += 1;
          handleTapeEnd(selectedSymbolIndex);
          // state transition
          headState = states[4];
        } else {
          return false;
        }
        compute();

      case "Q1":
        if (symbol[selectedSymbolIndex] === 0 || symbol[selectedSymbolIndex] === "Y") {
          // header shift
          selectedSymbolIndex += 1;
          handleTapeEnd(selectedSymbolIndex);
        } else if (symbol[selectedSymbolIndex] === 1) {
          // header write
          symbol[selectedSymbolIndex] = "Y";
          // header shift
          selectedSymbolIndex += 1;
          handleTapeEnd(selectedSymbolIndex);
          // state transition
          headState = states[2];
        } else {
          return false;
        }
        compute();

      case "Q2":
        // todo
        compute();

      case "Q3":
        // todo
        compute();

      case "Q4":
        // todo
        compute();

      case "QA":
        return true;

      default:
        return false;
    }
  }

  return compute();
}

// ! DO NOT REMOVE
module.exports = tm;
// yarn test tm.test.js
