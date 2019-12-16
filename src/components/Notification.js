import React from 'react'

const style = {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '5px',
    border: '1px solid black',
    padding: '5px'
}

const Notification = ({ message }) => {
    if (message !== null) {
        return (
            <div style={style}>
                <p>{message}</p>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default Notification