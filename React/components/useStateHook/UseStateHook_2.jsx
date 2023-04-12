// when state will be changed depending on previous state value use prev state func in useState

import React, { useState } from 'react'

const UseStateHook_2 = () => {
    const initial = 0
    const [count, setCount] = useState(initial)
    return (
        <>
            <div>Count {count}</div>
            <button onClick={() => setCount(prev => { return prev + 1 })}>inc</button>
            <button onClick={() => setCount(prev => { return prev - 1 })}>dec</button>
            <button onClick={() => setCount(prev => { return prev + 7 })}>inc 7</button>
            <button onClick={() => setCount(initial)}>reset</button>
        </>
    )
}

export default UseStateHook_2