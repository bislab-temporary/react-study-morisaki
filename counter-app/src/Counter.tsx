import { WrapItem } from "@chakra-ui/layout";
import { VStack, Text } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { useControllableState } from "@chakra-ui/hooks";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/editable";

type Props = {
  id: number;
  removeCounter: (id: number) => void;
};

function Counter({ id, removeCounter }: Props) {
  const [count, setCount] = useControllableState({ defaultValue: 0 });

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <WrapItem>
      <VStack m={5} p={5} borderRadius="md" borderWidth={2}>
        <Editable defaultValue={"Counter " + (id + 1)}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Text fontSize="2xl">{count}</Text>
        <ButtonGroup variant="outline">
          <Button colorScheme="red" onClick={decrementCount}>
            -1
          </Button>
          <Button colorScheme="blue" onClick={incrementCount}>
            +1
          </Button>
        </ButtonGroup>
        <Button
          colorScheme="red"
          borderRadius="50%"
          onClick={() => removeCounter(id)}
        >
          -
        </Button>
      </VStack>
    </WrapItem>
  );
}

export default Counter;
