const { PrismaClient } = require('@prisma/client')
    //const { P } = require('caniuse-lite/data/agents')

const prisma = new PrismaClient()

module.exports = prisma