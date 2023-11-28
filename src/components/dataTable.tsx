import { useEffect, useRef, useState } from "react";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { useResize } from "../hooks/useResize";
import { paginate } from "../utils/paginate";

interface IUniversalDataTableProps<T> {
  data: T[];
  keys?: (keyof T)[] | null;
}

function UniversalDataTable<T>(props: IUniversalDataTableProps<T>) {
  const toast = useRef<Toast>(null);
  const { isScreenLg, isScreenMd, isScreenSm } = useResize();
  const [countPerPage, setCountPerPage] = useState<number>(5);
  const [first, setFirst] = useState<number>(0);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };

  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const crop = paginate(props.data, first, countPerPage);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setSelectedRow(null);
    setFirst(event.first);
  };

  //   const handleRowClick = (e: DataTableRowClickEvent) => {
  //     if (document.activeElement instanceof HTMLElement) {
  //       document.activeElement.blur();
  //     }
  //     const { id } = e.data;
  //  const eventById = events?.find((e) => e.id === id);
  //  if (eventById) changeStatus(eventById);
  //   };

  useEffect(() => {
    if (isScreenLg) {
      setCountPerPage(5);
    } else if (isScreenMd) {
      setCountPerPage(3);
    } else {
      setCountPerPage(5);
    }
  }, [isScreenLg, isScreenMd, isScreenSm]);

  const columnKeys = props.data[0]
    ? props.keys
      ? Object.keys(props.data[0]).filter((key) =>
          props.keys?.includes(key as keyof T)
        )
      : Object.keys(props.data[0])
    : null;
  console.log(columnKeys);

  return (
    columnKeys && (
      <div className="">
        <DataTable
          size={"small"}
          value={crop as any}
          selectionMode="single"
          selection={selectedRow!}
          onSelectionChange={(e) => {
            setSelectedRow(e.value);
          }}
          dataKey="id"
          emptyMessage="Ничего не найдено"
          //  onRowClick={(e) => handleRowClick(e)}
          tabIndex={-1}
        >
          {columnKeys.map((field) => (
            <Column key={field} field={field} header={field}></Column>
          ))}
        </DataTable>
        <div className=" rounded-none">
          <Paginator
            first={first}
            rows={countPerPage}
            totalRecords={props.data.length}
            onPageChange={onPageChange}
            style={{ borderRadius: "0px" }}
          />
        </div>
      </div>
    )
  );
}

export default UniversalDataTable;
