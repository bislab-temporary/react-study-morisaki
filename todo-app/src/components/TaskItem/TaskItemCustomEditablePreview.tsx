import { EditablePreview, EditablePreviewProps } from "@chakra-ui/editable";

type CustomProps = {
  isDone: boolean;
};

type Props = EditablePreviewProps & CustomProps;

const TaskItemCustomEditablePreview = ({
  isDone,
  ...editablePreviewProps
}: Props) => {
  return isDone ? (
    <EditablePreview {...editablePreviewProps} color="gray" as="s" />
  ) : (
    <EditablePreview {...editablePreviewProps} />
  );
};

export default TaskItemCustomEditablePreview;
