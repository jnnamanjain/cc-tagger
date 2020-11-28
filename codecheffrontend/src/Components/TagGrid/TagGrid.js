import React from 'react'
import './TagGrid.css'
import { Link } from 'react-router-dom';

class TagGrid extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.tags);
        this.state = {
            render_list : this.props.tags,
            selected : ''
        }
        this.sortList = this.sortList.bind(this);
        //console.log(this.state.render_list);
        //console.log(this.items);
    }

    componentDidMount() {        
        this.items = this.props.tags;
        //console.log(this.items);
        this.setState({
            render_list : this.items,
            selected : 'none'
        })
    }

    sortList(context) {
        let currentState = context.target.getAttribute('state');
        if(currentState==='active')
        {
            //console.log("---------------");
            this.setState({
                render_list : this.items,
                selected : 'none'
            });

            context.target.setAttribute('state','none');
            context.target.classList.remove('active');
        }
        else {

            if(this.state.selected!=='none')
            {
                let ele = document.getElementById(this.state.selected);
                console.log(ele);
                ele.setAttribute('state','none');
                ele.classList.remove('active');
            }

            let id = context.target.getAttribute('id');
            let newList =[];
            newList = this.items.filter(element => element.type===id);
            console.log(newList);
            this.setState({
                render_list : newList,
                selected : id
            });
            context.target.setAttribute('state','active');
            context.target.classList.add('active');



        }

    }


    render() {
        return (
        <div>
            <div className="container-outer">
                <div className="container-inner">
                    <div className="box1">
                        <button id ='author' className='sort-box' state='none' onClick={this.sortList.bind(this)}>Author</button>
                        <button id ='actual_tag' className='sort-box' state='none' onClick={this.sortList.bind(this)}>actual-tag</button>
                        <button id = 'user-defined' className='sort-box' state='none' onClick={this.sortList.bind(this)}>User-defined tags</button>
                    </div>

                    <div className="box2">
                        <div className="grid-container" id="grid-container">
                            { this.state.render_list.map(item => {
                                //console.log(item);
                                var suffix="";
                                if(item.type==='user-defined')
                                    suffix='::ud';
                                else suffix='::pd';
                                return (
                                    <div className="grid-box">
                                        <Link to={{
                                            pathname: `/problems/${item.tag+suffix}`,
                                            data: [item] // your data array of objects
                                        }}>{item.tag}    {item.count}  {item.type}</Link>
                                    </div>
                                );
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    };

}
export default TagGrid;