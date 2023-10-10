import React from 'react'

export default function Buttons({name,...rest}) {
  return (
    <button style={{cursor:'pointer'}} {...rest}>{name}</button>
  )
}
