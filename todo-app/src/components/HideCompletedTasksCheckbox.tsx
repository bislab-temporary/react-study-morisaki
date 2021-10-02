import { Checkbox } from "@chakra-ui/checkbox";

type Props = {
  hideDone: boolean;
  setHideDone: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
};

const HideCompletedTasksCheckbox = ({ hideDone, setHideDone }: Props) => {
  return (
    <Checkbox mr="auto" isChecked={hideDone} onChange={setHideDone.toggle}>
      Hide completed tasks
    </Checkbox>
  );
};

export default HideCompletedTasksCheckbox;
