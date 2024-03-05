﻿using Entities.Entity;
using Microsoft.EntityFrameworkCore;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Repository.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
        }
        public async Task<User> addItemAsync(User item)
        {
            User user = item;
            await _context.Users.AddAsync(item);
            await _context.save();
            return user;
        }

        public async Task deleteAsync(long id)
        {
            _context.Users.Remove(await getAsync(id));
            await _context.save();
        }

        public async Task<User> getAsync(long id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<User>> getAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task updateAsync(long id, User item)
        {
            //_context.Users.Update(entity);
            var user = this._context.Users.FirstOrDefault(x => x.Id == id);
            user.ProfilImage = item.ProfilImage;
            user.Status=item.Status;    
            user.Age=item.Age;
            user.Email=item.Email;
            user.FirstName=item.FirstName;
            user.LastName=item.LastName;
            user.Email=item.Email;
            user.PhoneNumber=item.PhoneNumber;  
            user.Passward = item.Passward;  
            await _context.save();
        }
        
    }
    
    //private readonly IContext context; 
    //UserRepository(IContext context)
    //{
    //    this.context = context;
    //}

    //public void Add(User item)
    //{
    //    this.context.Users.Add(item);
    //    this.context.save();
    //}

    //public void Delete(User item)
    //{
    //    this.context.Users.Remove(item);
    //    this.context.save();
    //}

    //public List<User> GetAll()
    //{
    //    return this.context.Users.ToList();
    //}

    //public User GetById(int id)
    //{
    //   return context.Users.FirstOrDefault(x => x.Id == id);
    //}

    //public void Update(int id, User item)
    //{
    //    throw new NotImplementedException();
    //}
}
