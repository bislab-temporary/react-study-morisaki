import { ButtonGroup, IconButton } from "@chakra-ui/button";
import {
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Checkbox } from "@chakra-ui/react";
import { TaskType } from "../types/TaskType";
import TaskItemCustomEditable from "./TaskItemCustomEditable";

type Props = {
  task: TaskType;
  updateTask: (createdAt: number, isDone: boolean, text: string) => void;
  deleteTask: (createdAt: number) => void;
};

const TaskItem = ({ task, updateTask, deleteTask }: Props) => {
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
    updateTask(task.createdAt, task.isDone, newText);
  };

  const toggleDone = () => {
    updateTask(task.createdAt, !task.isDone, task.text);
  };

  const onClickDeleteButton = () => {
    deleteTask(task.createdAt);
  };

  return (
    <TaskItemCustomEditable
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
    </TaskItemCustomEditable>
  );
};

export default TaskItem;
