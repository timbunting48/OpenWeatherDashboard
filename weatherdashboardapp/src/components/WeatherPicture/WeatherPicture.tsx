
export interface IWeatherPicture{
    icon : string;
    description: string;
}

export function WeatherPicture(props: IWeatherPicture) {

    const iconUrl: string = `http://openweathermap.org/img/w/${props.icon}.png`;
    return(
        <div>
            <img src={iconUrl} alt={props.description}/>
        </div>
    )
}