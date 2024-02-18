using Microsoft.AspNetCore.Mvc;
using WeatherDashboardApi.Models;

namespace WeatherDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController(IOpenWeatherApiHelper openWeatherApiHelper, ILogger<LocationController> logger) : ControllerBase
    {
        private readonly IOpenWeatherApiHelper _openWeatherApiHelper = openWeatherApiHelper;
        private readonly ILogger<LocationController> _logger = logger;

        [HttpGet(Name = "GetLocation")]
        public async Task<IEnumerable<CityLocation>?> Get(string city)
        {
            return await _openWeatherApiHelper.GetCityLocation(city);
        }
    }
}
