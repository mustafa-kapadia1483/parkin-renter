import { Text, useColorModeValue, VStack } from '@chakra-ui/react';

const TitledCard = ({ children, title }) => {
  return (
    <VStack
      align={'left'}
      borderWidth="1px"
      borderRadius="lg"
      w={'100%'}
      height={'auto'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      p={5}
    >
      <Text fontSize={'lg'}>{title}</Text>
      {children}
    </VStack>
  );
};

export default TitledCard;
