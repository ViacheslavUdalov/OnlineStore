using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly StoreContext _context;

    public ProductRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
        var product =  await _context.Products
            .Include(p => p.ProductType).Include(p => p.ProductBrand)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            throw new InvalidOperationException($"Product with ID {id} does not exist.");
        }

        return product;
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
        return await _context.Products.Include(p => p.ProductType).Include(p => p.ProductBrand).ToListAsync();
    }
    public async Task<IReadOnlyList<ProductBrand>> GetProductsBrandAsync()
    {
        return await _context.ProductBrands.ToListAsync();
    }
    public async Task<IReadOnlyList<ProductType>> GetProductsTypeAsync()
    {
        return await _context.ProductTypes.ToListAsync();
    }
}