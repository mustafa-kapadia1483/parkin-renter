import { onValue, ref } from 'firebase/database';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import TitledCard from './TitledCard';
import database from '../firebase';

const Bookings = () => {
  const { uid } = useOutletContext();
  const [bookings, setBookings] = useState(null);
  // const [parkingLotsIdList, setparkingLotsIdList] = useState(null);
  const [parkingLots, setParkingLots] = useState(null);

  useEffect(() => {
    const parkingLotsRef = ref(database, 'renters/' + uid + '/parkingLots');
    onValue(parkingLotsRef, snapshot => {
      setParkingLots(snapshot.val());
    });
  }, [uid]);
  // fetch(
  //   `https://parkin-e5c4e-default-rtdb.firebaseio.com/renters/${uid}/parkingLots.json?shallow=true`
  // )
  //   .then(response => response.json())
  //   .then(data => setparkingLotsIdList(Object.keys(data)));

  // const bookingsRef = ref(database, 'TestBookings');
  // const bookingsList = [];
  // onValue(bookingsRef, snapshot => {
  //   bookingsList = Object.values(snapshot.val()).filter(
  //     val => val.parkingLot === uid
  //   );
  // });
  // }, []);
  return (
    <TitledCard title="Bookings">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Parking Lot</Th>
            <Th>Date</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Status</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
      </Table>
    </TitledCard>
  );
};

export default Bookings;
