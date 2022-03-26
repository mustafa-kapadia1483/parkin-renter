import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { push, ref, set } from 'firebase/database';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import database from '../firebase';
import ParkingLotList from './ParkingLotList';
import TitledCard from './TitledCard';

export default function ManageParkingLots() {
  const toast = useToast();
  const [parkingLotName, setParkingLotName] = useState();
  const [parkingLatitude, setParkingLatitude] = useState();
  const [parkingLongitude, setParkingLongitude] = useState();
  const [parkingCapacity, setParkingCapacity] = useState();
  const { uid } = useOutletContext();

  const createParkingLot = () => {
    if (!parkingLotName || !setParkingLatitude || !parkingLongitude) {
      toast({
        title: `Please enter all the details`,
        status: 'error',
        isClosable: true,
      });
    }
    const parkingLotsListRef = ref(database, `renters/${uid}/parkingLots`);
    const newParkingLotRef = push(parkingLotsListRef);
    set(newParkingLotRef, {
      name: parkingLotName,
      latitude: parkingLatitude,
      longitude: parkingLongitude,
      capacity: parkingCapacity,
    }).then(() => {
      toast({
        title: `${parkingLotName} created`,
        status: 'success',
        isClosable: true,
      });
    });
  };
  console.log(parkingLotName, parkingLongitude, parkingLongitude);
  return (
    <VStack>
      <TitledCard title={'Parking Lots:'}>
        <ParkingLotList uid={uid} />
      </TitledCard>
      <TitledCard title="Create New Parking Lot">
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FormControl isRequired>
            <FormLabel htmlFor="parking-lot-name">Name:</FormLabel>
            <Input
              id="parking-lot-name"
              onChange={e => setParkingLotName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="parking-lot-latitude">Latitude:</FormLabel>
            <NumberInput
              id="parking-lot-latitude"
              onChange={valueAsNumber => setParkingLatitude(valueAsNumber)}
              min={-90}
              max={90}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="parking-lot-longitude">Longitude:</FormLabel>
            <NumberInput
              id="parking-lot-longitude"
              onChange={valueAsNumber => setParkingLongitude(valueAsNumber)}
              min={-180}
              max={180}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="parking-lot-capacity">Capacity:</FormLabel>
            <NumberInput
              id="parking-lot-capacity"
              onChange={valueAsNumber => setParkingCapacity(valueAsNumber)}
              min={0}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </Stack>
        <Button
          alignSelf={{ md: 'center', lg: 'flex-end' }}
          onClick={createParkingLot}
        >
          Create Parking Lot
        </Button>
      </TitledCard>
    </VStack>
  );
}
