//  useState hook with array

import React, { useState } from 'react'

const UseStateHook_4 = () => {

    const [items, setItems] = useState([])


    const generateRandomItemName = () => {
        const adjectives = ["shiny", "rusty", "glowing", "polished", "faded", "cracked"];
        const materials = ["iron", "wood", "stone", "diamond", "gold", "obsidian"];
        const nouns = ["sword", "shield", "ring", "amulet", "staff", "helm"];
        const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
        const materialIndex = Math.floor(Math.random() * materials.length);
        const nounIndex = Math.floor(Math.random() * nouns.length);
        return `${adjectives[adjectiveIndex]} ${materials[materialIndex]} ${nouns[nounIndex]}`;
    }

    const addItem = () => {
        setItems([...items, {
            id: items.length,
            name: generateRandomItemName()
        }])
    }

    return (
        <>
            <div>
                <h2>List of items</h2>
                {
                    items.map((item) => (
                        <div style={{ display: 'flex', gap: '4px' }} key={item.id}>
                            <div>{item.id}</div>
                            <div>{item.name}</div>
                        </div>
                    ))
                }

                <button onClick={addItem}>Add item</button>

            </div>
        </>
    )
}

export default UseStateHook_4