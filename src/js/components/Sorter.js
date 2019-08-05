'use strict'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Sorter extends React.Component {
  render () {
    const isActiveSorterClass = this.props.isActiveSorter ? 'sorter-active' : ''
    const labelElement = !this.props.label ? '' : <span>Sort by <strong>{this.props.label}</strong></span>
    const iconElement = !this.props.icon ? '' : <span className='float-right'><FontAwesomeIcon icon={this.props.icon} /></span>

    return (
      <div
        className={`sorter-item ${isActiveSorterClass}`}
        key={`sorter-${this.props.name}`}
        onClick={() => this.props.onClick()}
        ref={this.props.sorterRef}
      >
        {labelElement}
        {iconElement}
      </div>
    )
  }
}

export default Sorter
