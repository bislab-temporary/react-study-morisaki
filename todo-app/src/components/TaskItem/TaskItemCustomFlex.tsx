import { Flex, FlexProps } from "@chakra-ui/layout";

type CustomProps = {
  isDraggingOver: boolean;
};

type Props = FlexProps & CustomProps;

const TaskItemCustomFlex = ({ isDraggingOver, ...flexProps }: Props) => {
  return isDraggingOver ? (
    <Flex {...flexProps} borderWidth={2} borderColor="blue.500" bg="blue.200" />
  ) : (
    <Flex {...flexProps} />
  );
};

export default TaskItemCustomFlex;
