using Microsoft.Extensions.Caching.Memory;

namespace WeatherDashboardApi
{
    public class CachingService(IMemoryCache memoryCache) : ICachingService
    {
        private const int DEFAULTCACHEMINUTES = 30;
        private readonly IMemoryCache _memoryCache = memoryCache;
        private readonly MemoryCacheEntryOptions memoryCacheEntryOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(DEFAULTCACHEMINUTES));

        public void SetCache<T>(string key, T cacheValue)
        {
            _memoryCache.Set(key.ToLower(), cacheValue, memoryCacheEntryOptions);
        }

        public T? GetCache<T>(string key)
        {
            if (_memoryCache.TryGetValue(key.ToLower(), out T? cache))
            {
                return cache;
            }
            else
                return default;
        }


    }
}
