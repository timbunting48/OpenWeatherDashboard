import config from "../config/config";
import Axios, { AxiosInstance } from "axios"; 
import { CurrentWeather } from "../models/CurrentWeather.class";
import { CityLocation } from "../models/CityLocation.class";

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

    public getLocation = async() : Promise<string> => {
        try {            
            const response = await this.apiClient.get('location');
            return response.data;
        } catch (error) {
            console.error("There was an error calling the endpoint:", error);
            throw error;
        }
    }

    public setLocation = async(city: string) : Promise<string> => {
        try {
            var cityLocation = new CityLocation(city);            
            const response = await this.apiClient.post('location', cityLocation);
            return response.data;
        } catch (error) {
            console.error("There was an error calling the endpoint:", error);
            throw error;
        }
    }

    public getWeather = async(city: string) : Promise<CurrentWeather> => {
        try {
            const response = await this.apiClient.get(`weatherforecast?city=${city}`);
            const currentWeather: CurrentWeather = response.data;
            return currentWeather;
        } catch (error) {
            console.error("There was an error calling the endpoint:", error);
            throw error;
        }
    }

}