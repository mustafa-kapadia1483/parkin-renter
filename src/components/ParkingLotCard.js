import {
  Button,
  Box,
  ButtonGroup,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useRef } from 'react';
import database from '../firebase';
import { ref, remove } from 'firebase/database';
import { useOutletContext } from 'react-router-dom';

const ParkingLotCard = ({ parkingLot, parkingLotKey }) => {
  const toast = useToast();
  const { uid } = useOutletContext();
  const { name, latitude, longitude, address, price } = parkingLot;
  const { streetAddress, locality, landmark, city, pincode } = address;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const CardAlertDialog = () => {
    const deleteHandler = () => {
      onClose();
      remove(ref(database, `renters/${uid}/parkingLots/${parkingLotKey}`)).then(
        () => {
          toast({
            title: `${name} deleted`,
            status: 'success',
            isClosable: true,
          });
        }
      );
    };
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={deleteHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

  return (
    <Box
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue('white', 'gray.700')}
      maxW="2xl"
    >
      <VStack align="flex-start">
        <Text>{name}</Text>
        <HStack>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </HStack>
        <Text>
          Address: {streetAddress}, {locality}, Near {landmark}, {city}-
          {pincode}
        </Text>
        <Text>Price: Rs. {price}/hr</Text>
        <ButtonGroup variant="outline" spacing="6">
          <Button colorScheme="blue" leftIcon={<AiOutlineEdit />}>
            Edit
          </Button>
          <Button
            onClick={onOpen}
            colorScheme="red"
            leftIcon={<AiOutlineDelete />}
          >
            Delete
          </Button>
        </ButtonGroup>
        <CardAlertDialog />
      </VStack>
    </Box>
  );
};

export default ParkingLotCard;
