using Microsoft.AspNetCore.Mvc;

using WeatherDashboardApi.Models;

namespace WeatherDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController(PersistedLocation persistedLocation, 
        ILogger<LocationController> logger) : ControllerBase
    {
        private readonly PersistedLocation _persistedLocation = persistedLocation;
        private readonly ILogger<LocationController> _logger = logger;

        [HttpGet(Name = "GetLocation")]
        public string Get()
        {
            return _persistedLocation.GetCity();
        }

        [HttpPost(Name ="SaveLocation")]
        public string Save([FromBody] CityLocation citylocation)
        {
            _persistedLocation.SetCity(citylocation.name);
            return citylocation.name;
        }
    }    
}
