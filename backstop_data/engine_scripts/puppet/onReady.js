module.exports = async (page, scenario) => {
  console.log('SCENARIO > ' + scenario.label)
  await require('./clickAndHoverHelper')(page, scenario)

  // add more ready handlers here...
}
