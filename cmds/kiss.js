const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let mentions = message.mentions.users;
    if(mentions.size > 1) {
        return message.channel.send("You can only kiss one person at a time!");
    }

    let mentionedUser = mentions.first();
  	if(!mentionedUser) {
        return message.channel.send("Usage: -kiss @user")
    }
  	if(message.author === mentionedUser) {
        return message.channel.send("You can't kiss yourself!");
    }

    let give = message.author.username;
    let receive = mentionedUser.username;
    if(message.channel.type != "dm") {
        give = message.member.displayName;
        receive = message.mentions.members.first().displayName;
    }
	var i = Math.floor(Math.random()*client.kiss.length);

	console.log(client.kiss.length)

  	let embed = new Discord.MessageEmbed()
  		.setDescription(`**${give}** kissed **${receive}**`)
    	.setImage(client.kiss[i].url)
    	.setColor("#8076AA");

    message.channel.send(embed);
}

module.exports.help = {
	name: "kiss"
}
