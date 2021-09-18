using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DAL.Domain
{
    public partial class SamahEntities
    {

        public SamahEntities(string ConnectionString): base(ConnectionString)
        {


        }

    }
}
