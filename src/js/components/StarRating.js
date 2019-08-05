'use strict'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class StarRating extends React.Component {
  render () {
    let rate

    if (this.props.rate) {
      rate = []
      for (let i = this.props.rate; i > 0; i--) {
        rate.push(<FontAwesomeIcon color={this.props.color} icon={faStar} />)
      }
    } else {
      rate = 'No rating'
    }

    return <span>{rate}</span>
  }
}

export default StarRating
