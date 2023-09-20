import React from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { PokeTable } from "./poketable";

export const PokeDetailsModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  setPokemon,
  selectedPokemon,
  filteredData,
}: {
  isOpen: boolean;
  onOpen: any;
  setPokemon: (data: any) => void;
  onOpenChange: (isOpen: boolean) => void;
  selectedPokemon: any;
  filteredData: any;
}) => {
  const onNextPokemon = (isNext: boolean) => {
    const currIdx = filteredData
      .map((pokeinfo: any) => pokeinfo.name)
      .indexOf(selectedPokemon.name);

    const nextIdx = isNext ? currIdx + 1 : currIdx - 1;

    const nextPokemon =
      nextIdx >= 0 && nextIdx < filteredData.length
        ? filteredData[nextIdx].name
        : filteredData[currIdx].name;

    fetch(`https://pokeapi.co/api/v2/pokemon/${nextPokemon}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  };

  return (
    <>
      <Modal
        backdrop="blur"
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex capitalize">
                <p>
                  {selectedPokemon.name}{" "}
                  <span className="font-light text-md">
                    #{selectedPokemon.id.toString().padStart(4, "0")}
                  </span>
                </p>
              </ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <Image
                  isBlurred
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${selectedPokemon.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  width={130}
                />
                <PokeTable className="md:px-10" info={selectedPokemon} />
              </ModalBody>
              <ModalFooter className="justify-center items-center">
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => onNextPokemon(false)}
                >
                  Previous
                </Button>
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => onNextPokemon(true)}
                >
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
