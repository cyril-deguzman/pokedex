"use client";

import { Pokecard } from "@/components/pokecard";
import { PokeDetailsModal } from "@/components/pokedetailsmodal";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";

export default function Home() {
  const [selectedPokemon, setPokemon] = useState<any>();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-wrap gap-8 py-8 md:py-10 items-center justify-center">
      {!isLoading ? (
        data.results.map((pokeinfo: any, idx: number) => (
          <Pokecard
            key={idx}
            pokeid={idx + 1}
            pokeinfo={pokeinfo}
            setPokemon={setPokemon}
            onOpen={onOpen}
          ></Pokecard>
        ))
      ) : (
        <p>the Pokemon are sleeping</p>
      )}
      <PokeDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        selectedPokemon={selectedPokemon}
      />
    </section>
  );
}
