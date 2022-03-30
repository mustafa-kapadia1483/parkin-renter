import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  NumberInput,
  NumberInputField,
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
  const [parkingName, setParkingName] = useState();
  const [parkingLatitude, setParkingLatitude] = useState();
  const [parkingLongitude, setParkingLongitude] = useState();
  const [parkingCarCapacity, setParkingCarCapacity] = useState();
  const [parkingBikeCapacity, setParkingBikeCapacity] = useState();
  const [parkingStreetAddress, setParkingStreetAddress] = useState();
  const [parkingLocality, setParkingLocality] = useState();
  const [parkingCity, setParkingCity] = useState();
  const [parkingPrice, setParkingPrice] = useState();
  const [parkingLandmark, setParkingLandmark] = useState();
  const [parkingPincode, setParkingPincode] = useState();
  const { uid } = useOutletContext();

  const createParkingLot = () => {
    if (
      !parkingName ||
      !parkingLatitude ||
      !parkingLongitude ||
      !parkingStreetAddress ||
      !parkingLocality ||
      !parkingLandmark ||
      !parkingPincode
    ) {
      toast({
        title: `Please enter all the details`,
        status: 'error',
        isClosable: true,
      });
    }
    const parkingLotsListRef = ref(database, `renters/${uid}/parkingLots`);
    const newParkingLotRef = push(parkingLotsListRef);
    set(newParkingLotRef, {
      name: parkingName,
      latitude: parseFloat(parkingLatitude),
      longitude: parseFloat(parkingLongitude),
      carCapacity: parseInt(parkingCarCapacity),
      bikeCapacity: parseInt(parkingBikeCapacity),
      streetAddress: parkingStreetAddress,
      locality: parkingLocality,
      landmark: parkingLandmark,
      pincode: parkingPincode,
      city: parkingCity,
      price: parkingPrice,
    }).then(() => {
      toast({
        title: `${parkingName} created`,
        status: 'success',
        isClosable: true,
      });
    });
  };
  return (
    <VStack>
      <TitledCard title={'Parking Lots:'}>
        <ParkingLotList uid={uid} />
      </TitledCard>
      <TitledCard title="Create New Parking Lot">
        <VStack as="form" align="flex-start" spacing="5">
          <Grid
            width="full"
            templateColumns={{ lg: 'repeat(5, 1fr)' }}
            autoRows
            gap={4}
          >
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-name">Name:</FormLabel>
                <Input
                  id="parking-lot-name"
                  onChange={e => setParkingName(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-street-address">
                  Street Address:
                </FormLabel>
                <Input
                  id="parking-lot-street-address"
                  onChange={e => setParkingStreetAddress(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-locality">Locality:</FormLabel>
                <Input
                  id="parking-lot-street-locality"
                  onChange={e => setParkingLocality(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-city">City:</FormLabel>
                <Input
                  id="parking-lot-street-city"
                  onChange={e => setParkingCity(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-Pincode">Pincode:</FormLabel>
                <Input
                  id="parking-lot-street-pincode"
                  onChange={e => setParkingPincode(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-landmark">Landmark:</FormLabel>
                <Input
                  id="parking-lot-street-landmark"
                  onChange={e => setParkingLandmark(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-car-capacity">
                  Car Capacity:
                </FormLabel>
                <NumberInput
                  id="parking-lot-car-capacity"
                  onChange={valueAsNumber =>
                    setParkingCarCapacity(valueAsNumber)
                  }
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-bike-capacity">
                  Bike Capacity:
                </FormLabel>
                <NumberInput
                  id="parking-lot-bike-capacity"
                  onChange={valueAsNumber =>
                    setParkingBikeCapacity(valueAsNumber)
                  }
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-bike-capacity">
                  Price per Hour:
                </FormLabel>
                <NumberInput
                  id="parking-lot-price"
                  onChange={valueAsNumber => setParkingPrice(valueAsNumber)}
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
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
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="parking-lot-longitude">
                  Longitude:
                </FormLabel>
                <NumberInput
                  id="parking-lot-longitude"
                  onChange={valueAsNumber => setParkingLongitude(valueAsNumber)}
                  min={-180}
                  max={180}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem display="flex" alignItem="center" justify="flex-end">
              <Button
                w="full"
                alignSelf={{ md: 'center', lg: 'flex-end' }}
                onClick={createParkingLot}
              >
                Create Parking Lot
              </Button>
            </GridItem>
          </Grid>
        </VStack>
      </TitledCard>
    </VStack>
  );
}
