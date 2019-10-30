import React from 'react';
import Counter from './Counter';
import jquery from "jquery";
//stateful component
export default class Userform extends React.Component { //controller
    constructor() {
        super();
        this.state = {  //model
            user: {
                name: ''
            },
            users: []
        };
    }
    render() {
        return (
            <div>
                <input placeholder='please provide Name' onChange={this.update = this.update.bind(this)} value={this.state.user.name}></input>
                <input type='number' onChange={this.updateAge = this.updateAge.bind(this)} value={this.state.user.age}></input>
                <div>
                    <input type='radio' onChange={this.updateGender = this.updateGender.bind(this)} value='Male' name='gender' /> Male
                <input type='radio' onChange={this.updateGender = this.updateGender.bind(this)} value='Female' name='gender' />Female
                </div>
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
                <Counter count={this.state.users.length}></Counter>
                <button onClick={this.save = this.save.bind(this)}>save</button>
                <ol>
                    {this.state.users.map( (user,index) =>{
                        return <li>{user.name}, {user.age}, {user.gender}
                        <button onClick={this.deleteUser=this.deleteUser.bind({user:user,index:index, users:this.state.users})}>X</button></li>
                    })}
                </ol>
            </div>
        )
    }
    deleteUser(){
        jquery.ajax({
            url:'http://localhost:4200/users/'+this.user.id,
           type:'DELETE',
           success: (response)=>{
               this.users.splice(this.index, 1);
           }
        })
    }
    componentDidMount(){
        //ajax 
        jquery.ajax({
            url:'http://localhost:4200/users',
            type: 'GET',
            success: (response)=>{
                this.setState(Object.assign({users:response}, {user:this.state.user}));
            }
        })
    }
    updateGender(event) {
        this.updateState({ gender: event.target.value });
    }
    updateAge(event) {
        this.updateState({ age: event.target.value });
    }
    update(event) {
        this.updateState({ name: event.target.value });
    }
    updateState(updatedValues) {
        this.setState({
            user: Object.assign(this.state.user, updatedValues)
        })
    }
    save() {
        if (!this.state.user.name.trim()) {
            alert('Name is mandatory.');
            return;
        }
        jquery.ajax({
            url: 'http://localhost:4200/users',
            type: 'POST',
            data: this.state.user,
            error: function (error) {
                alert(error);
            },
            // success: function(){
            //     this.state.users.push(Object.assign({}, this.state.user));
            //     this.setState(Object.assign({}, this.state));
            // }.bind(this)
            success: (savedUser)=>{
                this.state.users.push(Object.assign({}, savedUser));
                this.setState(Object.assign({}, this.state));
            }
        });
    }
}
// export default function Userform(){
//     return (
//         <div> Userform </div>
//     )
// }
