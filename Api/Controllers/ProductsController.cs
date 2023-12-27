using Api.Dtos;
using Api.Errors;
using Api.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IGenericRepository<Product> _productsRepo;
    private readonly IGenericRepository<ProductBrand> _productBrandRepo;
    private readonly IGenericRepository<ProductType> _productTypeRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productsRepo, 
        IGenericRepository<ProductBrand> productBrandRepo, 
        IGenericRepository<ProductType> productTypeRepo,
         IMapper mapper)
    {
        _productsRepo = productsRepo;
        _productBrandRepo = productBrandRepo;
        _productTypeRepo = productTypeRepo;
        _mapper = mapper;
    }
    
    
[Cache(600)]
    [HttpGet]
    public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productSpecParams)
    {
        var spec = new ProductWithTypesAndBrandsSpecification(productSpecParams);
        var countSpec = new ProductWithFilterForCountSpecification(productSpecParams);
        var totalItems = await _productsRepo.CountAsync(countSpec);
        var products = await _productsRepo.ListAsync(spec);
        var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
        return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, data));
    }
    
    [Cache(600)]
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
        var spec = new ProductWithTypesAndBrandsSpecification(id);
       var product = await _productsRepo.GetEntityWithSpec(spec);
       if (product == null) return NotFound(new ApiResponse(404));
       return _mapper.Map<Product, ProductToReturnDto>(product);

    }
    
    [Cache(600)]
    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetProductsBrands()
    {
        return Ok(await _productBrandRepo.ListAllAsync());
      
    }
    
    [Cache(600)]
    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetProductsTypes()
    {
       return Ok(await _productTypeRepo.ListAllAsync());
        
    }
}