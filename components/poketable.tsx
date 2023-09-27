import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pokemon, Stat, Type } from "./pokecard";

export const PokeTable = ({
  className,
  info,
}: {
  className: string;
  info: Pokemon;
}) => {
  const colClassName: string = "py-0";

  const getInfo: Function = (): JSX.Element[] => {
    return info.stats.map((statsidx: Stat, idx: number) => {
      return (
        <TableRow key={idx + 2}>
          <TableCell className={colClassName}>{statsidx.stat.name}</TableCell>
          <TableCell className={colClassName}>{statsidx.base_stat}</TableCell>
        </TableRow>
      );
    });
  };

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
        {getInfo()}
        <TableRow key={8}>
          <TableCell className={colClassName}>type</TableCell>
          <TableCell className={colClassName}>
            {info.types.map((typeidx: Type, idx: number) => {
              return `${typeidx.type.name} `;
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
