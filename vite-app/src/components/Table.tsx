import React from "react";

interface Column {
  key: string;
  label: string;
}
interface TableProps {
  columns: Column[];
  rows: Record<string, any>[];
}

const TableRow = React.memo(
  ({ row, columns }: { row: Record<string, any>; columns: Column[] }) => {
    return (
      <tr>
        {columns.map((col) => (
          <td
            key={col.key}
            style={{
              border: "1px solid #eee",
              padding: 4,
            }}
          >
            {row[col.key]}
          </td>
        ))}
      </tr>
    );
  },
  (prev, next) => {
    return prev.row === next.row; // 얕은 비교: 참조가 같으면 렌더링 생략
  }
);

const Table = ({ columns, rows }: TableProps) => (
  <table style={{ width: "300px", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        {columns.map((c) => (
          <th key={c.key} style={{ border: "1px solid #ccc", padding: 8 }}>
            {c.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <TableRow key={row.code} row={row} columns={columns} />
      ))}
    </tbody>
  </table>
);

/* ✅ React.memo: prop이 바뀌지 않으면 다시 안 그립니다 */
export default React.memo(Table);
