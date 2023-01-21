import { Route, Routes } from 'react-router-dom';
import Authenticate from './components/Authenticate';
import Container from './components/Container';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Comparison from './pages/Comparison';
import Listing from './pages/Listing';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import Terms from './pages/Terms';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authenticate/>}>
          <Route path='/' element={<Container />}>
            <Route index element={<Home />}  />
            <Route path='/about' element={<About />}  />
            <Route path='/contact' element={<Contact />}  />
            <Route path='/profile' element={<Profile />}  />
            <Route path='/listing' element={<Listing />}  />
            <Route path='/comparison' element={<Comparison />}  />
            <Route path='/reviews' element={<Reviews />}  />
            <Route path='/terms' element={<Terms />}  />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
