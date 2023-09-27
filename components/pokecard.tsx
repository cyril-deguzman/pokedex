import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export interface PokeCardProps {
  pokeinfo: any;
  setPokemon: (data: any) => void;
  onOpen: () => void;
}

export const Pokecard = ({ pokeinfo, setPokemon, onOpen }: PokeCardProps) => {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const pokeid = pokeinfo.url.split("/").slice(-2)[0];

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeinfo.name}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [pokeinfo]);

  return (
    <div className="justify-center">
      <Card
        isPressable
        isFooterBlurred
        className="sm:w-[180px] sm:h-[260px] w-[240px] h-[320px] dark:bg-neutral-900"
        onPress={() => {
          setPokemon(data);
          onOpen();
        }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny text-opacity-0">
            #{pokeid.toString().padStart(4, "0")}
          </p>
          <h4 className="font-medium text-xl truncate capitalize">
            {pokeinfo.name}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            isBlurred
            alt="Card background"
            className="object-cover rounded-xl"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeid
              .toString()
              .padStart(3, "0")}.png`}
            width={270}
          />
        </CardBody>
        <CardFooter className="gap-1 pl-3 pb-4 md:pb-3">
          {!isLoading
            ? data.types.map((types: any, idx: number) => {
                return (
                  <Snippet
                    key={idx}
                    hideSymbol
                    hideCopyButton
                    variant="shadow"
                    color="default"
                    className="py-1 px-2"
                  >
                    <span className="md:text-sm text-lg">
                      {types.type.name}
                    </span>
                  </Snippet>
                );
              })
            : ""}
        </CardFooter>
      </Card>
    </div>
  );
};
