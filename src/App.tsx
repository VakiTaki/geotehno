import { useEffect, useRef } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import { useAddEventMutation } from "./store";
import { generateRandomEvent } from "./utils/generateRandomEvent";
import Table from "./components/table";
import { Button } from "primereact/button";

function App() {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [addEvent, { isError }] = useAddEventMutation();
  const addRandomEvent = async () => {
    await addEvent(generateRandomEvent()).unwrap();
  };

  useEffect(() => {
    interval.current = setInterval(addRandomEvent, 10 * 1000);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);
  return (
    <div className="">
      <Button
        onClick={() => {
          if (interval.current) clearInterval(interval.current);
        }}
      >
        Stop
      </Button>
      <div className="">
        <Table />
      </div>
    </div>
  );
}

export default App;
