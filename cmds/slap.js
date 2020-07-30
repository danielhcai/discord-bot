const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let mentions = message.mentions.users;
    if(mentions.size > 1) {
        return message.channel.send("You can only slap one person at a time!");
    }

    let mentionedUser = mentions.first();
  	if(!mentionedUser) {
        return message.channel.send("Usage: -slap @user")
    }
  	if(message.author === mentionedUser) {
        return message.channel.send("You can't slap yourself!");
    }

    let give = message.author.username;
    let receive = mentionedUser.username;
    if(message.channel.type != "dm") {
        give = message.member.displayName;
        receive = message.mentions.members.first().displayName;
    }
	var i = Math.floor(Math.random()*client.slap.length);

	console.log(client.slap.length)

  	let embed = new Discord.MessageEmbed()
  		.setDescription(`**${give}** slaped **${receive}**`)
    	.setImage(client.slap[i].url)
    	.setColor("#8076AA");

    message.channel.send(embed);
}

module.exports.help = {
	name: "slap"
}
