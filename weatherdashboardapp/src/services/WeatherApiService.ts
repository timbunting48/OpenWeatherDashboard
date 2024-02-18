import config from "../config/config";
import { CityLocation } from "../models/CityLocation.class";
import Axios, { AxiosInstance } from "axios"; 
import { CurrentWeather } from "../models/CurrentWeather.class";

export class WeatherApiService {

    private apiClient: AxiosInstance = Axios.create({
        baseURL: config.apiUrl,
        responseType: "json",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 1000 * 60,
      }); 
    
    
    public getLocation = async(city: string) : Promise<Array<CityLocation>> => {
        try {
            const response = await this.apiClient.get(`location?city=${city}`);
            const locations: Array<CityLocation> = response.data;
            return locations;
        } catch (error) {
            console.error("There was an error calling the endpoint:", error);
            throw error;
        }
    }

    public getWeather = async(lat: number, long: number) : Promise<CurrentWeather> => {
        try {
            const response = await this.apiClient.get(`weatherforecast?lat=${lat}&long=${long}`);
            const currentWeather: CurrentWeather = response.data;
            return currentWeather;
        } catch (error) {
            console.error("There was an error calling the endpoint:", error);
            throw error;
        }
    }

}