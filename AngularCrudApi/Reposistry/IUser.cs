using AngularCrudApi.Context;

namespace AngularCrudApi.Reposistry
{
    public interface IUser
    {
        Task<IEnumerable<objModel>> GetAllUser();
        Task<objModel> GetUserById(int id);
        Task<objModel> CreateUser(objModel obj);
        Task<objModel> UpdateUser(objModel obj);
        Task<objModel>  DeleteUser(int id);
    }
}
