using Microsoft.Extensions.Options;

using Newtonsoft.Json;
using WeatherDashboardApi.Models;

namespace WeatherDashboardApi
{
    public class OpenWeatherApiHelper(IOptions<AppSettings> appSettings, ILogger<OpenWeatherApiHelper> logger) : IOpenWeatherApiHelper
    {
        private readonly HttpClient _httpClient = new();
        private readonly ILogger<OpenWeatherApiHelper> _logger = logger;
        private readonly string _apiKey = appSettings.Value.ApiKey;
        private readonly int _limit = appSettings.Value.Limit;
        private const string OpenWeatherApi = "http://api.openweathermap.org";
        private const string CountryCode = "GB";

        public async Task<IEnumerable<CityLocation>?> GetCityLocation(string city)
        {
            try
            {
                var response = await _httpClient.GetStringAsync($"{OpenWeatherApi}/geo/1.0/direct?q={city},{CountryCode}&limit={_limit}&appid={_apiKey}");
                var cityLocations = JsonConvert.DeserializeObject<IEnumerable<CityLocation>>(response);
                return cityLocations;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting geolocation for city {city}", ex);
                throw;
            }
        }

        public async Task<CurrentWeather> GetCurrentWeather(double lat, double longt)
        {
            try
            {
                var response = await _httpClient.GetStringAsync($"{OpenWeatherApi}/data/2.5/weather?lat={lat}&lon={longt}&appid={_apiKey}");
                return JsonConvert.DeserializeObject<CurrentWeather>(response)!;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting weather for lat {lat} and long {longt}", ex);
                throw;
            }
        }
    }
}
