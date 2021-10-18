import React from "react";
import styles from "./DataTable.module.css";

function DataRow({ onClick, data, columns }) {
  const handleClick = () => {
    if (onClick && onClick instanceof Function) {
      onClick(data);
    }
  };

  return (
    <tr onClick={handleClick}>
      {columns.map((column) => (
        <td key={column.key}>
          {column.render && column.render instanceof Function
            ? column.render(data)
            : data[column.key]}
        </td>
      ))}
    </tr>
  );
}

function DataEmptyRow({ message = "You haven't recorded any data", colSpan }) {
  return (
    <tr>
      <td colSpan={colSpan} className={styles.emptyMessage}>
        {message}
      </td>
    </tr>
  );
}

function DataTable({
  data,
  columns,
  onRowClick,
  emptyMessage,
  rowKey,
  title,
}) {
  return (
    <table cellSpacing="0" cellPadding="0" className={styles.table}>
      {title && <caption className={styles.caption}>{title}</caption>}
      <thead className={styles.tableHead}>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.length > 0 ? data.map((dt) => (
          <DataRow
            key={dt[rowKey]}
            onClick={onRowClick}
            columns={columns}
            data={dt}
          />
        )) : (
          <DataEmptyRow message={emptyMessage} colSpan={columns.length} />
        )}
      </tbody>
    </table>
  );
}

export default DataTable;
