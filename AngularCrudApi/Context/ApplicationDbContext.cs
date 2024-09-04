using Microsoft.EntityFrameworkCore;

namespace AngularCrudApi.Context
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext( DbContextOptions<ApplicationDbContext> options ) : base(options)
        {
            
        }
      public  DbSet<objModel> StoreInfo { get; set; }    

    }
}
