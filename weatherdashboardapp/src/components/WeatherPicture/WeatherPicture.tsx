import { Grid} from "@mantine/core";

const zeroDegreesInKelvin: number = 273.15;

export interface IWeatherPicture{
    icon : string;
    description: string;
    temperatureInKelvin: number;
    humidityPercent: number;
    windSpeedMetersPerSec: number;
}

export function WeatherPicture(props: IWeatherPicture) {
    const temperatureCelsius = props.temperatureInKelvin - zeroDegreesInKelvin;
    const iconUrl: string = `http://openweathermap.org/img/w/${props.icon}.png`;   

    return(
        <Grid>
            <Grid.Col span={{ base: 12, xs: 3}}>                
                <img src={iconUrl} alt={props.description}/>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }}>
                <p>Temperature</p>
                <p>{temperatureCelsius}&deg;</p>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }}>
                <p>Humidity</p>
                <p>{props.humidityPercent}%</p>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }}>
                <p>Wind Speed</p>
                <p>{props.windSpeedMetersPerSec} meters/sec</p>
            </Grid.Col>
        </Grid>
    )
}