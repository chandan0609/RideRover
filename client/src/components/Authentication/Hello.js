import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import userData from '../../data/user';
import './Hello.css';
import {
  Box,
  Heading,
  Text,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function MapContainer({
  pickupLatitude,
  pickupLongitude,
  destinationLatitude,
  destinationLongitude,
  setDistance,
}) {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2hhbmRhbjA2MDkiLCJhIjoiY2xtZ2EzcXU1MGJ4MzNxcjJidDZmYXk5MCJ9.SH94DtMMuDRGKgGg-pbc7A';
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [pickupLongitude, pickupLatitude],
      zoom: 12,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    map.addControl(directions, 'top-left');

    directions.setOrigin([pickupLongitude, pickupLatitude]);
    directions.setDestination([destinationLongitude, destinationLatitude]);

    // Handle the route update event to get the distance
    directions.on('route', (e) => {
      if (e.route && e.route.length > 0) {
        const totalDistance = e.route[0].distance;
        const distanceInKm = (totalDistance / 1000).toFixed(2);
        setDistance(distanceInKm);
      }
    });

    // Cleanup: Remove the directions control when the component unmounts
    return () => {
      map.removeControl(directions);
      map.remove();
    };
  }, [pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude, setDistance]);

  return (
    <Box style={{ width: '50%', height: '200px', margin: 'auto', textAlign: 'center' }}>
      <Box id="map-container" style={{ width: '100%', height: '100%' }}></Box>
    </Box>
  );
}

