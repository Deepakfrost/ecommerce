
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDetails from './components/CardDetails';
import { Routes, Route } from 'react-router-dom';
import CardList from './components/CardList';
import Billng from './components/Billng';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<CardList />} />
        <Route path='/details/:id' element={<CardDetails />} />
        <Route path='/billing' element={<Billng />} />
      </Routes>
    </div>
  );
}

export default App;
