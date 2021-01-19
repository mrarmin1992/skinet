using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers  // prikazuje gdje se nalaze klase 
{
    [ApiController]
    [Route("api/[controller]")]   // putanja
    public class ProductsController : ControllerBase // public klase zato da se motode ove klase mogu koristiti
                                                     // ControllBase predstavlja bazu poznatih controllera-a, koja se ukljucuje koristenjem Microsoft.AspNetCore.Mvc
    {
        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()  // ( async ) Asinkroni pozivi ne blokiraju (niti čekaju) da se API poziv vrati s poslužitelja. Izvršenje se nastavlja u vašem programu, a kad se poziv vrati s poslužitelja, izvršava se funkcija "povratnog poziva".
        {
            var products = await _repo.GetProductsAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _repo.GetProductByIdAsync(id);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _repo.GetProductBrandsAsync());
        }

             [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _repo.GetProductTypesAsync());
        }
    }
}