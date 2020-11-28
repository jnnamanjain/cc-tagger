import { render } from '@testing-library/react'
import React from 'react'
import Login from '../Login/Login'
import SearchBar from '../SearchBar/SearchBar'
import TagGrid from '../TagGrid/TagGrid'
import Utils from "../Utils";


class Home extends React.Component {

    tags=[
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"binary","count":"8","type":"user-defined"},
        {"tag":"dp","count":"6","type":"user-defined"},
        {"tag":"easy","count":"2","type":"user-defined"},
        {"tag":"greedy","count":"8","type":"user-defined"},
        {"tag":"bs","count":"8","type":"user-defined"},
        {"tag":"kmp","count":"2","type":"actual-tag"},
        {"tag":"dp","count":"8","type":"actual-tag"},
        {"tag":"z","count":"2","type":"actual-tag"},
        {"tag":"huffman","count":"8","type":"actual-tag"},
        {"tag":"bfs","count":"2","type":"actual-tag"},
        {"tag":"dfs","count":"8","type":"actual-tag"},
        {"tag":"aman","count":"2","type":"author"},
        {"tag":"naman","count":"8","type":"author"},
        {"tag":"manan","count":"5","type":"author"},
        {"tag":"shanu","count":"3","type":"author"},
        {"tag":"mannu","count":"5","type":"author"},
    ];
    constructor(props) {
        super(props);
        //this.props.parentCallback(this.tags);
        this.state = {
            tags: []
        }
    }
    //backendURL = "http://localhost/Codechef Backend/public/index.php";

    async getPublicToken()
    {
        console.log("token chlo");
        const res = await fetch(Utils.backendURL+'/publictoken');
        const tokenData = await res.json();
        const public_token = tokenData.public_token;
        localStorage.setItem(Utils.PUBLIC_TOKEN,public_token);
        console.log("token aa gya");
        return public_token;
    }

    async getCodeChefTags(public_token)
    {
        console.log("tag chlo");
        const res = await fetch(Utils.backendURL+'/tags',{
            method : 'GET',
            'headers' : {
                'Authorization' : public_token
            }
        });
        const tagsData = await res.json();
        //console.log(tagJson.result.data.content);
        var tags = tagsData.result.data.content;
        console.log("tag aa gya");
        return Object.values(tags);
    }

    async getUserTags()
    {
        const res = await fetch(Utils.backendURL+"/usertags",{
            method : 'POST',
            'body' : JSON.stringify({
                'user_name' : 'Riya'
            })
        });

        const data = await res.json();
        console.log(data);
        var a = Object.entries(data);
        console.log(typeof data[Symbol.iterator]  === 'function');
        console.log(Object.keys(data));
        return data;
        console.log(data);
    }

    async componentDidMount()
    {
        var finalTags = [];
        var public_token = await this.getPublicToken();
        var codechefTags = await this.getCodeChefTags(public_token);
        console.log(codechefTags);
        console.log(typeof codechefTags[Symbol.iterator]  === 'function');
        console.log( codechefTags);
        finalTags = [...finalTags , ...codechefTags];
        //console.log("------------");
        //console.log(public_token);
        
        if(Utils.isLoggedIn())
        {
            var usertags = await this.getUserTags();
            console.log( usertags);
            finalTags = [...finalTags , ...usertags];
            console.log("login kr lia");
            console.log(finalTags);
        }

        
        this.setState({
            tags :finalTags
        });
        console.log(finalTags);
        this.props.parentCallback(finalTags);
        //render();

    }

    
    

    render() {
        //if(this.state.tags.length==0)
          //  return null;
        return <div className='App'> 
                <h1> MAIN APP GOES HERE</h1>
                <div className='Login'>
                    <Login/>
                </div>
                <br/>
                <div className = 'Search'>
                    <SearchBar tags = {this.state.tags}/>
                    {
                        console.log(this.state.tags)
                    }
                </div>
                <br/><br/>

            </div>;

        
    }

}
export default Home;