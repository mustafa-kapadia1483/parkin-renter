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
  const [bookings, setBookings] = useState([]);
  // const [parkingLotsIdList, setparkingLotsIdList] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);

  useEffect(() => {
    const parkingLotsRef = ref(database, 'renters/' + uid + '/parkingLots');
    onValue(parkingLotsRef, snapshot => {
      setParkingLots(snapshot.val());
    });
    const rentersBookings = [];
    const bookingsRef = ref(database, 'TestBookings');
    onValue(bookingsRef, snapshot => {
      Object.values(snapshot.val()).forEach(val => {
        Object.values(val).forEach(booking => {
          if (
            Object.values(parkingLots).some(
              parking => parking.name === booking.parkName
            )
          ) {
            rentersBookings.push(val);
          }
        });
      });
    });
    setBookings(rentersBookings);
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
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>vhRegNo</Th>
              <Th>Parking Lot</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Start Time</Th>
              <Th>Hours</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          {bookings &&
            bookings.map(booking =>
              Object.values(booking).map(val => (
                <Tr>
                  <Td>{val.vhRegNo}</Td>
                  <Td>{val.parkName}</Td>
                  <Td>{val.status}</Td>
                  <Td>{val.givenDate}</Td>
                  <Td>{val.startTime}</Td>
                  <Td>{val.noHours}</Td>
                  <Td>{val.finalAmount}</Td>
                </Tr>
              ))
            )}
        </Table>
      </TableContainer>
    </TitledCard>
  );
};

export default Bookings;
