import { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import { useAddEventMutation } from "./store";
import { generateRandomEvent } from "./utils/generateRandomEvent";
import Table from "./components/table";
import { useInterval } from "primereact/hooks";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

function App() {
  const [activeAddMessages, setActiveAddMessages] = useState<boolean>(false);
  const [addEvent, { isError }] = useAddEventMutation();
  const addRandomEvent = async () => {
    await addEvent(generateRandomEvent()).unwrap();
  };
  useInterval(
    () => {
      addRandomEvent();
    },
    3 * 1000,
    activeAddMessages
  );
  return (
    <div className=" my-1 mx-1 md:my-5 md:mx-5 border p-1 md:p-5 rounded-md bg-blue-200">
      <div className="flex flex-col  md:flex-row justify-content-center align-items-center mb-4 gap-2">
        <div className="w-full flex justify-center md:w-fit">
          <InputSwitch
            inputId="input-metakey"
            checked={activeAddMessages}
            onChange={(e: InputSwitchChangeEvent) =>
              setActiveAddMessages(e.value!)
            }
          />
        </div>

        <label htmlFor="input-metakey" className=" text-center">
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
