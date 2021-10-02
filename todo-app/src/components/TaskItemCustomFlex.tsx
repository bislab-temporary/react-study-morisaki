import { Flex, FlexProps } from "@chakra-ui/layout";

type CustomProps = {
  isDone: boolean;
};

type Props = FlexProps & CustomProps;

const TaskItemCustomFlex = ({ isDone, ...flexProps }: Props) => {
  return isDone ? (
    <Flex color="gray" as="s" {...flexProps} />
  ) : (
    <Flex {...flexProps} />
  );
};

export default TaskItemCustomFlex;
