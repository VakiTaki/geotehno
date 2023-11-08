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

function Table() {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };
  const { data: events, isSuccess } = useGetEventsQuery({
    message_like: globalFilterValue,
  });
  const [compliteEvent, { isError }] = useCompletedEventMutation();

  const formatedData = events?.map((event) => ({
    ...event,
    date: formatDate(event.date),
  }));

  const handleRowClick = (event: DataTableRowClickEvent) => {
    const body = { ...event.data };
    console.log(body);
  };
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
            value={formatedData}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10]}
            sortMode="multiple"
            tableStyle={{ minWidth: "50rem" }}
            className="bg-red-500"
            onRowClick={(e) => handleRowClick(e)}
          >
            <Column
              field="date"
              sortable
              header="Дата"
              body={(rowData) => (
                <span className={rowData.completed ? " opacity-60 " : "  "}>
                  {rowData.date}
                </span>
              )}
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
