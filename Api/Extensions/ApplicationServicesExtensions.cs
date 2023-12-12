using System.Linq;
using Api.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.SeedData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var errors = context.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();
                var errorResponse = new ApiValidationErrorResponse
                {
                    Errors = errors
                };
                return new BadRequestObjectResult(errorResponse);
            };
        });
        return services;
    }
}