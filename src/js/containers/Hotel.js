/* eslint-env browser */
'use strict'

import React from 'react'
import HotelItem from './HotelItem'

class Hotel extends React.Component {
  handleOnClickHotelItem () {
    alert('Book now!')
  }

  render () {
    const renderer = []
    if (Object.keys(this.props.items).length) {
      this.props.items.data.map(hotel => {
        renderer.push(<HotelItem key={hotel.name} item={hotel} onClick={e => this.handleOnClickHotelItem(e)} />)
      })
    }
    return renderer
  }
}

export default Hotel
