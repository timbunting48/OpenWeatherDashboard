using Microsoft.Extensions.Options;

using WeatherDashboardApi;


IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .AddEnvironmentVariables()
                            .Build();

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<AppSettings>(configuration.GetSection("AppSettings"));
builder.Services.AddSingleton(cfg => cfg.GetService<AppSettings>()!);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<IOpenWeatherApiHelper, OpenWeatherApiHelper>();
builder.Services.AddSingleton<PersistedLocation>();
builder.Services.AddSingleton<ICachingService, CachingService>();
builder.Services.AddMemoryCache();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("MyPolicy");

app.Run();