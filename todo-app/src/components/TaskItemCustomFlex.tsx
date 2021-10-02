import { Flex, FlexProps } from "@chakra-ui/layout";

type CustomProps = {
  isDone: boolean;
  isDraggingOver: boolean;
};

type Props = FlexProps & CustomProps;

const TaskItemCustomFlex = ({
  isDone,
  isDraggingOver,
  ...flexProps
}: Props) => {
  if (isDone) {
    flexProps["color"] = "gray";
    flexProps["as"] = "s";
  }
  if (isDraggingOver) {
    flexProps["borderWidth"] = 2;
    flexProps["borderColor"] = "blue.500";
    flexProps["bg"] = "blue.200";
  }
  return <Flex {...flexProps} />;
};

export default TaskItemCustomFlex;
