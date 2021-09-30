import { ButtonGroup, IconButton } from "@chakra-ui/button";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Checkbox } from "@chakra-ui/react";
import { iTask } from "./App";

type Props = {
  task: iTask;
  updateTasks: (create: number, isDone: boolean, newText: string) => void;
};

const Task = ({ task, updateTasks }: Props) => {
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup ml="1em" size="sm">
        <IconButton
          aria-label="check icon"
          icon={<CheckIcon />}
          color="green.500"
          borderColor="green.500"
          borderWidth={2}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="close icon"
          icon={<CloseIcon />}
          color="red.500"
          borderColor="red.500"
          borderWidth={2}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <IconButton
        aria-label="edit icon"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    );
  };

  const onSubmit = (newText: string) => {
    updateTasks(task.create, task.isDone, newText);
  };

  const toggleDone = () => {
    updateTasks(task.create, !task.isDone, task.text);
  };

  const TaskContents = () => {
    return (
      <Flex>
        <Checkbox
          mr={3}
          size="lg"
          borderColor="blackAlpha.500"
          isChecked={task.isDone}
          onChange={toggleDone}
        ></Checkbox>
        <EditablePreview isTruncated />
        <EditableInput />
        <Spacer />
        <EditableControls />
      </Flex>
    );
  };

  if (task.isDone) {
    return (
      <Editable
        p={3}
        m={1}
        w="100%"
        color="gray"
        bg="blue.100"
        defaultValue={task.text}
        as="s"
        isPreviewFocusable={false}
        onSubmit={(nextValue) => onSubmit(nextValue)}
      >
        <TaskContents />
      </Editable>
    );
  } else {
    return (
      <Editable
        p={3}
        m={1}
        w="100%"
        bg="blue.100"
        defaultValue={task.text}
        isPreviewFocusable={false}
        onSubmit={(nextValue) => onSubmit(nextValue)}
      >
        <TaskContents />
      </Editable>
    );
  }
};

export default Task;
