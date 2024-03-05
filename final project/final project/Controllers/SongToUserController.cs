using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("sharedMusic/[controller]")]
    [ApiController]
    public class SongToUserController : ControllerBase
    {
        private readonly IServiceExetention<SongToUserDTO> service;

        public SongToUserController(IServiceExetention<SongToUserDTO> service)
        {
            this.service = service;
        }

        // GET: api/<SongToUserController>
        [HttpGet]
        public async Task<List<SongToUserDTO>> Get()
        {
            return await service.getAllAsync();
        }
        [HttpGet("User/{UserId}")]
        public async Task<List<SongToUserDTO>> GetByUser(long UserId)
        {
            return await service.GetAllPlayingsOfUser(UserId);
        }
        [HttpGet("GetByUserAndSong/{SongId}/{UserId}")]
        public async Task<SongToUserDTO> GetByUserAndSong(long SongId, long UserId)
        {
            return await service.GetByUserAndSong(SongId,UserId);
        }

        // GET: api/SongToUser/5
        [HttpGet("{id}")]
        public async Task<SongToUserDTO> Get(long id)
        {
            return await service.getAsync(id);
        }

        // POST api/<SongToUserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] SongToUserDTO SongToUser)
        {
           return Ok( await service.AddAsync(SongToUser));
        }

        // PUT api/<SongToUserController>/5
        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] SongToUserDTO r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<SongToUserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
            await service.deleteAsync(id);
        }
    }
}
