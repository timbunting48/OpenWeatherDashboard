import { useCallback, useEffect, useState } from "react";
import { WeatherApiService } from "../../services/WeatherApiService";
import { CurrentWeather } from "../../models/CurrentWeather.class";
import { WeatherPicture } from "../WeatherPicture/WeatherPicture";
import { Container, Grid } from "@mantine/core";

export interface ICityInputProps{
    service : WeatherApiService;
}

export function CityInput(props: ICityInputProps) {
    const [firstTime, setFirstTime] = useState(true);
    const [cityName, setCityName] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [weatherData, setWeatherData] = useState<CurrentWeather | undefined>(new CurrentWeather());
    const [noResults, setNoResults] = useState(false);
    const [errorInService, setErrorInService] = useState(false);    
    const [checkboxChecked, setCheckboxChecked] = useState(true); 
    const [checkboxHidden, setCheckBoxHidden] = useState(true);

    const noResultsMessage: string = "City not found. Check spelling and try again."
    const errorResultsMessage: string = "Unable to get weather information at this time. Please try later."

    const getWeatherFromCity = useCallback((city: string) => {
        props.service.getWeather(city).then((data: CurrentWeather) => {
            setWeatherData(data);  
            setErrorInService(false);   
            setCheckBoxHidden(false);          
        }).catch(() => setErrorInService(true))
    }, [props.service]);

    const getWeatherData = useCallback((city: string | undefined) => {        
        if (city === undefined) {
            props.service.getLocation().then((data: string) => {
                city = data;
                setCityName(city);
                getWeatherFromCity(city);
            }).catch(() => setErrorInService(true))
        } else {
            getWeatherFromCity(city);
        }        
    }, [props.service, getWeatherFromCity] )    
    
    useEffect(() => {
       if (firstTime) {
        getWeatherData(undefined);
        setFirstTime(false);
       } 
       if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
        setNoResults(false);
        setCheckBoxHidden(false);
        setTitle(weatherData.weather![0].main!);
        setWeatherIcon(weatherData.weather![0].icon!);
        setDescription(weatherData.weather![0].description!);
        setHumidity(weatherData.main.humidity!);
        setTemperature(weatherData.main.temp!);
        setWindSpeed(weatherData.wind!.speed!);
       } else {
        setNoResults(true);
       }
    }, [weatherData, firstTime, getWeatherData]); 

    const onSelected = (e: any) => {
        e.preventDefault();
        const city = e.target.cityName.value;
        if (city.length > 0) {
            getWeatherData(city);   
        } else {
            setWeatherData(undefined);
        }
    };    

    const onCityChange = (e: any) => {
        e.preventDefault();
        var city = e.value;
        if (!city) {
            city = e.target.value;
        }
        setCityName(city);
        setCheckBoxHidden(true);
        setCheckboxChecked(false);
    }


    const setDefaultCity = () => {
        props.service.setLocation(cityName).then(() =>{
            setCheckboxChecked(true);
        })
    }

    return(
        <Container>
            <Grid>
                <Grid.Col>
                    <div>
                    <form method="post" onSubmit={onSelected}>
                        <p>Enter city:</p>
                        <input type="text" name="cityName" value={cityName} onChange={onCityChange}></input>
                        <span>&nbsp;</span>
                        <button type="submit">Find Weather</button> 
                        <span>&nbsp;Set As Default?&nbsp;</span>   
                        <input type="checkbox" checked={checkboxChecked} disabled={checkboxHidden} onChange={setDefaultCity}></input>
                                            
                    </form>                    
                    </div>
                </Grid.Col>
            </Grid>
            <br/>
            <br/>
            {noResults || errorInService
            ? <div><p>{errorInService ? errorResultsMessage : noResultsMessage}</p></div>     
            : <WeatherPicture icon={weatherIcon} description={description} temperatureInKelvin={temperature} humidityPercent={humidity} windSpeedMetersPerSec={windSpeed} title={title}/>}
        </Container>
    )
}