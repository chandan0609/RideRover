import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Add this line to get the navigation function

  const submitHandler = () => {
    // Check if both email and password fields are not empty
    if (email.trim() !== '' && password.trim() !== '') {
      // If both fields are not empty, store the username in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify({ username, email }));
      navigate('/Hello'); // Replace '/Hello' with the actual path to the Hello component
    } else {
      // If either field is empty, you can show an error message or take other actions
      alert('Both email and password fields are required.');
    }
  };

  return (
    <VStack
      spacing="5px"
      borderRadius="8px" // Add border radius
      backgroundColor="rgba(255, 255, 255, 0.2)" // Use a semi-transparent background color
      backdropFilter="blur(8px)" // Apply a backdrop filter for a frosted glass effect
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
      padding="20px" // Add some padding
    >
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="string"
          placeholder="Enter Your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
