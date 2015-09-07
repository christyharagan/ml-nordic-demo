#!/usr/bin/env node

require('../dist/server').getServer().catch(function(e) {
  console.log(e)
  console.log(e.stack)
  process.exit()
})
