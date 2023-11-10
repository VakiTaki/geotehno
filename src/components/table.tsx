import { useState, useEffect } from "react";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useCompletedEventMutation, useGetEventsQuery } from "../store";
import { formatDate } from "../utils/formatDate";
import { InputText } from "primereact/inputtext";
import { IEvent } from "../interfaces/app.interfaces";
import { useEventListener } from "primereact/hooks";
import { paginate } from "../utils/paginate";

function Table() {
  const [countPerPage, setCountPerPage] = useState<number>(5);
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
      e.preventDefault();
      moveSelection(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
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
    const newIndex = currentIndex < 0 ? first : currentIndex + step;
    if (newIndex >= 0 && newIndex < events.length) {
      setSelectedRow(events[newIndex]);
    }
    if (newIndex < first)
      setFirst((prev) => (prev === 0 ? prev : prev - countPerPage));
    if (newIndex >= first + countPerPage)
      setFirst((prev) => prev + countPerPage);
  };

  useEffect(() => {
    bindKeyDown();
    return () => {
      unbindKeyDown();
    };
  }, [bindKeyDown, unbindKeyDown]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setSelectedRow(null);
    setFirst(event.first);
  };

  const handleRowClick = (e: DataTableRowClickEvent) => {
    //Закостылил ошибку в либе (ну или я LoL))
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const { id } = e.data;
    const eventById = events?.find((e) => e.id === id);
    if (eventById) changeStatus(eventById);
  };

  const crop = paginate(events, first, countPerPage);

  return (
    <>
      <div className=" flex flex-col md:flex-row  md:justify-between md:items-center my-4 gap-4">
        <h1 className=" font-semibold text-2xl">Журнал событий</h1>
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Поиск по сообщению"
        />
      </div>

      {isSuccess && (
        <div className="">
          <DataTable
            value={crop}
            sortMode="multiple"
            tableStyle={{ minWidth: "50rem" }}
            selectionMode="single"
            selection={selectedRow!}
            onSelectionChange={(e) => {
              changeStatus(e.value);
              setSelectedRow(null);
            }}
            dataKey="id"
            emptyMessage="Ничего не найдено"
            onRowClick={(e) => handleRowClick(e)}
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
          <div className=" rounded-none">
            <Paginator
              first={first}
              rows={countPerPage}
              totalRecords={events.length}
              onPageChange={onPageChange}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
