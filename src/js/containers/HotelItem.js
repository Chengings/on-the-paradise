'use strict'

import React from 'react'
import { currencyCodeToSymbol } from '../util'
import StarRating from '../components/StarRating'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'

class HotelItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDescription: false
    }
  }

  handleDescriptionClick () {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  render () {
    const {
      currency,
      departure_airport: departureAirport,
      departure_date: departureDate,
      description,
      guests,
      image,
      location,
      name,
      nights,
      price,
      rating
    } = this.props.item
    const { showDescription } = this.state
    const imgElement = !image ? '' : (
      <img
        className={'image-fit'}
        src={image}
      />
    )
    const descriptionElement = description && showDescription ? (<div className='hotel-description'>
      <div className='hotel-overview'>Overview</div>
      <p>{description}</p>
    </div>) : ''
    const descriptionButtonLabel = <span><strong>Read {showDescription ? 'less' : 'more'}</strong> about this hotel</span>
    const descriptionArrowElement = showDescription ? faAngleDown : faAngleRight
    const titleElement = !name ? '' : <div className='hotel-name'>{name}</div>
    const locationElement = !location ? '' : <div className='hotel-location'>{location}</div>
    const ratingComponent = !rating ? '' : <StarRating rate={rating} color='#fedc07' />
    const guestsElement = !guests ? '' : <div>{guests}</div>
    const departureAirportElement = !departureAirport ? '' : (
      <div>{`Departing from `}<strong>{departureAirport}</strong></div>
    )
    const departDateElement = !departureDate ? '' : <span>{moment(departureDate).format('Do MMMM YYYY')}</span>
    const nightsElement = !nights ? '' : (<span>{' for '}<strong>{nights}{' days'}</strong></span>)
    const departDateNightsElement = <div><strong>{departDateElement}</strong>{nightsElement}</div>
    const priceElement = !price ? '' : <span>{price}</span>
    const currencyElement = !currency ? '' : <span>{currencyCodeToSymbol(currency)}</span>

    const priceCurrencyElement = price && currency
      ? <div className='hotel-price cursor-pointer' onClick={() => this.props.onClick()}>
        <div>Book now</div>
        <strong>{currencyElement}{priceElement}</strong>
      </div>
      : ''

    return (
      <div className='g-wrapper hotel-wrapper'>
        <div className='g-hotel-item-image hotel-item-image'>
          {imgElement}
          {<div className='hotel-item-read-toggle cursor-pointer' onClick={(e) => this.handleDescriptionClick(e)}>
            {descriptionButtonLabel}
            <FontAwesomeIcon
              className='float-right'
              icon={descriptionArrowElement}
              size='lg'
            />
          </div>}
        </div>
        <div className='g-hotel-item-detail hotel-container'>
          {titleElement}
          {locationElement}
          {ratingComponent}
          <div className='hotel-sub-container'>
            {guestsElement}
            {departDateNightsElement}
            {departureAirportElement}
          </div>
          {priceCurrencyElement}
        </div>
        <div className='g-hotel-item-description'>
          {descriptionElement}
        </div>
      </div>
    )
  }
}

export default HotelItem
