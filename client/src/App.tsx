import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;