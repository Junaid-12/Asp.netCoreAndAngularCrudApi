using AngularCrudApi.Context;
using Microsoft.EntityFrameworkCore;

namespace AngularCrudApi.Reposistry
{
    public class EmplementUser : IUser
    {

        private readonly ApplicationDbContext _context;
        public EmplementUser(ApplicationDbContext contex)
        {
            _context = contex;
        }
        public async Task<objModel> CreateUser(objModel obj)
        {
            var Result= await _context.StoreInfo.AddAsync(obj);
           await _context.SaveChangesAsync();

            return Result.Entity;
        }

        public async Task<objModel> DeleteUser(int id)
        {
            var Result = await _context.StoreInfo.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (Result != null)
            {
                 _context.Remove(Result);
                await _context.SaveChangesAsync();
            }
            return  Result;
            
        }

        public async Task<IEnumerable<objModel>> GetAllUser()
        {
            return await _context.StoreInfo.ToListAsync();
        }

        public async Task<objModel> GetUserById(int id)
        {
           return await _context.StoreInfo.Where(x=>x.Id == id).FirstOrDefaultAsync();
      
        }

        public async Task<objModel> UpdateUser(objModel obj)
        {
            var Result = await _context.StoreInfo.Where(x => x.Id == obj.Id).FirstOrDefaultAsync();
            if (Result != null) { 
            
               Result.Id=obj.Id;
                Result.Name=obj.Name;   
                Result.Email=obj.Email;
                Result.Address=obj.Address;
                _context.Update(Result);
               await _context.SaveChangesAsync();
                return Result;
            }
            return null;
        }
    }
}

