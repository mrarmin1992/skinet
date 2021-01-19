namespace Core.Entities
{
    public class Product : BaseEntity // kreiramo produkt koji će se preuzeti po ID
    {
     // ima opciju povlačenja i skladistenja izmjena u bazu podatak
        public string Name {get; set;} // iste opcije kao u predhodnom primjeru samo sto je string tip podataka
        public string Description {get; set;}
        public decimal Price { get; set;}
        public string MyProperty {get; set;}
        public string PictureUrl { get; set;}
        public ProductType ProductType { get; set;}
        public int ProductTypeId { get; set;}
        public ProductBrand ProductBrand {get; set;}
        public int ProductBrandId { get; set;}
        
    }
}