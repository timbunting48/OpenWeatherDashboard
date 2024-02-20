namespace WeatherDashboardApi
{
    public interface ICachingService
    {
        void SetCache<T>(string key, T cacheValue);
        T? GetCache<T>(string key);
    }
}
