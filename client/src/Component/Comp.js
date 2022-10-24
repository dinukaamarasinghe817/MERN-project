import React, {useEffect, useState} from 'react'

function Comp({data}){
    return (
        <div className='empty'>
            <h1>
                Email fetch from server : {(data.id, data.disease)}
            </h1>
        </div>
    )
    
}

export default Comp