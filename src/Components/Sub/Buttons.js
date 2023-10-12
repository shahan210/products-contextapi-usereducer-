import React from 'react'

export default function Buttons({isInfo,name,...rest}) {
  return (
    <button style={{cursor:'pointer'}} {...rest}>{name}</button>
  )
}
