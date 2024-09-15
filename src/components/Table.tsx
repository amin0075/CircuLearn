// react
import React, { forwardRef, ReactNode } from "react";

// next js
import { useRouter } from "next/router";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  children?: ReactNode;
  tableRows: ReactNode;
  tableHeads: ReactNode;
}

// @ts-ignore
const Table: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { children, className = "", tableRows, tableHeads, ...rest } = props;

  return (
    <div className="relative overflow-x-auto">
      <table
        ref={ref}
        className={`${twMerge(
          `w-full text-sm text-left text-gray-500 dark:text-gray-400`,
          className
        )}`}
      >
        <thead className="border-b-[0.5px] dark:border-backgroundLight/20 border-backgroundDark/20 text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400">
          <tr>{tableHeads}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
});

Table.displayName = "Table";

export default Table;
