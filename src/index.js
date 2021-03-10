const Express = require('express')
require("./db/mongoose")

const UserRouter = require('./routers/user')
const tasksRouter = require('./routers/tasks')

const app = Express()
const port = process.env.PORT 

app.use(Express.json())
app.use(UserRouter)
app.use(tasksRouter)

app.listen(port,()=>{
    console.log("Server is running at " + port)
})

