// Basic use of useState Hook

import React, { useState } from 'react'

const UseStateHook_1 = () => {
    const [count, setCount] = useState(0)
    const handleCount = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <button onClick={handleCount}>Click Here</button>
            <p>Count {count}</p>
        </div>
    )
}

export default UseStateHook_1