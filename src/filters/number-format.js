const numberFormat = (value) => {
  return new Intl.NumberFormat('es').format(value)
}

export default numberFormat
