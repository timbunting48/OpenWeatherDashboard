import { Grid} from "@mantine/core";
import styles from './WeatherPicture.module.css'

const zeroDegreesInKelvin: number = 273.15;

export interface IWeatherPicture{
    icon : string;
    description: string;
    temperatureInKelvin: number;
    humidityPercent: number;
    windSpeedMetersPerSec: number;
    title: string;
}

export function WeatherPicture(props: IWeatherPicture) {
    const temperatureCelsius = props.temperatureInKelvin - zeroDegreesInKelvin;
    const iconUrl: string = `http://openweathermap.org/img/w/${props.icon}.png`;   

    return(
        <Grid>
            <Grid.Col span={{ base: 12, xs: 3}} >
                <div className={styles.gridCol }>  
                <h4 className={styles.nomarginbottom}>{props.title}</h4>             
                <img src={iconUrl} alt={props.description} className={styles.imagesize}/>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }} >
                <div className={styles.gridCol}>
                    <h4 className={styles.nomarginbottom}>Temperature</h4>
                    <p className={styles.largeTextSize + ' ' + styles.nomargin}>{temperatureCelsius.toFixed(1)}&deg;</p>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }} >
                <div className={styles.gridCol}>
                <h4 className={styles.nomarginbottom}>Humidity</h4>
                <p className={styles.largeTextSize + ' ' + styles.nomargin}>{props.humidityPercent}%</p>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3 }} >
                <div className={styles.gridCol}>
                <h4 className={styles.nomarginbottom}>Wind Speed</h4>
                <p className={styles.nomargin}><span className={styles.largeTextSize}>{props.windSpeedMetersPerSec}</span><span> meters/sec</span></p>
                </div>
            </Grid.Col>
        </Grid>
    )
}