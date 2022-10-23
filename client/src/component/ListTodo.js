import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import viewTodo from "./ViewTodo";
import { read, utils, writeFile } from 'xlsx';

//get data from database
const ListTodo = () => {

    const [todos, setTodos] = useState([]);
    //const show = todos.map((String)=>todos);
    //console.log(show);


    //delete todo function- delete api

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            //filter is use for set a condition
            setTodos(todos.filter(todo => todo.todo_id !== id));
            //console.log(deleteTodo);

        } catch (err) {
            console.error(err.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")   //api 
            const jsonData = await response.json();
            console.log(jsonData);

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    };

    const row_inser_fromExcel= async (data) => {
        try {
 
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            });

            window.location = "/";
            //console.log(response); 

        } catch (err) {
            console.error(err.message)
        }
    };

    

    useEffect(() => {
        getTodos();
    }, []);
    console.log(todos); //get data of name, description 


    //import excel sheet
    const handleImport = ($event) => {
        const files = $event.target.files;

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    //console.log(rows);
                    //console.log("length: ",rows.length); 
                    for(var i = 0 ; i < rows.length; i++){
                        //console.log(rows[i]); 
                        row_inser_fromExcel(rows[i]); 
                    }
                    setTodos(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
        
    }

    //export excel sheet
    const handleExport = () => {
        const headings = [[
            'name',
            'description',
            'nid',
            'subject'
        ]];
        todos.forEach(object => {
  delete object['todo_id'];
});
    console.log();
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, todos, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'File.xlsx');
    }


    return (
        <Fragment>
            {/*----------------------------------------------------------------*/}

            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row" >
                        <div className="col-md-6" >
                            <div className="input-group">
                                <div className="custom-file"  >
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    <label className="custom-file-label" htmlFor="inputGroupFile"></label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ position: "absolute", left: "80%" }}>
                            <button onClick={handleExport} className="btn btn-primary float-right">
                                Export <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/*----------------------------------------------------------------*/}
            <div className="row">

                <table className="table table-striped mt-2 text-center">
                    <thead>
                        <tr style={{ background: "#E5F693" }}>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">NID</th>
                            <th scope="col">Subject</th>
                            <th scope="col">View</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.length ?
                            todos.map(todo => (
                                <tr key={todo.todo_id}>
                                    <td >{todo.name}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.nid}</td>    {/* convert english to bangla here */}
                                    <td>{todo.subject}</td>
                                    <td>
                                        <viewTodo />
                                    </td>
                                    <td>
                                        <EditTodo todo={todo} />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="5" className="text-center">No Movies Found.</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>

        </Fragment>
    )
};

export default ListTodo;