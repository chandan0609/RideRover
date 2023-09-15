import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
//import theme from './theme'; // Import your Chakra UI theme
import Hello from './components/Authentication/Hello';
import Login from './components/Authentication/Login';
import RidingHistory from './components/Authentication/RidingHistory';
import Payment from './components/Authentication/Payment';
import Homepage from './Pages/Homepage';
import AccountDetails from './components/Authentication/AccountDetails';
import LandingPage from './Pages/LandingPage';
import Signuppage from './Pages/Signuppage';
import Feedback from './components/Authentication/Feedback';

const App = () => {
  return (
   <ChakraProvider > {/* Provide the Chakra UI theme */}
   <div>
      <Router>
        <Routes>
          <Route path="/hello" element={<Hello />} />
          <Route path="/riding-history" element={<RidingHistory />}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/account-details" element={<AccountDetails/>}/>
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Signuppage" element={<Signuppage />} />
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
   </div>
   </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
