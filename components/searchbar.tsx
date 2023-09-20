import React from "react";
import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";

export const SearchBar = ({
  onSearch,
}: {
  onSearch: (searchQuery: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Input
      onChange={(e) => {
        setSearchQuery(e.target.value.toLocaleLowerCase());
        onSearch(e.target.value.toLocaleLowerCase());
      }}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
};
