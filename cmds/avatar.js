const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Get the avatar of a user
  var guildSettings;
  if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  else guildSettings = client.defaultSettings;

  var member;

	if(args.length==0){
  	member = message.author;
  }
    
  else{
  	var mention = message.mentions.users.array();
  	if(mention.length == 0) member = message.author;
  	else member = mention[0];
  }
  		

  	let embed = new Discord.RichEmbed()
  		.setDescription(`[Avatar of **${member.username}**](${member.displayAvatarURL})`)
    	.setThumbnail(member.displayAvatarURL)
    	.setColor("#8076AA");

    message.channel.send(embed);
}

module.exports.help = {
	name: "avatar"
}