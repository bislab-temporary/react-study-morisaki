import { CheckIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Container, Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";
import { useRef, useState } from "react";

const App = () => {
  interface Task {
    text: string;
  }

  const [tasks, setTasks] = useState<Task[]>([
    { text: "Task1" },
    { text: "Task2" },
    { text: "Task3" },
    {
      text: "LongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongText",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const validInputText = (): boolean => {
    return inputRef.current?.value !== "";
  };

  const addTask = (text: string) => {
    const newTask = { text: text };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const resetField = () => {};

  const onSubmitTask = () => {
    if (validInputText()) {
      addTask(inputRef.current?.value!);
      resetField();
    }
  };

  return (
    <Container maxW="xl" centerContent>
      {tasks.map((task: Task) => (
        <Center p={3} m={1} w="100%" bg="blue.100">
          <Text isTruncated>{task.text}</Text>
        </Center>
      ))}
      <InputGroup m={1}>
        <Input
          borderRadius="0"
          placeholder="Input new task"
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmitTask();
            }
          }}
        />
        <InputRightElement
          children={<CheckIcon color="green.500" />}
          _hover={{ bg: "green.100", borderRadius: "50%" }}
          onClick={onSubmitTask}
        />
      </InputGroup>
    </Container>
  );
};

export default App;
