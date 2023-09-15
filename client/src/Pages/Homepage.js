import React from 'react'
import { Container,Box,Text,Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs, } from "@chakra-ui/react";
  import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { color } from 'framer-motion';
import "./Home.css"



const Homepage = () => {
  return (
    <Box style={{background : "linear-gradient(to bottom, #FFF, #D6AF20)", height : "100vh"}}>
    <Container maxW = 'xl' centerContent   >
    <Box
    d = {"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    
    p={3}
    bg={"#e6e6fa"}
    w = "100%"
    m = "40px 0 15px 0"
    borderRadius = "lg"
    borderWidth = "1px"
    boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
    >
    <Text textAlign={"center"} fontSize={"3xl"}>Ride Rover</Text>

    </Box>
    <Box bg="#e6e6fa" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
              
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

    </Container>
    </Box>
  )
}

export default Homepage