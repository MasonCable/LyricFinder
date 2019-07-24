import React, { Component } from 'react'
import axios from 'axios'

class Lyrics extends Component {
    state = {
        track:{},
        lyrics: ''
    }

    componentDidMount(){
          axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`) // This api call handles getting the song lyrics
                .then(res => {
                    console.log(res.data.message.body.lyrics.lyrics_body)
                    let lyrics = res.data.message.body.lyrics.lyrics_body
                    this.setState({ lyrics: lyrics })

                    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`) //This API call handles the Songs Meta Data, like trakc name and stuff
                }).then(res => {
                    // console.log(res.data)
                 })
                    .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <p>{this.state.lyrics}</p>
            </div>
        )
    }
}

export default Lyrics