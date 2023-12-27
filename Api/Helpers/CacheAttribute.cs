using System.Text;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Helpers;

public class CacheAttribute : Attribute, IAsyncActionFilter
{
    private readonly int _timeToLiveSeconds;

    public CacheAttribute(int timeToLiveSeconds)
    {
        _timeToLiveSeconds = timeToLiveSeconds;
    }
    
    private string GenerateCacheKeyFromRequest(HttpRequest request)
    {
        var keyBuilder = new StringBuilder();
        keyBuilder.Append($"{request.Path}");
        foreach (var (key, value) in request.Query.OrderBy(x => x.Key))
        {
            keyBuilder.Append($"|{key}-{value}");
        }

        return keyBuilder.ToString();
    }
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        // перед тем как отправить запрос к контроллеру, выполняется следующий код, вместе с if{}
        // 1. Получаем запрос который приходит как qyery строка, затем генерируем ключ из этого запроса
        // GenerateCacheKeyFromRequest  использует путь запроса и параметры запроса для создания ключа
        var cacheService = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();
        var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
        var cacheResponse = await cacheService.GetCacheResponseAsync(cacheKey);
            // если данные закэшировались то выполняется блок ниже
        if (!string.IsNullOrEmpty(cacheResponse))
        {
            var contentResult = new ContentResult
            {
                Content = cacheResponse,
                ContentType = "application/json",
                StatusCode = 200
            };
            context.Result = contentResult;
            return;
        }

        var executedContext = await next();
        // если пришёл ответ от бд, кэшируется ответ redis
        if (executedContext.Result is OkObjectResult okObjectResult)
        {
            await cacheService.CacheResponseAsync(cacheKey, okObjectResult.Value,
                TimeSpan.FromSeconds(_timeToLiveSeconds));
        }
    }
}