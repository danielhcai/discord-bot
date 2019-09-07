const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Calculates ping by sending a message and editing it; round-trip latency
	// Calculates average latency between the bot and the websocket server; one-way 
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

}

module.exports.help = {
	name: "ping"
}