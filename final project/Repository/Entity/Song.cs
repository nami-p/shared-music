﻿using Entities.Entity;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;
/*public class Product
{
    public int Id { get; set; }
public string Name { get; set; }
public double Price { get; set; }
public string image { get; set; }
public int CategoryId { get; set; }
[ForeignKey("CategoryId")]
public virtual Category Category { get; set; }
public int StoreId { get; set; }
[ForeignKey("StoreId")]
public virtual Store Store { get; set; }
}
את המפתח זר את ממקמת מעל המופע מסוג המחלקה וזה יוצר את הקשר
השם בפנים גם חיב להיות שם המחלקה ןid
בdto את שמה רק כזה דבר:    public int CategoryId { get; set; }
*/


namespace Entities.Entity
{
    public class Song
    {
        
        
           private double fear ;   // 0
           private double surprise;   // 1
           private double disgust;   // 2
           private double happy ;   // 3
           private double sad  ;   // 4
           private double neutral;   // 5
           private double angry;   // 6
      

        
            
        
        private long id;
        private string name;
        private string description;
       /* private long artistId;*///קשור לקשרי גומלין (אולי אני לא צריכה לכתוב את זה
        private double length;
        private string image;
        private int ratingStars;
        private int numOfPlays;
        private DateTime uploadDate;
        //private long categoryId;
        private string song1;
        private int numOfRaters;
        
        //private double[] emotions;
        //מערך מונים 
        //והתוכן של כל איבר הוא מספר המציין רמת רגשenum כשכל מיקום במערך מייצג רגש מסויים לפי 
        // emotions[(int)Emotions.Happy]: כשאני ארצה לגשת לרמת רגש מסוים 


        //public Song(string song1, int numOfRaters, long id, string name, string description, int length, string image, int ratingStars, int numOfPlays, DateTime uploadDate)
        //{
        //    this.song1 = song1;
        //    this.Id = id;
        //    this.Name = name;
        //    this.Description = description;
        //    //this.ArtistId = autherId;
        //    this.Length = length;
        //    this.Image = image;
        //    this.RatingStars = ratingStars;
        //    this.NumOfPlays = numOfPlays;
        //    this.UploadDate = uploadDate;
        //    //this.CategoryId = categoryId;
        //    this.numOfRaters = numOfRaters;
        //}
        
       

        public long Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        //public long ArtistId { get => artistId; set => artistId = value; }
        public double Length { get => length; set => length = value; }
        public string Image { get => image; set => image = value; }
        public int RatingStars { get => ratingStars; set => ratingStars = value; }
        public int NumOfPlays { get => numOfPlays; set => numOfPlays = value; }
        public DateTime UploadDate { get; set; }
        //public long CategoryId { get => categoryId; set => categoryId = value; }
        //public double[] Emotions { get => emotions; set => emotions = value; }
        public int NumOfRaters { get => numOfRaters; set => numOfRaters = value; }
        public string Song1 { get => song1; set => song1 = value; }
        public double Fear { get => fear; set => fear = value; }
        public double Surprise { get => surprise; set => surprise = value; }
        public double Disgust { get => disgust; set => disgust = value; }
        public double Happy { get => happy; set => happy = value; }
        public double Sad { get => sad; set => sad = value; }
        public double Neutral { get => neutral; set => neutral = value; }
        public double Angry { get => angry; set => angry = value; }
        public long CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category category { get; set; }
        public long UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User user { get; set; }
         public virtual ICollection<Review> Reviews { get; set; }
         public virtual ICollection<SongToUser> Playbacks { get; set; }
        //emotions list - every motion has rating between 1 - 10 
        //list of review 
        //num of listening to a specific person -לכל אדם יש הרבה שירים שמושמעים וכל שיר יכול להיות מושמע ע"י הרבה אנשים
        //ןכך נוכל להציע לאדם שירים שהוא שמע הכי הררבה ראשונים - מועדפים
    }
}
