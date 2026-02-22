using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using SmartSystem.Data;
using SmartSystem.Models;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public UserService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<User> Create(UserRegister userRegister)
    {
        if (await _context.Users.AnyAsync(u => u.Email == userRegister.Email))
        {
            return null; // 
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(userRegister.Password);

        var user = new User
        {
            Email = userRegister.Email,
            PasswordHash = passwordHash
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<User> Authenticate(UserLogin userLogin)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == userLogin.Email);

        if (user == null)
        {
            return null;
        }


        if (!BCrypt.Net.BCrypt.Verify(userLogin.Password, user.PasswordHash))
        {
            return null;
        }

        return user;
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public object Login(UserLogin userLogin)
    {
        throw new NotImplementedException();
    }
}

