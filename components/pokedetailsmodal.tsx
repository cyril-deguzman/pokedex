import React from "react";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

export const PokeDetailsModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  selectedPokemon,
}: {
  isOpen: boolean;
  onOpen: any;
  onOpenChange: (isOpen: boolean) => void;
  selectedPokemon: any;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                {selectedPokemon.name}
              </ModalHeader>
              <ModalBody>
                <p>pokedetails</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Previous
                </Button>
                <Button color="secondary" onPress={onClose}>
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
