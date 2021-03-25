import React, { Component } from 'react'
import axios from 'axios'
const Context=React.createContext()
//redux concept to chane array with new search
const reducer= (state,action) => {
    switch(action.type){
        case 'SEARCH_TRACK':
            return{
                ...state,
                track_list:action.payload,
                heading: 'Search Result'
            };
            default:
                return state
    }
}

export class Provider extends Component {
    state = {
            track_list: [],
            heading:'Top 10 Tracks',
            dispatch: action =>this.setState(state=>reducer(state,action))
        };

    componentDidMount(){
     axios.get(`https://secret-ocean-49799.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
     .then(res=>{
         //console.log(res.data)
         this.setState({track_list:res.data.message.body.track_list})
     })
     .catch(err=>{
         console.log(err);
     })
    }
    

    render() {
        return (
         <Context.Provider value={this.state}>
             {this.props.children}
         </Context.Provider>
        )
    }
}

export const Consumer=Context.Consumer
