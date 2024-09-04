using AngularCrudApi.Context;
using AngularCrudApi.Reposistry;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularCrudApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _context;

        public UserController(IUser context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {

            return Ok(await _context.GetAllUser());
        }
        [HttpGet]
        [Route("GetUsreById")]
        public async Task<ActionResult<objModel>> GetUSerByID(int id)
        {

            var result = await _context.GetUserById(id);
            if (result == null)
            {
                return BadRequest();
            }
            return result;
        }
        [HttpPost]
        [Route("CreateUser")]
        public async Task<ActionResult<objModel>> CreateUser(objModel obj)
        {
            try
            {
                if (obj == null)
                {
                    return BadRequest();
                }

                var Employeeid = await _context.CreateUser(obj);
                return CreatedAtAction(nameof(GetUSerByID), new { id = Employeeid.Id }, Employeeid);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Data  not Add");
            }
        }
        [HttpPut]
        [Route("UpdateUser/{id}")]
        public async Task<ActionResult<objModel>> UpdateUser(int id,objModel obj)
        {
            if (id == obj.Id)
            {
                var UpdateId = await _context.GetUserById(id);
                if (UpdateId == null)
                {
                    return BadRequest("Id not match");
                }
                return await _context.UpdateUser(obj);

            }
            return null;
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<ActionResult<objModel>> DeleteUser(int id)
        {
            var Result = await _context.DeleteUser(id);
            return Result;
        }

    }
}
