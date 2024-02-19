import { useEffect, useState } from "react";
import { WeatherApiService } from "../../services/WeatherApiService";
import { CityLocation } from "../../models/CityLocation.class";
import { CurrentWeather } from "../../models/CurrentWeather.class";
import { WeatherPicture } from "../WeatherPicture/WeatherPicture";
import { Container, Grid } from "@mantine/core";

export interface ICityInputProps{
    service : WeatherApiService;
}

export function CityInput(props: ICityInputProps) {
    const [weatherIcon, setWeatherIcon] = useState('');
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [temperature, setTemperature] = useState(0);
    
    useEffect(() => {
       
    }, []); 

    const onSelected = (e: any) => {
        e.preventDefault();
        const city = e.target.cityName.value;
        if (city.length > 0) {
            props.service.getLocation(city).then((data: CityLocation[]) => {
                let cities = data;
                if (cities.length > 0) {
                    props.service.getWeather(cities[0].lat!, cities[0].long!).then((data: CurrentWeather) => {
                        if (data.weather!.length > 0) {
                            setWeatherIcon(data.weather![0].icon!);
                            setDescription(data.weather![0].description!);
                            setHumidity(data.main.humidity!);
                            setTemperature(data.main.temp!);
                            setWindSpeed(data.wind!.speed!);
                        }
                    })
                }
            });
        }
    };

    return(
        <Container>
            <Grid>
                <Grid.Col>
                    <form method="post" onSubmit={onSelected}>
                        <p>Enter city:</p>
                        <input type="text" name="cityName"></input>
                        <button type="submit">Find Weather</button>
                    </form>
                </Grid.Col>
            </Grid>            
            <WeatherPicture icon={weatherIcon} description={description} temperatureInKelvin={temperature} humidityPercent={humidity} windSpeedMetersPerSec={windSpeed}/>
        </Container>
    )
}