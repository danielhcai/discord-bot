# Discord Bot

## Overview
A basic basic discord bot. All commands can be found in the cmds folder and the code for the bot can be found in the bot.js file.

## Usage
1. Set up a discord bot in the discord developer portal (https://discord.com/developers).
2. Create an application and add a bot.
3. Find the token and add into a config.json file. An example can be found in config-example.json.
4. Run the command "node bot.js" from the command line

## Other
- Running the bot requires Node and the dependencies in the package.json file.
- The nytimes and define commands will not work without an API key for New York Times and Worknik. If you do not have an API key, simply remove the command from the cmds folder and those lines on the config file. However, both are free to sign up for.

