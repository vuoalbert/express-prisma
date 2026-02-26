import 'dotenv/config'
import express from 'express'
import prisma from './lib/prisma.js'

const app = express()
app.use(express.json())

const PORT = 3000;

app.post('/usr', async (req, res) => {
    console.log("Checked Auth Here")


    const {email, password} = req.body

    const isDuplicate = await prisma.user.findFirst({
        where: {
            "email": email
        }
    })

    if (isDuplicate) {
        return res
            .status(500)
            .json({
                status: "duplicate email"
            })
    }

    try {
        const postData = await prisma.user.create({
            data: {
                email,
                password
            }
        })
    } catch (error) {
        console.error(error)
        return res
            .status(500)
            .json({
                status: "error"
            })
    }

    return res
        .status(200)
        .json({
            status: 'success'
        })

})

app.listen(PORT);