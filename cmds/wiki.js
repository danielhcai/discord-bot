const Discord = module.require("discord.js");
const snekfetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

	if(!args) return message.channel.send(`${guildSettings.prefix}wiki (search)`);

	var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&redirects=resolve&search=";
	//var wikiURLMessage = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&format=json&titles=";

	var search = args.join(" ");


	var url = wikiURL+search;

	snekfetch.get(url).then(r =>{
		var body = r.body;

		var choice = 0;

		var name = body[1][choice];
		var result = body[2][choice];
		var resulturl = body[3][choice];

		//console.log(r);
		//console.log(body);

		if(!name) return message.channel.send(new Discord.RichEmbed()
			.setTitle("Invalid Search")
			.setColor("#8076AA"));
		
		if(result ===`${name} may refer to:`) result = "Multiple Results Found";

		let embed = new Discord.RichEmbed()
			.setDescription(`[**${name}**](${resulturl})\n${result}`)
			.setColor("#8076AA");

		message.channel.send(embed);
	});


	
}

module.exports.help = {
	name: "wiki"
}