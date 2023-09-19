import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export const Pokecard = () => {
  return (
    <div className="justify-center">
      <Card
        isBlurred
        isFooterBlurred
        className="sm:w-[180px] sm:h-[260px] w-[240px] h-[320px]"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny text-opacity-0">#0001</p>
          <h4 className="font-medium text-2xl">Bulbasaur</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"
            width={270}
          />
        </CardBody>
        <CardFooter className="gap-1 pt-0 pb- pl-3">
          <Snippet
            hideSymbol
            hideCopyButton
            variant="shadow"
            color="success"
            className="py-1 px-2"
          >
            <span className="text-sm">grass</span>
          </Snippet>
          <Snippet
            hideSymbol
            hideCopyButton
            variant="shadow"
            className="py-1 px-2"
          >
            <span className="text-sm">normal</span>
          </Snippet>
        </CardFooter>
      </Card>
    </div>
  );
};
