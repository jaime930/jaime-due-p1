using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class GuestsController : ControllerBase
    {
        private readonly DataContext context;
        public GuestsController(DataContext context) => this.context = context;
      
        /// <summary>
        /// GET api/guests
        /// </summary>
        /// <returns>A list of guests</returns>
        [HttpGet]
        public ActionResult<List<Guest>> Get()
        {
            return this.context.Guests.ToList();
        }
        
        /// <summary>
        /// GET api/guest[id]
        /// </summary>
        /// <param name="id">Guest id</param>
        /// <returns>A single guest</returns>
        [HttpGet("{id}")]
        public ActionResult<Guest> GetById(Guid id)
        {
            return this.context.Guests.Find(id);
        }

        /// <summary>
        /// POST api/guest
        /// </summary>
        /// <param name="request">JSON request containing guest fields</param>
        /// <returns>A new guest</returns>
        [HttpPost]
        public ActionResult<Guest> Create([FromBody]Guest request)
        {
            var guest = new Guest
            {
                Id = request.Id,
                FName = request.FName,
                LName = request.LName,
                Comment = request.Comment,
                Date = request.Date
            };

            context.Guests.Add(guest);
            var success = context.SaveChanges() > 0;

            if (success)
            {
                return guest;
            }

            throw new Exception("Error creating guest entry");
        }

        /// <summary>
        /// PUT api/put
        /// </summary>
        /// <param name="request">JSON request containing one or more updated guest fields</param>
        /// <returns>An updated guest</returns>
        [HttpPut]
        public ActionResult<Guest> Update([FromBody]Guest request)
        {
            var guest = context.Guests.Find(request.Id);

            if(guest == null)
            {
                throw new Exception("Could not find post");
            }

            guest.FName = request.FName != null ? request.FName : guest.FName;
            guest.LName = request.LName != null ? request.LName : guest.LName;
            guest.Comment = request.Comment != null ? request.Comment : guest.Comment;

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return guest;
            }

            throw new Exception ("Error updating post");
        }

        /// <summary>
        /// DELETE api/guest/[id]
        /// </summary>
        /// <param name="id">Guest id</param>
        /// <returns>True, if successful</returns>
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(Guid id)
        {
            var guest = context.Guests.Find(id);

            if (guest == null)
            {
                throw new Exception("Could not find guest entry");
            }

            context.Remove(guest);

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return true;
            }

            throw new Exception("Error deleting guest entry");
        }
    }
}
