import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Layout/Spinner'

class Lyrics extends Component {
    state = {
        track:{},
        lyricString: ''
    }

    componentDidMount(){
          axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`) // This api call handles getting the song lyrics
                .then(res => {
                    console.log(res.data.message.body.lyrics.lyrics_body)
                    let lyrics = res.data.message.body.lyrics.lyrics_body // this assigns the lyric sting to a variable
                    let lyricObj = res.data.message.body.lyrics

                    this.setState({ 
                        lyricString: lyrics,
                        track: lyricObj
                     })

                    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`) //This API call handles the Songs Meta Data, like trakc name and stuff
                }).then(res => {
                    // console.log(res.data)
                 })
                    .catch(err => console.log(err))
    }

    render(){
        const { track, lyrics } = this.state
        if(this.state.lyricString === undefined || this.state.lyricString === '') {
            return <Spinner/>
        }
        else {
        return (
                <div>
                    <p>{this.state.lyricString}</p>
                </div>
            )
        }
    }
}

export default Lyrics