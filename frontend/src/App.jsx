import ReceivedMessages from './components/ReceivedMessages';
import Chat from './components/Chat';
import SentMessages from './components/SentMessages';
import Navbar from './components/Navbar';
import { MessageProvider } from './contexts/MessageContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Room from './Pages/Room';
import { ReceivedMessageProvider } from './contexts/ReceivedMessageContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
    <MessageProvider>
    <ReceivedMessageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
    </ReceivedMessageProvider>
    </MessageProvider>
    </UserProvider>
  );
}

export default App;
