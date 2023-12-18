using Api.Extensions;
using Api.Helpers;
using Api.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddControllers();
            services.AddDbContext<StoreContext>(x =>
                x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<AppIdentityDbContext>(x =>
            {
                x.UseSqlite(_configuration.GetConnectionString("IdentityConnection"));
            });
            // обязательно нужно кроме ConnectionMultiplexer внедрить и его интерфейс, иначе будет выдавать ошибку
            // Unhandled exception. System.AggregateException: Some services are not able to be constructed (Error
            // while validating the service descriptor 'ServiceType: Core.Interfaces.IBasketRepository Lifetime:
            // Scoped ImplementationType: Infrast ructure.Data.BasketRepository': Unable to resolve service for
            // type 'StackExchange.Redis.IConnectionMultiplexer' while attempting to activate 'Infrastructure.Data.BasketRepository'.)
            services.AddSingleton<IConnectionMultiplexer, ConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"),
                    true);
                return ConnectionMultiplexer.Connect(configuration);
            });
            services.AddApplicationServices();
            services.AddIdentityService(_configuration);
            services.AddSwaggerDocumentation();
            services.AddCors(opt =>
                {
                    opt.AddPolicy("CorsPolicy",
                        policy => { policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:4200"); });
                }
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwaggerDocumentation();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}