import { useState, useRef, useEffect } from "react";
import {
  DataTable,
  DataTableSelectEvent,
  DataTableUnselectEvent,
  DataTableRowClickEvent,
  DataTableValue,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useCompletedEventMutation, useGetEventsQuery } from "../store";
import { formatDate } from "../utils/formatDate";
import { InputText } from "primereact/inputtext";
import { IEvent } from "../interfaces/app.interfaces";

function Table() {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };
  const { data: events = [], isSuccess } = useGetEventsQuery({
    message_like: globalFilterValue,
    _sort: "date",
    _order: "desc",
  });
  const [selectedEvents, setSelectedEvents] = useState<IEvent[] | null>(null);
  console.log(selectedEvents);
  const [compliteEvent, { isError }] = useCompletedEventMutation();

  const changeStatus = async (payload: IEvent) => {
    await compliteEvent(payload).unwrap();
  };

  const onRowSelect = (event: DataTableSelectEvent) => {
    changeStatus({ ...event.data, completed: true });
  };

  const onRowUnselect = (event: DataTableUnselectEvent) => {
    changeStatus({ ...event.data, completed: false });
  };

  useEffect(() => {
    if (events) {
      setSelectedEvents(events.filter((ev) => ev.completed));
    }
  }, [events]);
  return (
    <>
      <InputText
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Поиск по сообщению"
      />

      {isSuccess && (
        <div>
          <DataTable
            value={events}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10]}
            sortMode="multiple"
            tableStyle={{ minWidth: "50rem" }}
            className="bg-red-500"
            selectionMode={"multiple"}
            selection={selectedEvents!}
            onSelectionChange={(e) => setSelectedEvents(e.value)}
            dataKey="id"
            onRowSelect={onRowSelect}
            onRowUnselect={onRowUnselect}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="date"
              sortable
              header="Дата"
              body={(rowData) => <span>{formatDate(rowData.date)}</span>}
            ></Column>
            <Column field="importance" sortable header="Важность"></Column>
            <Column field="equipment" sortable header="Оборудование"></Column>
            <Column field="message" header="Сообщение"></Column>
            <Column
              field="responsible"
              sortable
              header="Ответственный"
            ></Column>
          </DataTable>
        </div>
      )}
    </>
  );
}

export default Table;
