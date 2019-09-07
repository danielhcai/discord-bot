const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");
const htmlEncode = require("js-htmlencode");

module.exports.run = async (client, message, args) => {
	/*
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

	if(!args) return message.channel.send(`${guildSettings.prefix}wiki (search)`);

	var url = `http://api.wordnik.com/v4/word.json/${args[0]}/definitios?limit=5&includeRelated=true&useCanonical=false&includeTags=false&api_key=${client.config.define}`;

	snekfetch.get(url).then(async r =>{

		if(!args[0]) return message.channel.send(new Discord.RichEmbed()
			.setTitle("Specify a word!")
			.setColor("#8076AA"));

		definitions = JSON.parse(r.text);

		if(!definitions[0]) return message.channel.send(new Discord.RichEmbed()
			.setTitle("Invalid Search")
			.setColor("#8076AA"));
		else{
			var def = "";
			var length = definitions.length;

			for(i=0;i<length;i++){
				def = def.concat(`**${1+i})** ${definitions[i].partOfSpeech} **-** ${definitions[i].text}\n`);
			}

			return message.channel.send(new Discord.RichEmbed()
			.setTitle(`**Definitions for "${args[0]}"**`)
			.setDescription(def)
			.setColor("#8076AA"));
		}
	});
	*/

}

module.exports.help = {
	name: "define"
}