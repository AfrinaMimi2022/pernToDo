import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    const [name, setName] = useState(todo.name);
    const [description, setDescription] = useState(todo.description);
    const [nid, setNID] = useState(todo.nid);
    const [subject, setSubject] = useState(todo.subject);


    //edit description function
    const updateDescription = async e => {
        e.preventDefault();
        try {
            const req_parameter = { name, description, nid, subject };
            //console.log("body is ", JSON.stringify(req_parameter));  
            //console.log("checking the value while updating the row: ", description);
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(req_parameter)
            });

            window.location = "/";

            //console.log(response);

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/*  set unique id= id1/id2/.../id10       */}

            <div className="modal"
                id={`id${todo.todo_id}`}
                //onClick={() => {setName(todo.name);setDescription(todo.description);}}
                >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit to do</h4>
                            <button type="button" className="close"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={name == null ? '' : name}
                                onChange={e => setName(e.target.value)} />
                            <br />
                            <input type="text" className="form-control" value={description == null ? '' : description}
                                onChange={e => setDescription(e.target.value)} />
                                <br/>
                                <input type="number"  
                            className="form-control" value={nid == null ? '' : nid} 
                            onChange={e => setNID(e.target.value)} />
                        <br/>
                        <input type="text"  
                            className="form-control" value={subject == null ? '' : subject}  
                            onChange={e => setSubject(e.target.value)} />
                        <br/>
                        </div>

                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                                onClick={e => updateDescription(e)}

                            >Save</button>
                            <button type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default EditTodo;