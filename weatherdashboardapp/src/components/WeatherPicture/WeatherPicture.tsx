import { Grid} from "@mantine/core";
import styles from './WeatherPicture.module.css'

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
            <Grid.Col span={{ base: 12, xs: 3}} >
                <div className={styles.gridCol}>               
                <img src={iconUrl} alt={props.description} className={styles.margintop1em}/>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }} >
                <div className={styles.gridCol}>
                    <p>Temperature</p>
                    <p>{temperatureCelsius}&deg;</p>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }} >
                <div className={styles.gridCol}>
                <p>Humidity</p>
                <p>{props.humidityPercent}%</p>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }} >
                <div className={styles.gridCol}>
                <p>Wind Speed</p>
                <p>{props.windSpeedMetersPerSec} meters/sec</p>
                </div>
            </Grid.Col>
        </Grid>
    )
}