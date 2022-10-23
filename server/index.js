const express = require("express");
const app = express();
const cors =require("cors");
const pool = require("./db")

// middleware
app.use(cors());
app.use(express.json());  //req.body

//routes

//create a todo
app.post("/todos", async (req, res) => {
    try {
        //console.log(req.body);
        const { name, description, nid, subject } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (name, description, nid, subject ) VALUES ($1, $2, $3, $4) returning *",
            [name, description, nid, subject]
        );
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});


// get all todo
app.get("/todos", async (req, res) => {
    try {
        const allTodos= await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
        
    } catch (err) {
        console.error(err.message);
        
    }
});

//get a todo
app.get("/todos/:id", async( req, res) => {
    try {
        const {id} =req.params;
        console.log({id});
        const aTodos = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", [id]
        );
        res.json(aTodos.rows[0]);
        
    } catch (err){
        console.error(err.message);
    }
});

//view all todos
app.get("/todos", async (req, res) => {
    try {
        const viewallTodos= await pool.query("SELECT * FROM todo");
        res.json(viewallTodos.rows)
        
    } catch (err) {
        console.error(err.message);
        
    }
});


//view a todo

app.get("/todos/:id", async( req, res) => {
    try {
        const {id} =req.params;
        console.log({id});
        const viewTodos = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", [id]
        );
        res.json(viewTodos.rows[0]);
        
    } catch (err){
        console.error(err.message);
    }
})

//Edit/Update a todo

app.put("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        console.log("req is ",req); 
        const  Name  = req.body.name; //req.body; // please check this line carefully name, description, nid, subject
        const  Description  = req.body.description;  // basically ei 2 line ei problem . Name, Description, NID, Subject
        const NID = req.body.nid;
        const Subject = req.body.subject;
        console.log("id is ",id); 
        console.log("name is ",Name); 
        console.log("Descrption is ",Description); 
         const updateTodo = await pool.query(
        "UPDATE todo SET (Name, Description, NID, Subject) = ($1, $2, $3,$4) WHERE todo_id= $5",
           [Name, Description, NID, Subject, id ]  );

        res.json("Todo is UPDATED!!"); 
    }catch(err){
        console.error(err.message)
    }
});

//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id= $1", [id]
        );
        res.json("Deleted!!")
    } catch (err) {
        console.error(err.message);     
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})