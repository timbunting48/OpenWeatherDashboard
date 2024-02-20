using Microsoft.Extensions.Logging;

using Moq;

using WeatherDashboardApi;
using WeatherDashboardApi.Controllers;
using WeatherDashboardApi.Models;

namespace WeatherDashboardApiTests
{
    public class WeatherForecastControllerTests
    {
        [Fact]
        public async Task Controller_Returns_CityLocationArray()
        {
            // Arrange
            var cities = new List<CityLocation>
            {
                new() {name = "Farncombe", lat = 54.6, lon = -0.4},
                new() {name = "Farnham"}
            };
            var expectedWeather = new CurrentWeather
            {
                main = new Main
                {
                    humidity = 56,
                    temp = 289
                },
                weather =
                [
                    new() { main = "Cloud", icon = "06Y"}
                ]
            };
            var mockHelper = new Mock<IOpenWeatherApiHelper>();
            mockHelper.Setup(m => m.GetCityLocation(It.IsAny<string>())).ReturnsAsync(cities);
            mockHelper.Setup(m => m.GetCurrentWeather(It.IsAny<double>(), It.IsAny<double>())).ReturnsAsync(expectedWeather);

            var mockCachingService = new Mock<ICachingService>();
            var controller = new WeatherForecastController(mockHelper.Object, mockCachingService.Object, Mock.Of<ILogger<WeatherForecastController>>());

            // Act
            const string city = "Farn";
            var result = await controller.Get(city);

            // Assert
            Assert.Same(expectedWeather, result);
            mockHelper.Verify(m => m.GetCityLocation(It.Is<string>(s => s == city)));
            mockHelper.Verify(m => m.GetCurrentWeather(It.Is<double>(l => l == cities.First().lat),
                It.Is<double>(l => l == cities.First().lon)));
            mockCachingService.Verify(m => m.GetCache<CurrentWeather>(It.Is<string>(m => m == city)));
        }
    }
}