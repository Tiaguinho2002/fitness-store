using Microsoft.EntityFrameworkCore;
using SmartSystem.Data;
using MySql.EntityFrameworkCore.Extensions;
using SmartSystem.Services;
using SmartSystem.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy => policy
            .WithOrigins(
                "https://fitness-store-jade.vercel.app",
                "http://localhost:5173"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

MercadoPago.Config.MercadoPagoConfig.AccessToken = 
    builder.Configuration["MercadoPago:AccessToken"] 
    ?? "TEST-6247168726016538-073010-da7ad956f12e2f712d036b07a4850136-522712470";

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = 
            System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddOpenApi();
builder.Services.AddTransient<TokenService>();
builder.Services.AddTransient<UserService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddHttpClient();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(connectionString!));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapGet("/user", (IUserService service) => 
{
    var newUser = new User 
    { 
        Id = 1,
        Email = "teste@teste.com",
        PasswordHash = "hashed_password",
        Roles = new[] { "student", "premium" }
    };
    return newUser;
});

app.MapPost("/register", async (UserRegister userRegister, IUserService userService) =>
{
    var result = await userService.Create(userRegister);
    
    if (result == null)
        return Results.Conflict(new { message = "E-mail já está em uso." });

    // Retorna apenas o necessário, sem expor PasswordHash
    return Results.Ok(new { 
        id = result.Id, 
        email = result.Email,
        token = "" // adicione token aqui se quiser gerar JWT no registro
    });
});

app.MapPost("/login", async (UserLogin userLogin, IUserService userService) =>
{
    var result = await userService.Authenticate(userLogin);

    if (result == null)
        return Results.Unauthorized();

    return Results.Ok(new { 
        id = result.Id, 
        email = result.Email,
        token = "" // adicione token aqui
    });
});

app.MapControllers();

app.Run();