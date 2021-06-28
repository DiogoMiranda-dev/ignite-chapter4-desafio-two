import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalBody p="0">
            <Image src={imgUrl} w="100%" maxW="900px" h="100%" maxH="400px" />
          </ModalBody>
          <ModalFooter bg="#353431" display="flex" justifyContent="flex-start">
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
