import { Center, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useControllableState } from "@chakra-ui/hooks";

function App() {
  const [count, setCount] = useControllableState({ defaultValue: 0 });

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <Center>
      <VStack m={5} p={5} bg={"blue.100"} borderRadius="md">
        <Text>{count}</Text>
        <Button colorScheme="blue" onClick={incrementCount}>
          +1
        </Button>
      </VStack>
    </Center>
  );
}

export default App;
