import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export const PokeTable = ({
  className,
  info,
}: {
  className: string;
  info: any;
}) => {
  const colClassName: string = "py-0";

  return (
    <Table className={className} aria-label="Poke Stat Table">
      <TableHeader>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>VALUE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key={0}>
          <TableCell className={colClassName}>height</TableCell>
          <TableCell className={colClassName}>{info.height}</TableCell>
        </TableRow>
        <TableRow key={1}>
          <TableCell className={colClassName}>weight</TableCell>
          <TableCell className={colClassName}>{info.weight}</TableCell>
        </TableRow>
        {info.stats.map((statsidx: any, idx: number) => {
          return (
            <TableRow key={idx + 2}>
              <TableCell className={colClassName}>
                {statsidx.stat.name}
              </TableCell>
              <TableCell className={colClassName}>
                {statsidx.base_stat}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow key={8}>
          <TableCell className={colClassName}>type</TableCell>
          <TableCell className={colClassName}>
            {info.types.map((typeidx: any, idx: number) => {
              return `${typeidx.type.name} `;
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
