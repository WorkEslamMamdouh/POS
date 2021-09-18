using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.insert_Table
{
    public interface Iinsert_TableServices
    {
        insert_Table_Result GetById(int id);
        List<insert_Table_Result> GetAll();
        List<insert_Table_Result> GetAll(Expression<Func<insert_Table_Result, bool>> predicate);
        insert_Table_Result Insert(insert_Table_Result entity);
        insert_Table_Result Update(insert_Table_Result entity);
        void Delete(int id);
        void UpdateList(List<insert_Table_Result> Lstservice);
    }
}
