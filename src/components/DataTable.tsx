import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: keyof T) => void;
  sortConfig?: { key: keyof T | ""; direction: "asc" | "desc" | null };
}

function DataTable<T>({ data, columns, onSort, sortConfig }: DataTableProps<T>): JSX.Element {
  const handleSort = (key: keyof T) => {
    if (onSort) onSort(key);
  };

  return (
    <div className="overflow-x-auto rounded-lg border-t-4 border-primary bg-white shadow-lg">
      <table className="min-w-full table-auto text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-primary to-primary-tint5 text-white">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className={`px-6 py-4 text-left ${col.sortable ? "cursor-pointer" : ""}`} onClick={() => col.sortable && handleSort(col.key)}>
                {col.label}
                {sortConfig?.key === col.key && sortConfig.direction === "asc" ? " ↑" : ""}
                {sortConfig?.key === col.key && sortConfig.direction === "desc" ? " ↓" : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="transition duration-300 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4">
                  {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
