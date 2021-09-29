import { CheckIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useRef } from "react";
import { Task } from "./App";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const InputNewTaskField = ({ tasks, setTasks }: Props) => {
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
  );
};

export default InputNewTaskField;
