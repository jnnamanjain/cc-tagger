import { render } from '@testing-library/react'
import React from 'react'
import { Link , Redirect,withRouter } from "react-router-dom";
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.items = props.tags;
        this.state = {
            redirect:""
        }
        console.log(this.items);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    onTextChanged(e) {
        console.log("----------");
        let value = e.target.value;
        value=value.slice(value.lastIndexOf(',') + 1);
        let suggestions=[];
        if(value.length>0)
        {
            const regex = new RegExp(`^${value}`,'i');
            for(let i=0;i<this.items.length;i++)
            {
                //console.log(this.items[i]);
                if(this.items[i].tag.indexOf(value)!==-1)
                    suggestions.push(this.items[i]);
            }
        }
        //console.log(suggestions);
        this.renderSuggestions(suggestions , e );
    }

    renderSuggestions(suggestions, e) {
        let menuEl = document.getElementById('dropdown-menu');
        //console.log(suggestions);
        //console.log('------------')
        let value = e.target.value;
        value = value.slice(0, value.lastIndexOf(',') + 1);
        menuEl.innerHTML = null;
        if(suggestions.length>0){
            menuEl.innerHTML='<div className = "dropdown-content"></div>';
            suggestions.map((item) =>
            {
                let a = document.createElement('a');
                a.innerHTML = `<li> ${item.tag}  --- ${item.type}</li>`;
                a.classList.add('row-item');
                //a.onclick = function() {alert('clicked');};
                a.onclick=function() {
                    //alert('chelga');
                    let suffix="";
                    if(item.type==='user-defined')
                        suffix= "::ud,";
                    else suffix = "::pd,";
                    let finalStr = value + item.tag + suffix;
                    e.target.value= finalStr;
                    menuEl.innerHTML="";
                };
                menuEl.childNodes[0].appendChild(a);
            })
            menuEl.style.display = 'block';
        }

    }

    handleSearch(e) {
        console.log(e);
        if(e.key!='Enter')
            return;
        var str = document.getElementById('inputTags');
        console.log(str);
        var value = str.value;
        if(value.slice(-1)==',')
            value=value.slice(0,-1);
        console.log(value);
        let url = "/problems/"+value;
        console.log(url);
        this.setState({
            redirect : url
        })
        this.props.history.push(url);
        
        /*<Link to={{
            pathname: `/problems/${item.tag+suffix}`,
            data: [item] // your data array of objects
        }}>*/
    }

    render() {
        return (
            <div className='outer-container'>
                <input onChange={(this.onTextChanged)} onKeyPress={this.handleSearch} id = 'inputTags' type='text' placeholder="Enter comma separated tags"/>
                <div className="dropdown" id="dropdown-menu" role="menu"/>
                Idhr Search krunga
            </div>

        )
    };

}
export default withRouter(SearchBar);