using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext  // DbContext predstavlja kombinaciju uzoraka jedinice rada i spremišta tako da se može koristiti za postavljanje upita iz baze podataka i grupiranje promjena koje će se zatim zapisati natrag u spremište kao jedinica
                                           // postavljamo ubite baze podataka itd.... desnim klikom i odlaskom na opciju go to definition prikazat će nam neke osnovne podatke u vezi DB Contexta
    {
        // kreiramo konstruktor klase na slijedeći način tako sto cemo koristit opcije koje će upotrijebiti iz baznih opcija, StoreContext je tip opcije koju ćemo koristiti
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)   
        {

        }
        // metode koje ćemo koristiti pod nazivom Products
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands {get; set;}
        public DbSet<ProductType> ProductTypes {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
