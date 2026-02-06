using System;
using Xunit;
using FluentAssertions;
using SmartSystem.Models;

namespace TestProject;

public class BasicUserTest
{
    [Fact]
    public void User_ShouldHaveValidEmail()
    {
        // Arrange
        var user = new User 
        { 
            Id = 1, 
            Email = "test@example.com",
            PasswordHash = "hashed_password"
        };

        // Act
        var result = user.Email;

        // Assert
        result.Should().Be("test@example.com");
    }

    [Fact]
    public void User_EmailShouldNotBeEmpty()
    {
        // Arrange
        var user = new User 
        { 
            Id = 2,
            Email = "admin@system.com",
            PasswordHash = "secure_hash"
        };

        // Act & Assert
        user.Email.Should().NotBeEmpty();
        user.Email.Should().Contain("@");
        user.Email.Should().EndWith(".com");
    }

    [Fact]
    public void User_PasswordHashShouldBeValid()
    {
        // Arrange
        var user = new User 
        { 
            Id = 3,
            Email = "user@test.com",
            PasswordHash = "super_secure_hash_12345"
        };

        // Act & Assert
        user.PasswordHash.Should().NotBeNullOrEmpty();
        user.PasswordHash.Length.Should().BeGreaterThan(5);
        user.Id.Should().Be(3);
    }
}


