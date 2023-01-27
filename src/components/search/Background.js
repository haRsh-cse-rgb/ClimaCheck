import React from 'react'
import '../../App.css';


function Background({data}) {
    return (
        <>  <video className="background-video" autoPlay loop muted>
            <source src={`background/${data.weather[0].icon}.mp4`} type="video/mp4" autoPlay loop muted/>
        </video>
        </>
    );
}

export default Background;