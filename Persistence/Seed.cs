using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence 
{
    public class Seed {
        public static void SeedData(DataContext context) {
            if (context.Guests.Count() == 0) {
                List < Guest > seedGuests = new List < Guest > {
                    new Guest() {
                        FName = "Jean-Luc", LName = "Picard", Comment = "Had a lovely time.  Congratulations!"
                    },
                    new Guest() {
                        FName = "James", LName = "Baxter", Comment = "A beautiful wedding.  Blessings to you and your future together."
                    },
                    new Guest() {
                        FName = "Buju", LName = "Banton", Comment = "A wonderful night and a wonderful couple.  Cheers!"
                    },
                };

                context.Guests.AddRange(seedGuests);

                context.SaveChanges();
            }
        }
    }
}