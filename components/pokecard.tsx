import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export const Pokecard = ({
  pokeinfo,
  pokeid,
  setPokemon,
  onOpen,
}: {
  pokeinfo: any;
  pokeid: number;
  setPokemon: Function;
  onOpen: () => void;
}) => {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeinfo.name}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="justify-center">
      <Card
        isPressable
        isBlurred
        isFooterBlurred
        className="sm:w-[180px] sm:h-[260px] w-[240px] h-[320px]"
        onPress={() => {
          setPokemon(pokeinfo);
          onOpen();
        }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny text-opacity-0">
            #{pokeid.toString().padStart(4, "0")}
          </p>
          <h4 className="font-medium text-2xl capitalize">{pokeinfo.name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeid
              .toString()
              .padStart(3, "0")}.png`}
            width={270}
          />
        </CardBody>
        <CardFooter className="gap-1 pt-0 pl-3">
          {!isLoading
            ? data.types.map((types: any, idx: number) => {
                const type = types.type.name;

                return (
                  <Snippet
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
