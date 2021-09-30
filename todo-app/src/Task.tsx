import { ButtonGroup, IconButton } from "@chakra-ui/button";
import {
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Checkbox } from "@chakra-ui/react";
import { iTask } from "./App";
import CustomEditable from "./CustomEditable";

type Props = {
  task: iTask;
  updateTask: (create: number, isDone: boolean, newText: string) => void;
  deleteTask: (create: number) => void;
};

const Task = ({ task, updateTask, deleteTask }: Props) => {
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
    updateTask(task.create, task.isDone, newText);
  };

  const toggleDone = () => {
    updateTask(task.create, !task.isDone, task.text);
  };

  const onClickDeleteButton = () => {
    deleteTask(task.create);
  };

  return (
    <CustomEditable
      p={3}
      m={1}
      w="100%"
      bg="blue.100"
      defaultValue={task.text}
      isDone={task.isDone}
      isPreviewFocusable={false}
      onSubmit={(nextValue) => onSubmit(nextValue)}
    >
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
        <IconButton
          aria-label="delete icon"
          size="sm"
          ml="1em"
          icon={<DeleteIcon />}
          color="red.500"
          onClick={onClickDeleteButton}
        />
      </Flex>
    </CustomEditable>
  );
};

export default Task;
