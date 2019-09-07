const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Calculates ping by sending a message and editing it; round-trip latency
	// Calculates average latency between the bot and the websocket server; one-way 
    const sayMessage = args.join(" ");
    message.delete().catch(e=>{}); 
    message.channel.send(sayMessage);

}

module.exports.help = {
	name: "say"
}
    	