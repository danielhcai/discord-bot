const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  // Kiss someone
  var guildSettings;
  if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  else guildSettings = client.defaultSettings;

  var user = message.mentions.users.first();
	if(message.channel.type != "dm")var mention = message.mentions.members.first();

  	if(!user) return message.channel.send(`Usage: ${guildSettings.prefix}kiss @user`)

  	if(message.author === user) return message.channel.send("You can't kiss yourself.");

  	if(client.user.id === user.id) return message.channel.send("么么哒!");

	var i = Math.floor(Math.random()*client.kiss.length);

	console.log(client.kiss.length)

  	let embed = new Discord.RichEmbed()
  		.setDescription(`**${message.member.displayName}** kissed **${mention.displayName}**`)
    	.setImage(client.kiss[i].url)
    	.setColor("#8076AA");

    message.channel.send(embed);
}

module.exports.help = {
	name: "kiss"
}
