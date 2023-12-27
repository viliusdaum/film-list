import React, { useState } from "react";
import styles from "./table.module.scss";

interface TableRow {
  Name: string;
  Year: number;
}

interface TableProps {
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof TableRow | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof TableRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (typeof sortField === "string" && sortField !== "") {
      if (a[sortField] < b[sortField]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <table>
      <thead className={styles.head}>
        <tr className={styles.tr_head}>
          <th className={styles.head_name} onClick={() => handleSort("Name")}>
            Title/
          </th>
          <th className={styles.head_year} onClick={() => handleSort("Year")}>
            Year
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row) => (
          <tr key={row.Name}>
            <td className={styles.body_name}>{row.Name}</td>
            <td className={styles.body_year}>{row.Year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
