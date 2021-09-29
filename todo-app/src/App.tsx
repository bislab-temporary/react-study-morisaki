import { Input } from "@chakra-ui/input";
import { Container, Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";

const App = () => {
  interface Task {
    text: string;
  }

  const tasks: Task[] = [
    { text: "Task1" },
    { text: "Task2" },
    { text: "Task3" },
    {
      text: "LongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongText",
    },
  ];

  return (
    <Container maxW="xl" centerContent>
      {tasks.map((task: Task) => (
        <Center p={3} m={1} w="100%" bg="blue.100">
          <Text isTruncated>{task.text}</Text>
        </Center>
      ))}
      <Input p={3} m={1} borderRadius="0" placeholder="Input new task" />
    </Container>
  );
};

export default App;
