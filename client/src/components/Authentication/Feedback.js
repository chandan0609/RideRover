import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  IconButton,
  Button,
  Flex,
  Textarea,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Feedback = () => {
  const [driverRating, setDriverRating] = useState(0);
  const [rideRating, setRideRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const navigate = useNavigate();

  const handleDriverRatingChange = (value) => {
    setDriverRating(value);
  };

  const handleRideRatingChange = (value) => {
    setRideRating(value);
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const canSubmitFeedback = driverRating > 0 && rideRating > 0 && feedbackText.length <= 100;

  const handleSubmitFeedback = async () => {
    
      // Prepare the data to send via email
      if (canSubmitFeedback) {
        // Perform the feedback submission logic here
        alert('Your feedback has been submitted successfully.');
        navigate('/hello');
      } else {
        alert('Please select ratings for both the driver and ride experience.');
      }
  };

  return (
    <Flex p={5} bgGradient="linear-gradient(to bottom, #D6AF20, #D6AF20)" justify="center" align="center" minH="100vh">
      <Box
        p={5}
        maxW="400px"
        mx="auto"
        my="auto" // Center the feedback form vertically
        border="1px solid #ccc"
        borderRadius="8px"
        bgColor="#FFFFFF" // Change the background color of the box
        textAlign="center"
      >
        <Heading as="h2" fontSize="xl" color="#D6AF20">
          Feedback
        </Heading>
        <Stack spacing={4} mt={4}>
          <Box>
            <Text fontSize="lg">
              Rate the Driver:
            </Text>
            <Stack direction="row" spacing={1}>
              {[1, 2, 3, 4, 5].map((value) => (
                <IconButton
                  key={`driver-star-${value}`}
                  aria-label={`Rate ${value} star`}
                  icon={<StarIcon />}
                  colorScheme={value <= driverRating ? 'teal' : 'gray'}
                  onClick={() => handleDriverRatingChange(value)}
                />
              ))}
            </Stack>
          </Box>
          <Box>
            <Text fontSize="lg">
              Rate the Ride Experience:
            </Text>
            <Stack direction="row" spacing={1}>
              {[1, 2, 3, 4, 5].map((value) => (
                <IconButton
                  key={`ride-star-${value}`}
                  aria-label={`Rate ${value} star`}
                  icon={<StarIcon />}
                  colorScheme={value <= rideRating ? 'teal' : 'gray'}
                  onClick={() => handleRideRatingChange(value)}
                />
              ))}
            </Stack>
          </Box>
          <Box>
            <Text fontSize="lg">
              Write your feedback (max 100 words):
            </Text>
            <Textarea
              value={feedbackText}
              onChange={handleFeedbackTextChange}
              placeholder="Write your feedback here..."
              size="sm"
              maxLength={100}
            />
          </Box>
        </Stack>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={handleSubmitFeedback}
          _hover={{ bg: 'teal.600' }}
          isDisabled={!canSubmitFeedback}
        >
          Submit Feedback
        </Button>
      </Box>
    </Flex>
  );
};

export default Feedback;
