'use strict'

export function sortByProperty (property) {
  return (a, b) => ((a[property] === b[property]) ? 0 : ((a[property] > b[property]) ? 1 : -1))
}

export function currencyCodeToSymbol (code) {
  let currencySymbol
  if (code) {
    code = code.toLowerCase()
  }

  switch (code) {
    case 'gbp':
      currencySymbol = '£'
      break
    case 'usd':
    case 'aud':
    case 'cad':
      currencySymbol = '$'
      break
    default:
      currencySymbol = ''
  }

  return currencySymbol
}
