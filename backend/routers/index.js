const routeGet = require("./Gets")
const routerPos = require("./Posts")
const routerDelete = require("./Delete")

// Export the mix between gets and posts routers

module.exports = {routeGet, routerPos, routerDelete}