function Hello() {
  const [rideType, setRideType] = useState('Normal');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [pickupLatitude, setPickupLatitude] = useState('40.7128');
  const [pickupLongitude, setPickupLongitude] = useState('-74.006');
  const [destinationLatitude, setDestinationLatitude] = useState('40.7128');
  const [destinationLongitude, setDestinationLongitude] = useState('-74.006');
  const [distance, setDistance] = useState('');
  const [fareCalculated, setFareCalculated] = useState(false);
  const [sharedCab, setSharedCab] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const { colorMode, toggleColorMode } = useColorMode(); 

  const handleRideTypeChange = (event) => {
    setRideType(event.target.value);
  };

  const selectRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * userData.length);
    return userData[randomIndex];
  };

  const calculateFare = () => {
    const baseFare = rideType === 'Normal' ? 7 : 10;

    try {
      const distanceInKm = parseFloat(distance);
      const currentDate = new Date();
      if (!isNaN(distanceInKm)) {
        if (distanceInKm === 0) {
          // Distance is 0.00, disable the button
          setEstimatedFare('0.00');
          setFareCalculated(false);
        } else {
          const estimatedFare = baseFare * distanceInKm;
          setEstimatedFare(estimatedFare.toFixed(2));
          setFareCalculated(true);

          localStorage.setItem('fareData', JSON.stringify({
            distance: distanceInKm,
            fare: estimatedFare.toFixed(2),
            pickupLocation: [pickupLatitude, pickupLongitude],
            destinationLocation: [destinationLatitude, destinationLongitude],
            dateTime: currentDate.toString(),
          }));
        }
      } else {
        setEstimatedFare('Distance not available');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBookRide = () => {
    if (fareCalculated) {
      navigate('/payment');
    } else {
      console.error('Cannot book ride without calculating fare.');
    }
  };

  useEffect(() => {
    if (sharedCab) {
      const user = selectRandomUser();
      setSelectedUser(user);
    }
  }, [sharedCab]);

  const handleShareCab = () => {
    if (fareCalculated) {
      if (parseFloat(distance) > 0) {
        const sharedFare = (parseFloat(estimatedFare) / 2).toFixed(2);
        if (!sharedCab) setEstimatedFare(sharedFare);
        setSharedCab(true);
  
        localStorage.setItem('fareData', JSON.stringify({
          distance: distance,
          fare: sharedFare,
          pickupLocation: [pickupLatitude, pickupLongitude],
          destinationLocation: [destinationLatitude, destinationLongitude],
        }));
      } else {
        // Display a message to the user when the distance is 0
        console.error('Cannot share ride with 0 distance.');
      }
    } else {
      console.error('Cannot share ride without calculating fare.');
    }
  };

  const handleRefresh = () => {
    navigate('/'); // Navigate to the homepage when the refresh button is clicked
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Prompt to confirm leaving the page
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Step 4: Create a function to handle sign out
  const handleSignOut = () => {
    // You can perform any sign-out logic here
    // For example, clearing user data from local storage
    localStorage.removeItem('loggedInUser');

    // Step 5: Navigate to the LandingPage component
    navigate('/');
  };

  return (
    <Box p={5} bgGradient={`linear-gradient(to bottom, ${colorMode === 'dark' ? '#1a202c' : '#D6AF20'}, ${colorMode === 'dark' ? '#1a202c' : '#D6AF20'})`} style={{ height: '160vh' }}>
      <Box textAlign="center">
        <Flex justifyContent="space-between"
        backgroundColor={"#252B43"}
  alignItems="center"
  mb={4}
  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
  borderBottom="2px solid #D6AF20"
  style={{ height: '5rem', width: '98.9vw', marginLeft: '-20px' , marginTop: '-25px'}}
    >
          <Heading as="h1" size="xl" color="white"  marginLeft={"10px"} fontFamily="Anton">
            Welcome to RideRover
          </Heading>
          {loggedInUser && (
            <Menu>
              <MenuButton as={Button} rightIcon={<i className="fas fa-caret-down" />} color="white" backgroundColor={"#252B43"}
              _hover={{
                bg: '#252B43', // Change the background color on hover
                 
              }}>
                {loggedInUser.username} {/* Display the username */}
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/account-details">
                  Profile
                </MenuItem>
                <MenuItem as={Link} to="/riding-history">
                  View Riding History
                </MenuItem>
                <MenuItem as={Link} to="/feedback">
                  Feedback
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                
              </MenuList>
            </Menu>
          )}
          <Button
          onClick={toggleColorMode}
          backgroundColor={"#252B43"}
          color={"white"}
        
       
          
        >
          Toggle Dark Mode
        </Button>
        </Flex>

        

        <Text fontSize="lg" color="white">Your Premier Ride-Sharing Service</Text>

        <FormControl mt={8}>
          <FormLabel color="white">Choose Your Ride Type</FormLabel>
          <Select value={rideType} onChange={handleRideTypeChange}>
            <option value="Normal">Normal</option>
            <option value="Premium">Premium</option>
          </Select>
        </FormControl>
        <Box mt={4}>
          <Heading as="h3" size="lg" color="white">
            Distance: {distance}
          </Heading>
        </Box>

        <Box mt={4}>
          <Text fontSize="lg" mt={10} color="white">
            Fare: Rs {estimatedFare}
          </Text>
          
        </Box>

        <Stack direction="row" spacing={4} align="center" justify="space-between" mt={35}>
  <Button onClick={calculateFare} colorScheme="teal">
    Calculate Fare
  </Button>
  <Button onClick={handleBookRide} colorScheme="teal" disabled={!fareCalculated} marginLeft={"70rem"}>
    Book Ride
  </Button>
  <Button onClick={handleShareCab} colorScheme="teal" disabled={!fareCalculated}>
    Share Ride
  </Button>
</Stack>

        <Box mt={4}>
          
          {selectedUser && (
            <Text fontSize="lg" mt={2} color="white">
              Shared with: {selectedUser.name} <br />
            </Text>
          )}
        </Box>

        <Box mt={4}>
          {/* Add the refresh button */}
        </Box>

        <Box mt={8}>
          <Heading as="h2" size="xl" mb={4} color="white">
            View Your Ride's Route on Map
          </Heading>
          <MapContainer
            pickupLatitude={pickupLatitude}
            pickupLongitude={pickupLongitude}
            destinationLatitude={destinationLatitude}
            destinationLongitude={destinationLongitude}
            setDistance={setDistance}
            
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Hello;