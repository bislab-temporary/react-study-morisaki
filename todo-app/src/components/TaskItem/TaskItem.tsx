import { ButtonGroup, IconButton } from "@chakra-ui/button";
import {
  Editable,
  EditableInput,
  useEditableControls,
} from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Spacer } from "@chakra-ui/layout";
import { Checkbox } from "@chakra-ui/react";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import { db } from "../../models/db";
import { TaskType } from "../../models/TaskType";
import TaskItemCustomEditablePreview from "./TaskItemCustomEditablePreview";
import TaskItemCustomFlex from "./TaskItemCustomFlex";

type Props = {
  task: TaskType;
  snapshot: DraggableStateSnapshot;
};

const TaskItem = ({ task, snapshot }: Props) => {
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
    db.tasksTable.update(task, { text: newText });
  };

  const toggleDone = () => {
    db.tasksTable.update(task, { isDone: !task.isDone });
  };

  const onClickDeleteButton = () => {
    db.tasksTable.delete(task.createdAt);
  };

  return (
    <Editable
      defaultValue={task.text}
      isPreviewFocusable={false}
      onSubmit={(nextValue: string) => onSubmit(nextValue)}
    >
      <TaskItemCustomFlex
        p={3}
        m={1}
        bg="blue.100"
        isDraggingOver={snapshot.isDragging}
      >
        <Checkbox
          mr={3}
          size="lg"
          borderColor="blackAlpha.500"
          isChecked={task.isDone}
          onChange={toggleDone}
        ></Checkbox>
        <TaskItemCustomEditablePreview isTruncated isDone={task.isDone} />
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
      </TaskItemCustomFlex>
    </Editable>
  );
};

export default TaskItem;
