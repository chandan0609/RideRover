import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Flex, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function RidingHistory() {
  // Initialize ride history data from local storage
  const storedRideHistory = JSON.parse(localStorage.getItem('rideHistory')) || [];
  const [rideHistory, setRideHistory] = useState(storedRideHistory);

  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Retrieve payment data from local storage
    const storedPaymentData = JSON.parse(localStorage.getItem('paymentData'));

    if (storedPaymentData) {
      // Clear payment data from local storage to prevent it from being added again
      localStorage.removeItem('paymentData');

      // Add new payment data to ride history
      const updatedRideHistory = [...rideHistory, storedPaymentData];
      setRideHistory(updatedRideHistory);

      // Store updated ride history data in local storage
      localStorage.setItem('rideHistory', JSON.stringify(updatedRideHistory));
    }
  }, [storedRideHistory, rideHistory]); // Empty dependency array to run this effect only once

  const handleGoToHello = () => {
    navigate('/hello'); // Navigate to the hello.js component
  };

  return (
   
    <Box p={10} bgGradient="linear-gradient(to bottom, #D6AF20, #D6AF20)"
    minHeight="100vh" // Ensure the container takes up the full viewport height
    >
     <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="2xl">
          Riding History
        </Heading>
        <Button onClick={handleGoToHello} colorScheme="teal">
          Go to Home
        </Button>
      </Flex>
      <Text fontSize="lg">Display the user's riding history here.</Text>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }} backgroundColor={"#252B43"}>Date & time</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }} backgroundColor={"#252B43"}>Distance (km)</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }} backgroundColor={"#252B43"}>Fare (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {rideHistory.map((ride, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                {new Date(ride.dateTime).toLocaleString()}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{ride.distance}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{ride.fare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
    
  );
}

export default RidingHistory;
