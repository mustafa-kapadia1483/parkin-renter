import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Link, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { child, get, ref, set } from 'firebase/database';
import database from '../firebase';
import TitledCard from './TitledCard';
import ParkingLotList from './ParkingLotList';

export default function DashboardHome() {
  const toast = useToast();
  const [name, setName] = useState();
  const { uid, email } = useOutletContext();

  useEffect(() => {
    get(child(ref(database), `renters/${uid}/personalInfo/name`))
      .then(snapshot => {
        if (snapshot.exists()) {
          setName(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [uid]);

  const updateRenterInfo = () => {
    set(ref(database, 'renters/' + uid + '/personalInfo'), {
      name: name,
    }).then(() => {
      toast({
        title: `Name Updated Successfully`,
        status: 'success',
        isClosable: true,
      });
    });
  };

  return (
    <VStack spacing={5}>
      <TitledCard title="Personal Information:">
        <Stack direction={{ lg: 'row' }}>
          <FormControl isRequired>
            <FormLabel htmlFor="renter-name">Renter Name:</FormLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              id="renter-name"
            />
          </FormControl>
          <FormControl isDisabled>
            <FormLabel htmlFor="email">Registered Email:</FormLabel>
            <Input id="email" value={email} isReadOnly />
          </FormControl>
        </Stack>
        <Button alignSelf="flex-end" onClick={updateRenterInfo}>
          Update
        </Button>
      </TitledCard>
      <TitledCard title={'Parking Lots:'}>
        <ParkingLotList uid={uid} />
        <Link
          to="/dashboard/manage-parking-lots"
          style={{ alignSelf: 'center' }}
        >
          <Button>Manage Parking Lots</Button>
        </Link>
      </TitledCard>
    </VStack>
  );
}
