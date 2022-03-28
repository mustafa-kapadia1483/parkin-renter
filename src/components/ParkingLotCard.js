import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';

const ParkingLotCard = ({ parkingLot }) => {
  const { name, latitude, longitude, address, price } = parkingLot;
  const { streetAddress, locality, landmark, city, pincode } = address;
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
      </VStack>
    </Box>
  );
};

export default ParkingLotCard;
