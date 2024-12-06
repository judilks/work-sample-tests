import {FC, PropsWithChildren, ReactElement, ReactNode} from "react";

type Column<T> = {
  name: string;
  header: FC;
  cell: FC<PropsWithChildren>;
  accessor: (row: T) => ReactNode;
}

interface WithId {
  id: number | string;
}

export function Table<T extends WithId>({data, columns}: {data: T[], columns: Column<T>[]}) {
  return (
    <table>
      <thead>
      <tr>
        {columns.map(col => (
          <th key={col.name}>
            <col.header/>
          </th>
        ))}
      </tr>

      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map(col => (
              <td key={`${col.name}-${row.id}`}>
                <col.cell>
                  {col.accessor(row)}
                </col.cell>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
