using Microsoft.AspNetCore.Mvc;

using WeatherDashboardApi.Models;

namespace WeatherDashboardApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController(IOpenWeatherApiHelper openWeatherApiHelper, ILogger<WeatherForecastController> logger) : ControllerBase
    {
        private readonly IOpenWeatherApiHelper _openWeatherApiHelper = openWeatherApiHelper;
        private readonly ILogger<WeatherForecastController> _logger = logger;

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<CurrentWeather> Get(double lat, double longt)
        {
            return await _openWeatherApiHelper.GetCurrentWeather(lat, longt);
        }
    }
}
