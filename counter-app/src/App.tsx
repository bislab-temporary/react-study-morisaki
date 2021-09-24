import { Container } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

function App() {
  return (
    <Container maxW="xl" centerContent>
      <Button colorScheme="blue" m={5}>
        +1
      </Button>
    </Container>
  );
}

export default App;
