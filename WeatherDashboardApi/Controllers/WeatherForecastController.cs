using Microsoft.AspNetCore.Mvc;

using WeatherDashboardApi.Models;

namespace WeatherDashboardApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController(IOpenWeatherApiHelper openWeatherApiHelper, ICachingService cachingSevice, 
        ILogger<WeatherForecastController> logger) : ControllerBase
    {
        private readonly IOpenWeatherApiHelper _openWeatherApiHelper = openWeatherApiHelper;
        private readonly ICachingService _cachingSevice = cachingSevice; 
        private readonly ILogger<WeatherForecastController> _logger = logger;

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<CurrentWeather?> Get(string city)
        {
            var currentWeather = _cachingSevice.GetCache<CurrentWeather>(city);
            if (currentWeather == null)
            {
                var location = await _openWeatherApiHelper.GetCityLocation(city);
                var locationFirst = location?.FirstOrDefault();
                if (locationFirst != null)
                {
                    currentWeather = await _openWeatherApiHelper.GetCurrentWeather(locationFirst.lat, locationFirst.lon);
                    _cachingSevice.SetCache(city, currentWeather);
                }    
            }
            
            return currentWeather;
        }
    }
}
