// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.driver.createMany({
      data: [
        {
          name: "Kwadwo Agyei",
          phoneNumber: '0241454545',
          address: 'Accra',
          schoolId: v4()
        },
        {
          name: "Annor Evans",
          phoneNumber: '0204152562',
          address: 'Accra',
          schoolId: v4()
        },
        {
          name: "Kwakye Isaac",
          phoneNumber: '0264155252',
          address: 'Accra',
          schoolId: v4()
        }
      ]
  });

  console.log({ post1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
