import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function setup() {
  await prisma.roles.upsert({
    where: {
      name: 'ADMINISTRATOR',
      id: 1,
    },
    create: {
      id: 1,
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    },
    update: {},
  })

  await prisma.permissions.upsert({
    where: {
      name: 'ACCESS_ALL',
      id: 1,
    },
    create: {
      id: 1,
      name: 'ACCESS_ALL',
    },
    update: {},
  })

  const passwordHashed = await hash('123456', 10)

  await prisma.users.upsert({
    where: { email: 'adm@local.com' },
    create: {
      name: 'ADMINISTRATOR',
      email: 'adm@local.com',
      password: passwordHashed,
      status: true,
      id_role: 1,
    },
    update: {},
  })
}

setup()
  .then(async () => {
    await prisma.$disconnect()
    console.info('Seed executado com sucesso.')
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    console.error('Houve um erro algo executar o seed.', e)
    process.exit(1)
  })
