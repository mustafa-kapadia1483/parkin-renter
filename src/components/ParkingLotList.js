import { HStack, Text } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import database from '../firebase';

const ParkingLotList = ({ uid }) => {
  const [parkingLots, setParkingLots] = useState(null);

  useEffect(() => {
    const parkingLotsRef = ref(database, 'renters/' + uid + '/parkingLots');
    onValue(parkingLotsRef, snapshot => {
      setParkingLots(snapshot.val());
    });
  }, []);

  return (
    <HStack spacing={5}>
      {!parkingLots && <Text>No Parking Lots Found</Text>}
      {parkingLots &&
        Object.values(parkingLots).map(parkingLot => (
          <Text>{parkingLot.name}</Text>
        ))}
    </HStack>
  );
};

export default ParkingLotList;
