import { useState } from "react";

import { Center } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import Counter from "./Counter";

function App() {
  const [counterNum, setCounterNum] = useState(1);
  const [counters, setCounters] = useState([
    <Counter name={"Counter " + counterNum} />,
  ]);

  // BUG: couterNum 1, 1, 2, 3, ....
  const addCounter = () => {
    setCounterNum(counterNum + 1);
    const counter = <Counter name={"Counter " + counterNum} />;
    const newCounters = [...counters, counter];
    setCounters(newCounters);
  };

  return (
    <Center>
      {counters.map((counter) => counter)}
      <Button colorScheme="teal" borderRadius="50%" onClick={addCounter}>
        +
      </Button>
    </Center>
  );
}

export default App;
