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
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.Run();