import React from 'react'
import { Consumer } from '../../context'
import Spinner from '../Layout/Spinner'
import Track from './Track'

const Tracks = () => {
    return(
        <Consumer>
            {value => {
            const {track_list, heading} = value
            //   console.log(track_list.map(item => console.log(item.track.track_id)))
              if(track_list === undefined || track_list.length === 0) {
                return <Spinner/>
              }
              else {
                  return (
                    <React.Fragment>
                        <h3 className="text-center mb-4">{ heading }</h3>
                        <div className="row">
                            {track_list.map(item => (
                                <Track  key={item.track.track_id} track={item.track}/>
                            ))}
                        </div>
                    </React.Fragment>
                )  
              }
              
            }}
        </Consumer>        
    )
}

export default Tracks