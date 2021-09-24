import { useState } from "react";

import { Wrap } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import Counter from "./Counter";

function App() {
  const [counterNum, setCounterNum] = useState(1);
  const [counters, setCounters] = useState([
    { id: counterNum, name: "Counter " + counterNum },
  ]);

  // BUG: couterNum 1, 1, 2, 3, ....
  const addCounter = () => {
    setCounterNum(counterNum + 1);
    const counter = { id: counterNum, name: "Counter " + counterNum };
    const newCounters = [...counters, counter];
    setCounters(newCounters);
  };

  const removeCounter = (id: number) => {
    const newCounters = counters.filter((counter) => counter.id != id);
    setCounters(newCounters);
  };

  return (
    <Wrap align="center" justify="center">
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          id={counter.id}
          name={counter.name}
          removeCounter={removeCounter}
        />
      ))}
      <Button colorScheme="teal" borderRadius="50%" onClick={addCounter}>
        +
      </Button>
    </Wrap>
  );
}

export default App;
