import './App.css';
import { Header } from './Component/Header';
import { Navbar } from './Component/Navbar';
import { Cards } from './Component/Card';

export const App = () => {

  return (
    <div className="App">
     <Header/>
     <Navbar/>
     <Cards/>
    </div>
  );
}

export default App;
