namespace WeatherDashboardApi
{
    // This would be extended in time to be a default specific to a logged in user
    public class PersistedLocation
    {
        // Set Default
        private string _city = "Godalming";

        public string GetCity() { return _city; }
        public string SetCity(string city) { return _city = city;}
    }
}
