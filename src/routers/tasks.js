const Express = require('express')
const { findById } = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new Express.Router()
const Tasks = require('../models/tasks')

router.post('/tasks', auth, async (req,res)=>{
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks', auth,async (req,res)=>{
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==='desc'?-1:1
    }
    try{
        //const task = await Tasks.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
        //res.send(task)
        //await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch{
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth,async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Tasks.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch{
        res.status(500).send()
    }
})



router.patch('/tasks/:id', auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValid = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(404).send({error:"Invalid Updates"})
    }
    try{
        const tasks = await Tasks.findOne({_id:req.params.id, owner: req.user._id})
        if(!tasks){
            return res.status(404).send()
        }
        updates.forEach((update)=> tasks[update] = req.body[update])
        await tasks.save()
        res.send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res)=>{
    try{
        const task = await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router