import { AddIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskType } from "./types/TaskType";

type Props = {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
};

const InputNewTaskField = ({ tasks, setTasks }: Props) => {
  const [text, setText] = useState<string>("");

  const validInputText = (): boolean => {
    return text !== "";
  };

  const addTask = (text: string) => {
    const now = Date.now();
    const newTask = { createdAt: now, isDone: false, text: text };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const resetField = () => {
    setText("");
  };

  const onSubmitTask = () => {
    if (validInputText()) {
      addTask(text);
      resetField();
    }
  };
  return (
    <InputGroup m={1}>
      <Input
        borderRadius="0"
        placeholder="Input new task"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmitTask();
          }
        }}
      />
      <InputRightElement
        children={<AddIcon color="green.500" />}
        _hover={{ bg: "green.100", borderRadius: "50%" }}
        onClick={onSubmitTask}
      />
    </InputGroup>
  );
};

export default InputNewTaskField;
