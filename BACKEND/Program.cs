using Microsoft.EntityFrameworkCore;
using SmartSystem.Data;
using MySql.EntityFrameworkCore.Extensions;
using SmartSystem.Services;
using SmartSystem.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy => policy.WithOrigins("https://fitness-store-jade.vercel.app") 
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});

var key = Encoding.ASCII.GetBytes(builder.Configuration["Configuration:PrivateKey"] ?? "ChaveSegurancaPadraoDe32Caracteres");
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

MercadoPago.Config.MercadoPagoConfig.AccessToken = "TEST-6247168726016538-073010-da7ad956f12e2f712d036b07a4850136-522712470";
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});

builder.Services.AddOpenApi();
builder.Services.AddTransient<TokenService>();
builder.Services.AddTransient<UserService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddHttpClient();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(connectionString));

var app = builder.Build();

app.UseCors("AllowAllOrigins"); 
app.UseAuthentication();      
app.UseAuthorization();      

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.MapGet("/user", (IUserService service) => {
    return Results.Ok(new { id = 1, email = "teste@teste.com", token = "token-de-teste" });
});

app.MapPost("/register", (UserRegister userRegister, IUserService userService) => {
    var result = userService.Create(userRegister);
    return Results.Ok(result);
});

app.MapPost("/login", (UserLogin userLogin, IUserService userService) => {
    var result = userService.Login(userLogin); 
    if (result == null) return Results.Unauthorized();
    return Results.Ok(result);
});

if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();