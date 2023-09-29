"use client";

import { MetaData, Pokecard, Pokemon } from "@/components/pokecard";
import { PokeDetailsModal } from "@/components/pokedetailsmodal";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { SearchBar } from "@/components/searchbar";
import { Spinner } from "@nextui-org/spinner";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Pagination } from "@nextui-org/pagination";

export default function Home() {
  const displayCount = 15;
  const [data, setData] = useState<MetaData[]>();
  const [filteredData, setFilteredData] = useState<MetaData[]>();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(displayCount);
  const [sortOption, setOption] = useState("id");
  const [isLoading, setLoading] = useState(true);
  const [selectedPokemon, setPokemon] = useState<Pokemon>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSearch = (searchQuery: string) => {
    const filteredPokemons = data?.filter((pokemon: MetaData) =>
      pokemon.name.toLocaleLowerCase().includes(searchQuery)
    );

    setFilteredData(filteredPokemons);
  };

  const sortByName = (a: MetaData, b: MetaData) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase());

  const sortByID = (a: MetaData, b: MetaData) => {
    const idA = Number(a.url.split("/").slice(-2)[0]);
    const idB = Number(b.url.split("/").slice(-2)[0]);

    return idA - idB;
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=0")
      .then((res) => res.json())
      .then((data: { results: MetaData[] }) => {
        setData(data.results);
        setFilteredData(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <section className="md:pb-10 md:pt-0 w-[85%] justify-center mx-auto">
      <div className="flex flex-wrap justify-center gap-y-3 md:justify-between mx-auto pb-5 items-center">
        <div className="">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="flex flex-row items-center">
          <p className="pr-2 pb-1 pl-2 md:pl-0">🗃️</p>
          <RadioGroup
            value={sortOption}
            onValueChange={(value) => {
              setOption(value);
            }}
            size="sm"
            orientation="horizontal"
          >
            <Radio value="id">ID</Radio>
            <Radio value="name">Name</Radio>
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-wrap gap-7 items-center justify-center md:justify-between">
        {!isLoading && filteredData ? (
          filteredData
            .sort(sortOption == "name" ? sortByName : sortByID)
            .slice(startIndex, endIndex)
            .map((pokeinfo: MetaData, idx: number) => {
              return (
                <Pokecard
                  key={idx}
                  pokeinfo={pokeinfo}
                  setPokemon={setPokemon}
                  onOpen={onOpen}
                ></Pokecard>
              );
            })
        ) : (
          <div className="flex flex-col pt-[15vh] justify-center">
            <div className="flex flex-col justify-center items-center pb-5">
              <Spinner size="lg" />
            </div>
            <p>the Pokemon are sleeping</p>
          </div>
        )}
      </div>

      {!isLoading && filteredData?.length ? (
        <>
          <div className="flex flex-col items-center justify-center pt-5 md:hidden">
            <Button
              className="self-center"
              onPress={() => setEndIndex((endIndex) => endIndex + 10)}
            >
              Load More
            </Button>
          </div>
          <div className="hidden flex-col items-center justify-center pt-8 md:flex">
            <Pagination
              showControls
              size="lg"
              color="secondary"
              total={Math.ceil(filteredData.length / displayCount)}
              onChange={(currPage) => {
                setStartIndex((currPage - 1) * displayCount);
                setEndIndex((currPage - 1) * displayCount + displayCount);
              }}
            />
          </div>
        </>
      ) : null}

      {filteredData && selectedPokemon ? (
        <PokeDetailsModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          setPokemon={setPokemon}
          selectedPokemon={selectedPokemon}
          filteredData={filteredData}
        />
      ) : null}
    </section>
  );
}
