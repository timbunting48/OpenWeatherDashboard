namespace WeatherDashboardApi
{
    public class PersistedLocation
    {
        // Set Default
        private string _city = "Godalming";

        public string GetCity() { return _city; }
        public string SetCity(string city) { return _city = city;}
    }
}
