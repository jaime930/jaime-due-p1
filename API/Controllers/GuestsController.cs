using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Guests;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class GuestsController : ControllerBase
    {
        private readonly IMediator mediator;
        public GuestsController(IMediator mediator) => this.mediator = mediator;
        public async Task<ActionResult<List<Guest>>> List()
        {
            return await this.mediator.Send(new List.Query());
        }
    }
}