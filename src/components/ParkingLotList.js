import { Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import database from '../firebase';
import ParkingLotCard from './ParkingLotCard';

const ParkingLotList = ({ uid }) => {
  const [parkingLots, setParkingLots] = useState(null);

  useEffect(() => {
    const parkingLotsRef = ref(database, 'renters/' + uid + '/parkingLots');
    onValue(parkingLotsRef, snapshot => {
      setParkingLots(snapshot.val());
    });
  }, [uid]);

  return (
    <Grid
      width="full"
      templateColumns={{ lg: 'repeat(2, 1fr)' }}
      autoRows
      gap={4}
    >
      {!parkingLots && <Text>No Parking Lots Found</Text>}
      {parkingLots &&
        Object.keys(parkingLots).map(key => (
          <GridItem key={key}>
            <ParkingLotCard parkingLotKey={key} parkingLot={parkingLots[key]} />
          </GridItem>
        ))}
    </Grid>
  );
};

export default ParkingLotList;
