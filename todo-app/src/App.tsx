import { useBoolean } from "@chakra-ui/hooks";
import { Container } from "@chakra-ui/layout";
import HideCompletedTasksCheckbox from "./components/HideCompletedTasksCheckbox";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";

const App = () => {
  const [hideDone, setHideDone] = useBoolean(false);

  return (
    <Container maxW="xl" centerContent>
      <HideCompletedTasksCheckbox
        hideDone={hideDone}
        setHideDone={setHideDone}
      />
      <TaskList hideDone={hideDone} />
      <TaskInput />
    </Container>
  );
};

export default App;
