import { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useCompletedEventMutation, useGetEventsQuery } from "../store";
import { formatDate } from "../utils/formatDate";
import { InputText } from "primereact/inputtext";
import { IEvent } from "../interfaces/app.interfaces";
import { useEventListener } from "primereact/hooks";
import { paginate } from "../utils/pagibate";

function Table() {
  const [first, setFirst] = useState<number>(0);
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
  const [selectedRow, setSelectedRow] = useState<IEvent | null>(null);
  const [compliteEvent, { isError }] = useCompletedEventMutation();

  const changeStatus = async (payload: IEvent) => {
    await compliteEvent({ ...payload, completed: !payload.completed }).unwrap();
  };

  const [bindKeyDown, unbindKeyDown] = useEventListener({
    type: "keydown",
    listener: (e: KeyboardEvent) => {
      onKeyDown(e);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      moveSelection(-1);
    } else if (e.key === "ArrowDown") {
      moveSelection(1);
    } else if (e.key === " ") {
      if (selectedRow) changeStatus(selectedRow);
      setSelectedRow(
        events[events.findIndex((ev) => ev.id === selectedRow?.id)]
      );
    }
  };

  const moveSelection = (step: number) => {
    const currentIndex = events.findIndex((ev) => ev.id === selectedRow?.id);
    const newIndex = currentIndex < 0 ? 0 : currentIndex + step;
    if (newIndex >= 0 && newIndex < events.length) {
      setSelectedRow(events[newIndex]);
    }
    if (newIndex < first) setFirst((prev) => (prev === 0 ? prev : prev - 5));
    if (newIndex >= first + 5) setFirst((prev) => prev + 5);
  };

  useEffect(() => {
    bindKeyDown();
    return () => {
      unbindKeyDown();
    };
  }, [bindKeyDown, unbindKeyDown]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const crop = paginate(events, first, 5);
  return (
    <>
      <div className=" flex justify-between items-center my-4">
        <h1 className=" font-semibold text-2xl">Журнал событий</h1>
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Поиск по сообщению"
        />
      </div>

      {isSuccess && (
        <div>
          <DataTable
            value={crop}
            // paginator
            // rows={5}
            // rowsPerPageOptions={[5, 10]}
            sortMode="multiple"
            tableStyle={{ minWidth: "50rem" }}
            className="bg-red-500"
            selectionMode="single"
            selection={selectedRow!}
            onSelectionChange={(e) => changeStatus(e.value)}
            dataKey="id"
            tabIndex={4}
          >
            <Column
              body={(rowData) => (
                <span>
                  {rowData.completed ? (
                    <i className="pi pi-check text-green-500"></i>
                  ) : (
                    <i className="pi pi-times text-red-500"></i>
                  )}
                </span>
              )}
            ></Column>
            <Column
              field="date"
              sortable
              header="Дата"
              body={(rowData) => (
                <span className="">{formatDate(rowData.date)}</span>
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
          <div className="">
            <Paginator
              first={first}
              rows={5}
              totalRecords={events.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
