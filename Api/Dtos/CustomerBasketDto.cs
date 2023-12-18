using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Api.Dtos;

public class CustomerBasketDto
{
    [Required]
    public string Id { get; set; }
    public List<BasketItem> Items { get; set; }
}