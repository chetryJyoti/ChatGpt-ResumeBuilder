import React from 'react'
import {SyncLoader} from "react-spinners";
const Loading = () => {
  return (
    <div className='app'>Loading please wait...
    <SyncLoader
        color={"#5d3891"}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={8}
      />
    </div>
    
  )
}

export default Loading