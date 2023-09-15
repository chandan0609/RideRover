import React from 'react';
import {
  Box,
  Button,
  Text,
  UnorderedList,
  ListItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLoginClick = () => {
    navigate('/Homepage');
  };

  const handleSignupClick = () => {
    navigate('/Signuppage');
  };

  const buttonSize = isMobile ? 'lg' : '10px';

  return (
    <Box
      position="relative"
      backgroundImage={`url("https://i.ibb.co/PrQCZFz/Untitled.png")`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="left center"
      backgroundColor="#D6AF20"
      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.2)"
      borderRadius="8px"
      backdropFilter="blur(8px)"
    >
      <img
        src="https://i.ibb.co/x31SYTh/Purple-Badge-Car-Wash-Logo.png"
        alt="Logo"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '100px',
          borderRadius: '50%',
        }}
      />
      <Text
        position="absolute"
        top="8rem"
        right="8rem"
        fontSize={useBreakpointValue({ base: '5xl', md: '8xl' })}
        fontWeight="bold"
        color="black"
        fontFamily="Anton"
        textAlign={isMobile ? 'center' : 'right'}
      >
        Ride Rover
      </Text>
      <UnorderedList
        position="absolute"
        top="17rem"
        right="8rem"
        listStyleType="circle"
        fontWeight="bold"
        color="white"
        fontSize="xl"
        textAlign={isMobile ? 'center' : 'right'}
      >
        <ListItem>Budget Friendly</ListItem>
        <ListItem>Trustworthy And Reliable</ListItem>
      </UnorderedList>
      <Button
        position="absolute"
        backgroundColor={"#252B43"}
        color={"white"}
        size={buttonSize}
        fontSize={useBreakpointValue({ base: 'xl', md: '3xl', lg: '4xl' })}
        padding="16px 32px"
        _hover={{
          bg: 'black.400',
          color: 'white',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
        onClick={handleLoginClick}
        bottom={"70"}
        right="auto"
        left="65%"
      >
        Login
      </Button>
      <Button
        position="absolute"
        backgroundColor={"#252B43"}
        color={"white"}
        size={buttonSize}
        fontSize={useBreakpointValue({ base: 'xl', md: '3xl', lg: '4xl' })}
        padding="16px 32px"
        _hover={{
          bg: 'black.400',
          color: 'white',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
        onClick={handleSignupClick}
        bottom={"70"}
        right="auto"
        left="80%"
      >
        Signup
      </Button>
    </Box>
  );
};

export default LandingPage;
