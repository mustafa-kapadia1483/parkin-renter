import { HStack, Text } from '@chakra-ui/react';

const ParkingLotList = ({ parkingLots }) => {
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
