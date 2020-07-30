const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Sends link with commands and code
	let commandIter = client.commands.keys();
    let commandString = "";

    let cmd = commandIter.next();
    while(!cmd.done) {
        commandString += "-" + cmd.value + "\n";
        cmd = commandIter.next();
    }

    console.log(client.commands.keyArray());
	let embed = new Discord.MessageEmbed()
   		.addField("Commands:", commandString, true)
   		.setColor("#8076AA");

    return message.author.send(embed);
}

module.exports.help = {
	name: "help"
}
