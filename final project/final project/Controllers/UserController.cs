using Microsoft.AspNetCore.Mvc;
using Repository.Entity;
using Service.Interfaces;
using Common.Entity;
using System.ComponentModel.DataAnnotations;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IServiceUserExtention<UserDTO> service;

        public UserController(IServiceUserExtention<UserDTO> service)
        {
            this.service = service;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDTO>> Get()
        {
            return await service.getAllAsync();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDTO> Get(int id)
        {
            return await service.getAsync(id);
        }
        [HttpGet("{passward}/{email}")]
        public async Task<UserDTO> Get([Required] string passward, [Required] string email)
        {
            return await service.GetByNameAndPassward(passward, email);
        }

        // POST api/<UserController>
        //[HttpPost]
        //public async Task Post([FromBody] UserDTO User)
        //{
        //    await service.AddAsync(User);
        //}

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromForm] UserDTO r)
        {
            var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + r.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                r.FileImage.CopyTo(fs);
                fs.Close();
            }

            r.ProfilImage = r.FileImage.FileName;
            await service.updateAsync(id, r);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
        // POST api/<CategoriessController>
        [HttpPost("signUp")]
        public async Task<ActionResult> Post([FromForm] UserDTO userDTO)
        {

            var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + userDTO.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                userDTO.FileImage.CopyTo(fs);
                fs.Close();
            }

            userDTO.ProfilImage = userDTO.FileImage.FileName;
           return Ok( await service.AddAsync(userDTO));
        }
    }
}
