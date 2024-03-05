using AutoMapper;
using Common.Entity;
using Repository.Entity;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SongToUserService : IServiceExetention<SongToUserDTO>
    {
        //המרה ממחלקה
        private readonly IMapper mapper;
        private readonly IRepository<SongToUser> repository;
        public SongToUserService(IRepository<SongToUser> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<SongToUserDTO> AddAsync(SongToUserDTO entity)
        {
            return mapper.Map<SongToUserDTO>( await repository.addItemAsync(mapper.Map<SongToUser>(entity)));
        }

        public async Task deleteAsync(long id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<SongToUserDTO> getAsync(long id)
        {
            return mapper.Map<SongToUserDTO>(await repository.getAsync(id));
        }

        public async Task<List<SongToUserDTO>> getAllAsync()
        {
            return mapper.Map<List<SongToUserDTO>>(await repository.getAllAsync());
        }

        public async Task updateAsync(long id, SongToUserDTO entity)
        {
            await repository.updateAsync(id, mapper.Map<SongToUser>(entity));
        }

        public async Task<List<SongToUserDTO>> GetAllPlayingsOfUser(long id)
        {
            var allPlayings = await repository.getAllAsync();
            return mapper.Map<List<SongToUserDTO>>(allPlayings.Where(x => x.UserId == id).OrderBy(x=>x.Count));
        }

        public async Task<SongToUserDTO> GetByUserAndSong(long SongId,long userId)
        {
            var allplaybacks= await repository.getAllAsync();
            return mapper.Map<SongToUserDTO>(allplaybacks.FirstOrDefault(x => x.SongId == SongId && x.UserId == userId));
        }
    }
}

