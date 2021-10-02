import { Editable, EditableProps } from "@chakra-ui/editable";

type CustomProps = {
  isDone: boolean;
};

type Props = EditableProps & CustomProps;

const TaskItemCustomEditable = ({ isDone, ...editableProps }: Props) => {
  return isDone ? (
    <Editable color="gray" as="s" {...editableProps} />
  ) : (
    <Editable {...editableProps} />
  );
};

export default TaskItemCustomEditable;
