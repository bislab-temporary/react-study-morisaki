import { Center, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

function App() {
  return (
    <Center>
      <VStack m={5} p={5} bg={"blue.100"} borderRadius="md">
        <Text>0</Text>
        <Button colorScheme="blue">+1</Button>
      </VStack>
    </Center>
  );
}

export default App;
