# change External file usage from Require to Import

go to package.json change "type" : "commonjs" to "type" : "module"

# Enable Server auto reload with nodemon

go to package.json under "scripts" : { write "dev" : "nodemon backend/index.js" }

# Link the main server Js file

go to package.json write "Main" : "backend/index.js"

# Run the server with the cli command
npm run dev


# in your server.js file first import or require "express" then "dotenv"

import express from 'express'

*import dotenv to use .env file !*
import dotenv from 'dotenv'


dotenv.config();