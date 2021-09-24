import { Center, VStack, Text } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { useControllableState } from "@chakra-ui/hooks";

function App() {
  const [count, setCount] = useControllableState({ defaultValue: 0 });

  const decrementCount = () => {
    setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <Center>
      <VStack m={5} p={5} borderRadius="md">
        <Text fontSize="2xl">{count}</Text>
        <ButtonGroup variant="outline">
          <Button colorScheme="red" onClick={decrementCount}>
            -1
          </Button>
          <Button colorScheme="blue" onClick={incrementCount}>
            +1
          </Button>
        </ButtonGroup>
      </VStack>
    </Center>
  );
}

export default App;
