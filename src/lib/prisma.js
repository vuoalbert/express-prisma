import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.ts'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL })


const prisma = new PrismaClient({ adapter: pool })


export default prisma

