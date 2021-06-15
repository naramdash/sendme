using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Azure.Cosmos;

using SendMe.Models;

namespace SendMe.Data
{
    public class SendMeContext : DbContext
    {
        public DbSet<Address> Addresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
            optionsBuilder.EnableDetailedErrors(true);
            optionsBuilder.EnableSensitiveDataLogging(true);
            optionsBuilder.UseCosmos(
                "secret",
                databaseName: "AddressDB",
                options =>
                {
                    options.ConnectionMode(ConnectionMode.Gateway);
                    options.Region(Regions.KoreaCentral);
                });


        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>()
                .HasNoDiscriminator()
                .ToContainer("Addresses")
                .HasPartitionKey(address => address.Key)
                .HasKey(address => address.Key);

            modelBuilder.Entity<Address>().Property(address => address.Key)
                .Metadata.SetJsonPropertyName("key");
            modelBuilder.Entity<Address>().Property(address => address.Destination)
                .Metadata.SetJsonPropertyName("destination");

        }
    }
}
