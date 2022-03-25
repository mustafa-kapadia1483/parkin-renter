import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { MdHome } from 'react-icons/md';
import { GoSettings } from 'react-icons/go';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { getAuth } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import database from '../firebase';
import { useState, useEffect } from 'react';
import TitledCard from './TitledCard';

const DashboardHome = ({ user }) => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [parkingLots, setParkingLots] = useState();
  const { uid, email } = user;
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

  useEffect(() => {
    get(child(ref(database), `renters/${uid}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const { personalInfo, parkingLots } = snapshot.val();
          setName(personalInfo.name);
          setParkingLots(parkingLots);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
    console.log(parkingLots);
  }, []);

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
        {parkingLots && (
          <HStack spacing={5}>
            {parkingLots.map(parkingLot => (
              <Text>{parkingLot.name}</Text>
            ))}
          </HStack>
        )}
        {!parkingLots && <Text>No Parking Lots Found</Text>}
        <Button alignSelf={'center'}>Manage Parking Lots</Button>
      </TitledCard>
    </VStack>
  );
};

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue('gray.600', 'gray.300');
  const nav = ['Home', 'Manage Parking Lots'];
  const [activeNav, setActiveNav] = useState('Home');

  const navItemOnClickHandler = e => {
    setActiveNav(e.target.innerText);
  };

  const NavItem = props => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue('inherit', 'gray.400')}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.900'),
          color: useColorModeValue('gray.900', 'gray.200'),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = props => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue('brand.500', 'white')}
          fontWeight="semibold"
        >
          ParkIn
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome} onClick={navItemOnClickHandler}>
          Home
        </NavItem>
        <NavItem icon={GoSettings} onClick={navItemOnClickHandler}>
          Manage Parking Lots
        </NavItem>
        {/* <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && 'rotate(90deg)'}
          />
        </NavItem> */}
        {/* <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse> */}
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue('white', 'gray.800')}
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <HStack align="center" spacing={5}>
            <ColorModeSwitcher />
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
          </HStack>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          {activeNav === 'Home' && <DashboardHome user={user} />}
          {activeNav === 'Manage Parking Lots' && (
            <Text>Manage Parking Lots</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
