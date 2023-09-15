import React, { useState } from 'react';
import { Box, Heading, Text, Button, Input, Center } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const AccountDetails = () => {
  // Retrieve user details from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(loggedInUser);

  const navigateToHello = () => {
    navigate('/Hello'); // Replace '/Hello' with the actual path to the Hello component
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Save the edited user details to local storage
    localStorage.setItem('loggedInUser', JSON.stringify(editedUser));
    setEditMode(false);
  };

  return (
    <Center h="100vh" backgroundColor={"#D6AF20"}>
      <Box p={5}>
        <Heading as="h1" size="2xl" mb={4}>
          Account Details
        </Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={5}
          boxShadow="lg"
          maxW="600px"  // Adjust the maximum width to make the card wider
          mx="auto"     // Center the card horizontally
        >
          {editMode ? (
            <form>
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Username:
                </Text>
                <Input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                />
              </Box>
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Email Address:
                </Text>
                <Input
                  type="text"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </Box>
              <Button mt={4} colorScheme="blue" onClick={handleSaveClick}>
                Save
              </Button>
            </form>
          ) : (
            <Box>
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Username:
                </Text>
                <Box
                  border="1px solid #ccc"
                  borderRadius="lg"
                  p={2}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {loggedInUser.username}
                </Box>
              </Box>
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Email Address:
                </Text>
                <Box
                  border="1px solid #ccc"
                  borderRadius="lg"
                  p={2}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {loggedInUser.email}
                </Box>
              </Box>
              <Button mt={4} colorScheme="blue" onClick={handleEditClick}>
                Edit
              </Button>
            </Box>
          )}
        </Box>
        <Button mt={4} colorScheme="blue" onClick={navigateToHello}>
          Go Back to Hello
        </Button>
      </Box>
    </Center>
  );
};

export default AccountDetails;
