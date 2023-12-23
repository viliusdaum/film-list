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

  // return (
  //   <div className={styles.table}>
  //     <table>
  //       <thead className={styles.head}>
  //         <LogOut />
  //         <tr className={styles.tr_head}>
  //           <div>sort by:</div>
  //           <th className={styles.head_name} onClick={() => handleSort("Name")}>
  //             Title
  //           </th>
  //           /
  //           <th className={styles.head_year} onClick={() => handleSort("Year")}>
  //             Year
  //           </th>
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {sortedData.map((row) => (
  //           <tr key={row.Name}>
  //             <div className={styles.item_container}>
  //               <td className={styles.body_name}>{row.Name}</td>
  //               <td className={styles.body_year}>{row.Year}</td>
  //             </div>
  //             <hr />
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
    <div className={styles.container}>
      <div className={styles.sort_by}>
        <div>sort by:</div>
        <div onClick={() => handleSort("Name")}>Title/</div>
        <div onClick={() => handleSort("Year")}>Year</div>
      </div>

      <div className={styles.table}>
        <table>
          {/* <thead className={styles.head}>
            <tr className={styles.tr_head}>
              <th className={styles.head_name}>Title</th>
              <th className={styles.head_year}>Year</th>
            </tr>
          </thead> */}

          <tbody>
            {sortedData.map((row) => (
              <tr key={row.Name}>
                <td className={styles.body_name}>{row.Name}</td>
                <td className={styles.body_year}>{row.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
