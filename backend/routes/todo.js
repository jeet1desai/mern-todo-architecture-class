const router = require("express").Router();
const Todo = require("../Models/todoModel");

router.get("/all", async (req, res) => {
    const todos = await Todo.find();
    res.status(201).json(todos);
});

router.post("/", async (req, res) => {
    try {
        let { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ msg: "Enter empty field." });
        }

        const newTodo = new Todo({
            title,
            description
        });

        const saveTodo = await newTodo.save();
        res.status(201).json(saveTodo);
    } catch (e) {
        res.status(404).send(e);
    }
});


router.put('/isComplete/:id', async (req, res) => {
    try {
        let id = req.params.id;

        const data = await Todo.findOne({ _id: id });
        const updateTodo = await Todo.findByIdAndUpdate({ _id: id }, {
            $set: {
                isComplete: !data.isComplete
            }
        }, { new: true });

        res.status(201).json(updateTodo);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ msg: "Enter empty field." });
        }

        const updateTodo = await Todo.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });

        res.status(201).json(updateTodo);
    } catch (e) {
        res.status(404).send(e);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const deleteTodo = await Todo.findByIdAndRemove(id);
        res.status(201).json(deleteTodo);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;