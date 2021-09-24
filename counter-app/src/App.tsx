import { Center, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

function App() {
  return (
    <Center>
      <VStack m={5}>
        <Text>0</Text>
        <Button colorScheme="blue">+1</Button>
      </VStack>
    </Center>
  );
}

export default App;
