using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
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
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()  // ( async ) Asinkroni pozivi ne blokiraju (niti čekaju) da se API poziv vrati s poslužitelja. Izvršenje se nastavlja u vašem programu, a kad se poziv vrati s poslužitelja, izvršava se funkcija "povratnog poziva".
        {
            var products =await _context.Products.ToListAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}