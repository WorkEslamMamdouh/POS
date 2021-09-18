using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebUl.DAL.Repository;

namespace BLL.Services.insert_Table
{
   public class insert_TableServices : Iinsert_TableServices
    {
        private readonly IUnitOfWork unitOfWork;

        public insert_TableServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public insert_Table_Result GetById(int id)
        {

            return unitOfWork.Repository<insert_Table_Result>().GetById(id);

        }

        public List<insert_Table_Result> GetAll()
        {
            return unitOfWork.Repository<insert_Table_Result>().GetAll();
        }

        public List<insert_Table_Result> GetAll(Expression<Func<insert_Table_Result, bool>> predicate)
        {
            return unitOfWork.Repository<insert_Table_Result>().Get(predicate);
        }

        public insert_Table_Result Insert(insert_Table_Result entity)
        {
            var memb = unitOfWork.Repository<insert_Table_Result>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public insert_Table_Result Update(insert_Table_Result entity)
        {

            var memb = unitOfWork.Repository<insert_Table_Result>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<insert_Table_Result>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<insert_Table_Result> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == "i");
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == "u");
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == "d");

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<insert_Table_Result>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<insert_Table_Result>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<insert_Table_Result>().Delete(entity.ID);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
