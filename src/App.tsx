import { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import { useAddEventMutation } from "./store";
import { generateRandomEvent } from "./utils/generateRandomEvent";
import Table from "./components/table";
import { useInterval } from "primereact/hooks";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

function App() {
  const [activeAddMessages, setActiveAddMessages] = useState<boolean>(true);
  const [addEvent, { isError }] = useAddEventMutation();
  const addRandomEvent = async () => {
    await addEvent(generateRandomEvent()).unwrap();
  };
  useInterval(
    () => {
      addRandomEvent();
    },
    5000,
    activeAddMessages
  );
  return (
    <div className=" mt-5 mx-5">
      <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch
          inputId="input-metakey"
          checked={activeAddMessages}
          onChange={(e: InputSwitchChangeEvent) =>
            setActiveAddMessages(e.value!)
          }
        />
        <label htmlFor="input-metakey">
          Запустить/остановить генерацию сообщений
        </label>
      </div>
      <div className="">
        <Table />
      </div>
    </div>
  );
}

export default App;
