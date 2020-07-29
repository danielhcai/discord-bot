const Discord = module.require("discord.js");
const snekfetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
	var guildSettings;
	if(message.channel.text == "dm") guildSettings = client.defaultSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	
	if(!args) return message.channel.send(`${guildSettings.prefix}wiki (search)`);

	var urbanURL = "http://api.urbandictionary.com/v0/define?term=";
	var search = args.join(" ");

	var url = urbanURL+search;

	snekfetch.get(url).then(r =>{

		if(!r) return message.channel.send(new Discord.RichEmbed()
			.setTitle("Invalid Search")
			.setColor("#50e080"));

		var result = r.body.list;

		var found;
		var i = 0;
		while(i<result.length){
			if(result[i].definition.length<750){
				found = result[i];
				i = result.length;
			}
			if(i==result.length-1) return message.channel.send("No Results Found");
			i++;
		}
		

		//console.log(r);
		//console.log(body)

		

		let embed = new Discord.RichEmbed()
			.setDescription(`[**${found.word}**](${found.permalink})\nBy: ${found.author}`)
			.addField("Defintion", found.definition)
			.addField("Example", found.example)
			.setColor("#50e080");

		message.channel.send(embed);
	});

}

module.exports.help = {
	name: "urban"
}