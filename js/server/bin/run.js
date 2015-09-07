#!/usr/bin/env node

require('../server').getServer().catch(function(e) {
  console.log(e)
  console.log(e.stack)
  process.exit()
})
