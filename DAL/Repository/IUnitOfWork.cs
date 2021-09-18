using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebUI.DAL.Repository;

namespace WebUl.DAL.Repository
{
    public interface IUnitOfWork
    {

        GenericRepository<T> Repository<T>() where T : class, new();
        void Save();

    }
}
