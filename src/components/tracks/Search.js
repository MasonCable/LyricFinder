import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'

class Search extends Component {
    state = {
        trackTitle:''
    }

    onChange = (e) => { // the .bind on line 33 does the same thing as this arrow function
        this.setState({
            trackTitle : e.target.value
        })
    }

    findTrack = (dispatch, e) => {
        e.preventDefault()
        
          axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                })

                this.setState({ trackTitle: '' })
            })
            .catch(err => console.log(err))
    }

    // onChange = (e) => { // the .bind on line 33 does the same thing as this arrow function
    //     this.setState({
    //         [e.target.name] :e.target.value
    //     })
    // }  THIS FUNCTION DOES THE SAME THING AS THE ONE ABOVE IT, JUST WRITTEN DIFERANTLY ... SORRY I CANT SPELL IF YOURE READING THIS

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value

                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search for a song
                            </h1>
                            <p className="lead text-center">Get The Lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text" 
                                    className="form-control lg"
                                    placeholder="Song Title..."
                                    name="trackTitle"
                                    value={this.state.trackTitle}
                                    onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search