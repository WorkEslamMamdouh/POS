using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace BLL.Services.GUSERS
{
    public interface IG_USERSService
    {
        G_USERS GetbyID(int id);
        List<G_USERS> GetAll();
        List<G_USERS> GetAll(Expression<Func<G_USERS, bool>> predicate);
        G_USERS Insert(G_USERS USER);
        G_USERS Update(G_USERS USER);
        Boolean CheckUser(string Guid, string uCode);
        void Delete(int id);
       

    }
}
