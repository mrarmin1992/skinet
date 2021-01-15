namespace Core.Entities
{
    public class Product  // kreiramo produkt koji će se preuzeti po ID
    {
        public int Id {get; set;}  // ima opciju povlačenja i skladistenja izmjena u bazu podataka
        public string Name {get; set;} // iste opcije kao u predhodnom primjeru samo sto je string tip podataka
    }
}