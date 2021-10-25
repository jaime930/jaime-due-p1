using System;

namespace Domain
{
    public class Guest
    {
        public Guid Id { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}