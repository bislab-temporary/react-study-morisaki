import { Text } from "@chakra-ui/layout";
import { iTask } from "./App";

type Props = {
  task: iTask;
};

const Task = ({ task }: Props) => {
  return <Text isTruncated>{task.text}</Text>;
};

export default Task;
