using WeatherDashboardApi.Models;

namespace WeatherDashboardApi
{
    public interface IOpenWeatherApiHelper
    {
        Task<IEnumerable<CityLocation>?> GetCityLocation(string city);
        Task<CurrentWeather> GetCurrentWeather(double lat, double longt);
    }
}
