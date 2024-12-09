import {FC, PropsWithChildren, ReactNode} from "react";
import "./table.css"

type Column<T> = {
  name: string;
  header: ReactNode | string;
  cell?: FC<PropsWithChildren>;
  accessor: (row: T) => ReactNode;
}

interface WithId {
  id: number | string;
}

export function Table<T extends WithId>({data, columns}: {data: T[], columns: Column<T>[]}) {
  return (
    <table className="table">
        <thead>
        <tr className={"row header"}>
          {columns.map(col => (
            <th key={col.name} className={"cell"}>
              {col.header}
            </th>
          ))}
        </tr>

        </thead>
        <tbody>
        {data.map((row) => (
          <tr key={row.id} className={"row"}>
            {columns.map(col => (
              <td key={`${col.name}-${row.id}`} className={"cell"}>
                {col.cell ?
                  <col.cell>
                    {col.accessor(row)}
                  </col.cell> :
                  col.accessor(row)
                }
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
  )
}
