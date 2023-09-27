"use client";

import { Pokecard } from "@/components/pokecard";
import { PokeDetailsModal } from "@/components/pokedetailsmodal";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { SearchBar } from "@/components/searchbar";
import { Spinner } from "@nextui-org/spinner";
import { Radio, RadioGroup } from "@nextui-org/radio";

export default function Home() {
  const [data, setData] = useState<any>();
  const [endIndex, setEndIndex] = useState(10);
  const [sortOption, setOption] = useState("id");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedPokemon, setPokemon] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSearch = (searchQuery: string) => {
    const filteredPokemons = data.filter((pokemon: any) =>
      pokemon.name.toLocaleLowerCase().includes(searchQuery)
    );

    setFilteredData(filteredPokemons);
  };

  const sortByName = (a: any, b: any) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase());

  const sortByID = (a: any, b: any) => {
    const idA = Number(a.url.split("/").slice(-2)[0]);
    const idB = Number(b.url.split("/").slice(-2)[0]);

    return idA - idB;
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=0")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setFilteredData(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <section className="md:pb-10 px-[5.6rem] md:px-[4.5rem] md:pt-0">
      <div className="flex flex-wrap justify-center gap-y-3 md:justify-between pb-5 items-center">
        <div className="md:pl-2 lg:pl-4 xl:pl-6 sm:pr-3">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="flex flex-row items-center md:pr-5 xl:pr-7">
          <p className="pr-2 pb-1">🗃️</p>
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
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {!isLoading && filteredData ? (
          filteredData
            .sort(sortOption == "name" ? sortByName : sortByID)
            .slice(0, endIndex)
            .map((pokeinfo: any, idx: number) => {
              return (
                <Pokecard
                  key={idx.toString()}
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

      {!isLoading && filteredData.length ? (
        <div className="flex flex-col items-center justify-center pt-5">
          <Button
            className="self-center"
            onPress={() => setEndIndex((endIndex) => endIndex + 10)}
          >
            Load More
          </Button>
        </div>
      ) : (
        ""
      )}

      <PokeDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        setPokemon={setPokemon}
        selectedPokemon={selectedPokemon}
        filteredData={filteredData}
      />
    </section>
  );
}
