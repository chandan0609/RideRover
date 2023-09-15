import React from 'react';
import { Box, Heading, Text, Button ,Flex} from '@chakra-ui/react';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast } from 'react-toastify';

function Payment() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const onToken = (token) => {
    // Store payment data in local storage
    const paymentData = JSON.parse(localStorage.getItem('fareData')) || {};
    paymentData.token = token;
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    console.log(token);

    // Show toast for successful payment
    alert('Payment successful! Your ride has been booked.', {
      autoClose: 5000,
    });

    // Redirect to the Hello page after successful payment
    navigate('/hello'); // Use useNavigate to navigate to the Hello page
  };

  return (
    <Flex p={5} bgGradient="linear-gradient(to bottom, #D6AF20, #D6AF20)" justify="center" align="center" minH="100vh">
    <Box textAlign="center">
      <Heading as="h1" size="2xl" mb={4}>
        Payment Page
      </Heading>
      <Text fontSize="lg">Please complete your payment below.</Text>
      <Box mt={4}>
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51NpkoNSHmwkU5GjN1QVkw2UeeHk7hsD7ZeZhi2kFrY2iAV8IlhmU9tiCpwNgfbwMPyEfWheuu59wbFBUdR7a5c7L00tIVkMR9d"
        />
      </Box>
    </Box>
  </Flex>
  );
}

export default Payment;
