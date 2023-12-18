using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public class BasketItemDto
{

    [Required]
    public int Id { get; set; }
    
    [Required]
    public string ProductName { get; set; }
    
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater 0")]
    public decimal Price { get; set; }

    public void SetPrice(decimal value)
    {
        if ((double)value < 0.1)
        {
            throw new ArgumentException("Price must be greater 0");
        }
    
        this.Price = value;
    }
    
    [Required]
    [Range(1, double.MaxValue, ErrorMessage = "Quantity must be at least 1")]
    public int Quantity { get; set; }
    public void SetQuantity(int value)
    {
        if (value < 1)
        {
            throw new ArgumentException("Price must be greater 0");
        }   
    
        this.Quantity = value;
    }
    
    [Required]
    public string PictureUrl { get; set; }
    
    [Required]
    public string Brand { get; set; }
    
    [Required]
    public string Type { get; set; }
}