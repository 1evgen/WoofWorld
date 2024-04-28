import {runDb} from "./bd/bd";
import {dogRouter} from "./routes/dogsRoutes";
import {sellerRouter} from "./routes/sellerRouters";
const express = require("express")
const app = express()
const PORT = process.env.PORT || "3003"
app.use(express.json());

app.use('/dogs', dogRouter )
app.use('/clients', sellerRouter)
const startApp = async () => {
    try {
        await runDb()
        app.listen(PORT, ()=> {
            console.log(`The server started success ! Port - ${PORT}`)
        })
    } catch {
        console.log('error')
    }
}

startApp()


