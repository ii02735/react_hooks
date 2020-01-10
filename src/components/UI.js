import React, { useEffect, useState } from "react";
import "./UI.css";

const Form = props => {

    const [users,setUsers] = useState([]);
    const [name,setName] = useState(""); /** with that redaction, the first element will be our attribute, and the second one the callback that will update that attribute */
    const [password,setPassword] = useState("");
    const [uid,setUid] = useState("");
    const [error,setError] = useState(""); //we could create a variable, but a state variable would refresh the render, which a regular variable cannot
    //const method = useCallback(() => { console.warn("method called")},[setUsers]);

    const onSubmit = (event) => {
         event.preventDefault();
         if(!event.target.user.value || !event.target.pass.value || !event.target.uid.value)
            setError("Incomplet")
         else{ //argument in callback will contain previous attribute value (previous array : no need to slicing !)
            setUsers(prevUsers => [...prevUsers,{id: Math.random().toString(), name: name, password: password, uid: uid}]);
            setError("");
        }
    };

    const removeHandler = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id)) //we retrieve all the users that don't have that id and set them in the users array
    };  

    const form = (
    <>
    <form onSubmit={onSubmit}>
        <label htmlFor="user">Utilisateur</label>
        <input name="user" value={name} onChange={(event) => { setName(event.target.value)}} type="text" />
        <label htmlFor="pass">Mot de passe</label>
        <input name="pass" value={password} onChange={(event) => { setPassword(event.target.value) }} type="password" />
        <label htmlFor="uid">UID</label>
        <input type="number" name="uid" value={uid} onChange={(event) => { (event.target.value < 0) ? setUid(0) : setUid(event.target.value) }} />
        <div className="errorMessage">{ error }</div>
        <input type="submit" value={props.hello} />
    </form>
    <ListUsers users={users} removeHandler={removeHandler}/>
    </>);


    
    return form;
};

const User = props => {
    return <><tr><td>{props.user.name}</td><td>{props.user.password}</td><td>{props.user.uid}</td><td><button className="delete" onClick={props.onclick}>Supprimer</button></td></tr></>;
};

const ListUsers = React.memo(props => {
    
    let table = null;


    if(props.users.length > 0)
    {
        table = (
            <>
            <h3>Utilisateurs existants : </h3>
            <table>
                <thead>
                <tr>
                    <th>
                        Utilisateur
                    </th>
                    <th>
                        Mot de passe
                    </th>
                    <th>
                        UID
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    (props.users != null ? props.users.map(user => <User key={user.id} user={user} onclick={props.removeHandler.bind(this,user.id)}/>) : null)
                }
                </tbody>
            </table></>);
    }else{
        table = (<><h3>Aucun utilisateur existant</h3></>);
    }

    useEffect(() => {
        console.log("ListUsers updated");
    });
    

    return (<div id="tableUser">
    {table}
    </div>);
});

const UI = props => { //because UI will continue to change, there is no need to put memo here
    const modal = <section className="modal">
        {props.children}
        <h3>Ajouter un nouvel utilisateur</h3>
        
	<Form hello="world"/>
    </section>

    useEffect(() => {
        console.log("UI updated");
    })

    return modal;
};

export default UI;
