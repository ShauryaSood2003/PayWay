import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '95' },
    update: {},
    create: {
      number: '95',
      password: await bcrypt.hash("test",10),
      name: 'test',
      Balance: {
        create: {
            amount: 100000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 100000,
          token: "199",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '90' },
    update: {},
    create: {
      number: '90',
      password: await bcrypt.hash("test",10),
      name: 'text',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 2000,
          token: "119",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })