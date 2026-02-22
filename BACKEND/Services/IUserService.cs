using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmartSystem.Models;

public interface IUserService
{
    Task<User> Create(UserRegister userRegister);
    Task<User> Authenticate(UserLogin userLogin); 
    string GenerateToken(User user);
    object Login(UserLogin userLogin);
}