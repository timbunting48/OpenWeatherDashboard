import './App.css';
import { CityInput } from './components/CityInput/CityInput';
import { WeatherApiService } from './services/WeatherApiService';

function App() {

  const weatherApiService = new WeatherApiService();

  return (
    <div className="App">
        <CityInput service={weatherApiService} />
    </div>
  );
}

export default App;
