import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Layout/Spinner'
import { Link } from 'react-router-dom'

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    }

    componentDidMount(){
          axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`) // This api call handles getting the song lyrics
                .then(res => {
                    
                    //use this in case of bug!!
                    //console.log(res.data.message.body.lyrics.lyrics_body)
                    
                    this.setState({ lyrics: res.data.message.body.lyrics})

                    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`) //This API call handles the Songs Meta Data, like trakc name and stuff
                }).then(res => {
                    // console.log(res.data)
                    this.setState({ track: res.data.message.body.track})
                    
                 })
                    .catch(err => console.log(err))
    }

    render(){
        const { track, lyrics } = this.state

        if(track === undefined || 
        lyrics === undefined 
        // Object.keys(track).length === 0 ||
        // Object.keys(lyrics).length === 0
        ) {
            return <Spinner/>
        }
        else {
        return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} by {' '}
                            <span className="text-secondary">{track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">{ lyrics.lyrics_body }</p>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics