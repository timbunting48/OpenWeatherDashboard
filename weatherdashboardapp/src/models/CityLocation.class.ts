export class CityLocation {
    public name: string;
    public lat: number;
    public long: number;
    public state: string;
    public country: string;

    constructor(name: string)
    {
        this.name = name;
        this.lat = 0;
        this.long = 0;
        this.state = "";
        this.country = "GB";
    }
}