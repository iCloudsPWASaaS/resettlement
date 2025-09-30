import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create users with different roles
  const users = [
    {
      email: 'admin@resettlement.com',
      password: await bcrypt.hash('Admin@123', 10),
      name: 'Admin User',
      role: Role.ADMIN
    },
    {
      email: 'manager@resettlement.com',
      password: await bcrypt.hash('Manager@123', 10),
      name: 'Manager User',
      role: Role.MANAGER
    },
    {
      email: 'analyst@resettlement.com',
      password: await bcrypt.hash('Analyst@123', 10),
      name: 'Analyst User',
      role: Role.ANALYST
    },
    {
      email: 'user@resettlement.com',
      password: await bcrypt.hash('User@123', 10),
      name: 'Regular User',
      role: Role.USER
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Database has been seeded with test users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });