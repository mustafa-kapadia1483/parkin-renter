import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  VisuallyHidden,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const user = auth.currentUser;
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  if (localStorage.getItem('user')) {
    navigate('/dashboard', { replace: true });
  }
  if (user) {
    navigate('/dashboard', { replace: true });
  }
  const googleSignInHandler = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        // The signed-in user info.
        navigate('/dashboard', { replace: true });
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const signInButtonHandler = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard', { replace: true });
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });
  };
  // const dbRef = ref(database);
  // get(child(dbRef, `users`))
  //   .then(snapshot => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log('No data available');
  //     }
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  return (
    <Flex
      px={8}
      py={[10, 24]}
      mx="auto"
      height={{ lg: '100vh' }}
      align={{ lg: 'center' }}
    >
      <SimpleGrid
        alignItems="center"
        w={{ base: 'full', xl: 11 / 12 }}
        columns={{ base: 1, lg: 11 }}
        gap={{ base: 0, lg: 24 }}
        mx="auto"
      >
        <GridItem
          colSpan={{ base: 'auto', lg: 7 }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            lineHeight={{ base: 'shorter', md: 'none' }}
            color={useColorModeValue('gray.900', 'gray.200')}
            letterSpacing={{ base: 'normal', md: 'tight' }}
          >
            Become a Parking Space Renter with ParkIn
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="thin"
            color="gray.500"
            letterSpacing="wider"
          >
            Convert your unused open parking spaces into a income source with
            the help of ParkIn
          </chakra.p>
        </GridItem>
        <GridItem colSpan={{ base: 'auto', md: 4 }}>
          <Box mb={6} rounded="lg" shadow="xl">
            <Center pb={0} color={useColorModeValue('gray.700', 'gray.600')}>
              <p pt={2}>Start renting now</p>
            </Center>
            <SimpleGrid
              columns={1}
              px={6}
              py={4}
              spacing={4}
              borderBottom="solid 1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Flex>
                <VisuallyHidden>Email Address</VisuallyHidden>
                <Input
                  value={emailAddress}
                  onChange={e => setEmailAddress(e.target.value)}
                  mt={0}
                  type="email"
                  placeholder="Email Address"
                  required={true}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Password</VisuallyHidden>
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  mt={0}
                  type="password"
                  placeholder="Password"
                  required={true}
                />
              </Flex>
              <Button
                onClick={e => signInButtonHandler(e)}
                colorScheme="gray"
                w="full"
                py={2}
                type="submit"
              >
                Sign in / Sign up
              </Button>
            </SimpleGrid>
            <Flex px={6} py={4}>
              <Button
                py={2}
                w="full"
                colorScheme="blue"
                onClick={googleSignInHandler}
                leftIcon={
                  <Icon
                    mr={1}
                    aria-hidden="true"
                    boxSize={6}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="transparent"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z" />
                  </Icon>
                }
              >
                Continue with Google
              </Button>
            </Flex>
          </Box>
          <chakra.p fontSize="xs" textAlign="center" color="gray.600">
            By signing up you agree to our{' '}
            <chakra.a color="brand.500">Terms of Service</chakra.a>
          </chakra.p>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
