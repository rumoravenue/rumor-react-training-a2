import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { CountryPage } from './CountryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:countryCode" element={<CountryPage />} />
      </Routes>
    </Router>
  );
};

export default App;



