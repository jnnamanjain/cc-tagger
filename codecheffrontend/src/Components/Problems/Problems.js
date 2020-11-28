import { render } from '@testing-library/react'
import React from 'react'
import Utils from "../Utils";

class Problems extends React.Component {
    constructor(props) {
        super(props);
        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/') + 1);
        console.log(url);
        this.tagStr = url;
        this.state = {
            render_problems : []
        }
    }

    async getCodeChefProblem(public_token , codechefTags)
    {
        let cc_str = codechefTags.join(',');
        console.log(cc_str);
        const params = new URLSearchParams({
            'filter' : cc_str
        });

        const res = await fetch(Utils.backendURL+'/tags?'+params,{
            method : 'GET',
            'headers' : {
                'Authorization' : public_token
            }
        });
        const tagsData = await res.json();
        console.log(tagsData);
        console.log(Object.values(tagsData));
        //var tags = tagsData.result.data.content;
        return Object.values(tagsData);
    }

    async getUserProblems(userTags)
    {
        let user_str = userTags.join(',');
        console.log(user_str);
        const params = new URLSearchParams({
            'filter' : user_str
        });
        const res = await fetch(Utils.backendURL+'/usertags?'+params,{
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

    async componentDidMount() {
        console.log("------------");
        let tagArr= this.tagStr.split(',');
        console.log(tagArr);

        let codechefTags =[],userTags=[],finalList=[];
        codechefTags = tagArr.filter(element => element.slice(-2)!=='ud');
        userTags = tagArr.filter(element => element.slice(-2)==='ud');
        codechefTags = codechefTags.map(e=> e=e.slice(0,-4));
        userTags = userTags.map(e=> e=e.slice(0,-4));
        var finalTags=[];
        if(codechefTags.length>0)
        {
            var public_token = localStorage.getItem(Utils.PUBLIC_TOKEN);
            var ccproblems = await this.getCodeChefProblem(public_token , codechefTags);
            finalTags = [...finalTags , ...ccproblems];
        }
        

        console.log(ccproblems);
        if(Utils.isLoggedIn() && userTags!=null)
        {
            var userproblems = await this.getUserProblems(userTags);
            console.log(userproblems);
            finalTags = [...finalTags , ...userproblems];
            console.log("login kr lia");
            console.log(finalTags);
            this.setState({
                render_problems:finalTags
            });
        }

    }


    render() {
        if(this.state.render_problems.length==0)
            return null;
        return (
        <div>
            {
                this.state.render_problems.map((e)=> {
                    let toRender="";
                    if('code' in e)
                        toRender = e.code;
                    else toRender = e.question_code;
                    return (
                        <div class="container1">
                        <h2>container1</h2>
                        <div class="container2">{
                            toRender
                        }</div>
                        </div>
                    )
                })
            }
            
        </div>
        )
    };

}
export default Problems;