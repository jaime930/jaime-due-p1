using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Guest> Guests { get ; set; }

        public DataContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}