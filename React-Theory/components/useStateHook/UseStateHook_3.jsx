// useState hook with object

import React, { useState } from 'react'

const UseStateHook_3 = () => {
    const [name, setName] = useState({ first: "Subham", last: "Haldar" })


    return (
        <>
            <div>
                <input type="text" placeholder='Enter your first name' onChange={(e) => { return setName({ ...name, first: e.target.value }) }} />
                <input type="text" placeholder='Enter your last name' onChange={(e) => { return setName({ ...name, last: e.target.value }) }} />
                <h1>Fist Name is {name.first}</h1>
                <h1>Last Name is {name.last}</h1>
            </div>
        </>
    )
}

export default UseStateHook_3