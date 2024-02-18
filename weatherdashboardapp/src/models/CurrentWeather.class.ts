export class CurrentWeather {
    public main: Main = new Main();
    public weather: Weather[] | undefined
}

export class Weather {
    public main: string | undefined;
    public description: string | undefined;
    public icon: string | undefined;
}

export class Main {
    public temp: number | undefined;
    public humidity: number | undefined
}