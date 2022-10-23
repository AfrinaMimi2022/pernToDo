import React, { Fragment, useState } from "react";


//post api

const InputTodo = () => {

    const [name, setName] = useState("Name");
    const [description, setDescription] = useState("Service Description");
    const [nid, setNID] = useState(123);
    const [subject, setSubject] = useState("Subject");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {name, description, nid, subject};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
            //console.log(response);

        } catch (err) {
            console.error(err.message)
        }
    }

    return (

        <body style={{ background: "aliceblue" }}>
            <Fragment>
                <h4 className="text-center mt-3"
                    style={{ background: "#68F6DA" }}>
                    To Do List
                </h4>
                <form className=" d-flex mt-1" onSubmit={onSubmitForm}>
                    <div style={{
                        textAlign: "center",
                        maxWidth: "2000px",
                        margin: "0 auto",
                        border: "5px solid #e6e6e6",
                        borderRadius: "5%",
                        padding: "40px 60px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        background: "linear-gradient(#11da0a, #86b1e2)"
                    }} >
                    <input type="text" style={{ background: "#C6F0C8" }}
                            className="form-control" value={name} 
                            onChange={e => setName(e.target.value)} />
                        <br></br>
                        <input type="text" style={{ background: "#C6F0C8" }} 
                            className="form-control" value={description} 
                            onChange={e => setDescription(e.target.value)} />
                        <br></br>
                        <input type="number" style={{ background: "#C6F0C8" }} 
                            className="form-control" value={nid} 
                            onChange={e => setNID(e.target.value)} />
                        <br></br>
                        <input type="text" style={{ background: "#C6F0C8" }} 
                            className="form-control" value={subject} 
                            onChange={e => setSubject(e.target.value)} />
                        <br></br>
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </Fragment>
        </body>

    );
};

export default InputTodo;