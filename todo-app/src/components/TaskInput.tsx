import { AddIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";

type Props = {
  addTask: (text: string) => void;
};

const TaskInput = ({ addTask }: Props) => {
  const [text, setText] = useState<string>("");

  const validInputText = (): boolean => {
    return text !== "";
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

export default TaskInput;
