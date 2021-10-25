using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Guests
{
    public class List
    {
        public class Query : IRequest<List<Guest>> { }

        public class Handler : IRequestHandler<Query, List<Guest>>
        {
            private readonly DataContext context;

            public Handler(DataContext context) => this.context = context;

            public Task<List<Guest>> Handle(Query request, CancellationToken cancellationToken)
            {
                return this.context.Guests.ToListAsync();
            }
        }
    }
}