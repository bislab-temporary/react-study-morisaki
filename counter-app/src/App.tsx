import { useState } from "react";

import { Wrap } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import Counter from "./Counter";

let globalCounter = 0;

function App() {
  const [counters, setCounters] = useState<number[]>([globalCounter]);

  const addCounter = () => {
    globalCounter++;
    const newCounters = [...counters, globalCounter];
    setCounters(newCounters);
  };

  const removeCounter = (id: number) => {
    const newCounters = counters.filter((counter) => counter !== id);
    setCounters(newCounters);
  };

  return (
    <Wrap align="center" justify="center">
      {counters.map((counter) => (
        <Counter key={counter} id={counter} removeCounter={removeCounter} />
      ))}
      <Button colorScheme="teal" borderRadius="50%" onClick={addCounter}>
        +
      </Button>
    </Wrap>
  );
}

export default App;
