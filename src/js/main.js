/* eslint-env browser */
'use strict'

import React from 'react'
import { render } from 'react-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Sorter from './components/Sorter'
import Hotel from './containers/Hotel'
import { sortByProperty } from './util'
// assume that we call from API or model
import hotelsResponse from './data.json'
import moment from 'moment'
import { faPoundSign, faSortAlphaDown, faStar } from '@fortawesome/free-solid-svg-icons'

class MainApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hotelData: {},
      departureAirportsList: [],
      departureDatesList: [],
      filterDate: '',
      activeFilter: '',
      activeSorter: ''
    }

    this.constant = {
      sortAsc: 'asc',
      sortDesc: 'desc',
      fieldName: 'name',
      fieldPrice: 'price',
      fieldRating: 'rating'
    }

    this.sortByPrice = React.createRef()
  }

  handleResetFilterClick () {
    this.setState({
      hotelData: hotelsResponse,
      activeFilter: ''
    })
  }

  handleSorterClick (propToSort, sortDirection) {
    const { data } = hotelsResponse
    let sortedHotelList = data.sort(sortByProperty(propToSort))

    if (this.state.activeFilter) {
      sortedHotelList = this.filterAirport(sortedHotelList, this.state.activeFilter)
    }

    if (sortDirection === this.constant.sortDesc) {
      sortedHotelList = sortedHotelList.reverse()
    }

    this.setState({
      hotelData: {
        data: sortedHotelList
      },
      activeSorter: propToSort
    })
  }

  filterAirport (filterList, airport) {
    return filterList.filter((value) => {
      return value.departure_airport === airport
    })
  }

  handleFilterClick (propToFilter) {
    const filteredHotelDataList = this.filterAirport(hotelsResponse.data, propToFilter)

    this.setState({
      hotelData: {
        data: filteredHotelDataList
      },
      activeFilter: propToFilter
    })
  }

  handleFilterDateChange (date) {
    const filteredHotelDataList = hotelsResponse.data.filter((value) => {
      return moment(value.departure_date).isSame(date, 'day')
    })

    this.setState({
      filterDate: date,
      hotelData: {
        data: filteredHotelDataList
      }
    })
  }

  render () {
    let airportFilter
    const clearFilterElement = <div><button onClick={e => this.handleResetFilterClick(e)}>Reset all filters</button></div>

    if (this.state.departureAirportsList.length) {
      airportFilter = this.state.departureAirportsList.map((airport) => {
        const isActive = (airport === this.state.activeFilter) ? 'filterer-active' : ''
        return <div
          className={`filterer-item ${isActive}`}
          key={airport}
          onClick={e => this.handleFilterClick(airport, e)}
        >
          {airport}
        </div>
      })
    }

    const dateFilterElement = <DatePicker
      dateFormat='do MMMM yyyy'
      placeholderText='Select a date'
      includeDates={this.state.departureDatesList}
      selected={this.state.filterDate}
      onChange={e => this.handleFilterDateChange(e)}
    />

    return (
      <div className='g-container'>
        <div>
          <div className='sorter'>
            <Sorter
              icon={faSortAlphaDown}
              name='alpha'
              label='name'
              isActiveSorter={this.state.activeSorter === this.constant.fieldName}
              onClick={e => this.handleSorterClick(this.constant.fieldName, this.constant.sortAsc, e)}
            />
            <Sorter
              icon={faPoundSign}
              name='price'
              label='price'
              sorterRef={this.sortByPrice}
              isActiveSorter={this.state.activeSorter === this.constant.fieldPrice}
              onClick={e => this.handleSorterClick(this.constant.fieldPrice, this.constant.sortAsc, e)}
            />
            <Sorter
              icon={faStar}
              name='rating'
              label='rating'
              isActiveSorter={this.state.activeSorter === this.constant.fieldRating}
              onClick={e => this.handleSorterClick(this.constant.fieldRating, this.constant.sortDesc, e)}
            />
          </div>
          <div className='filterer'>
            <div>
              <h3>Departing From</h3>
              <div>{airportFilter}</div>
            </div>
            <div>
              <h3>Departing Date</h3>
              <div>{dateFilterElement}</div>
            </div>
            <div>{clearFilterElement}</div>
          </div>
        </div>
        <div>
          <Hotel items={this.state.hotelData} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    const tmpDepartureAirportsList = hotelsResponse.data.map(element => element.departure_airport)
    const departureAirportsList = [...new Set(tmpDepartureAirportsList)]
    const departureDatesList = hotelsResponse.data.map((element) => {
      return moment(element.departure_date).toDate()
    })

    this.setState({
      hotelData: hotelsResponse,
      departureAirportsList,
      departureDatesList
    })

    this.sortByPrice.current.click()
  }
}

render(<MainApp />, document.getElementById('main-app'))
