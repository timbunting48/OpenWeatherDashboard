using Microsoft.Extensions.Logging;

using Moq;

using WeatherDashboardApi;
using WeatherDashboardApi.Controllers;
using WeatherDashboardApi.Models;

namespace WeatherDashboardApiTests
{
    public class LocationControllerTests
    {
        [Fact]
        public async Task Controller_Returns_CityLocationArray()
        {
            // Arrange
            var expectedResult = new List<CityLocation>
            {
                new() {name = "Farncombe"},
                new() {name = "Farnham"}
            };
            var mockHelper = new Mock<IOpenWeatherApiHelper>();
            mockHelper.Setup(m => m.GetCityLocation(It.IsAny<string>())).ReturnsAsync(expectedResult);
            var controller = new LocationController(mockHelper.Object, Mock.Of<ILogger<LocationController>>());

            // Act
            const string city = "Farn";
            var result = await controller.Get(city);

            // Assert
            Assert.Same(expectedResult, result);
            mockHelper.Verify(m => m.GetCityLocation(It.Is<string>(s => s == city)));
        }
    }
}