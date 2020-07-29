const Discord = module.require("discord.js");
const snekfetch = require("node-fetch");
const htmlEncode = require("js-htmlencode");

module.exports.run = async (client, message, args) => {
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

	if(!args) return message.channel.send(`${guildSettings.prefix}wiki (search)`);

	var wikiURL = `http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${client.config.nytimes}&q=`;

	var search = args.join(" ");


	var url = wikiURL+search;

	snekfetch.get(url).then(async r =>{

		var t = JSON.parse(r.text);

		if(!args[0]) return message.channel.send(new Discord.RichEmbed()
			.setTitle("Specify what you want to search!")
			.setColor("#8076AA"));

		if(r.status!=200) return message.channel.send(new Discord.RichEmbed()
			.setTitle("This command is temporarily down.")
			.setColor("#8076AA"));
		
		if(t.response.meta.hits<1) return message.channel.send(new Discord.RichEmbed()
			.setTitle("Invalid Search")
			.setColor("#8076AA"));

		var doc = t.response.meta.hits;
		if(doc>5) doc = 5;

		var news = "";

		for(i=0;i<doc;i++){
			news = news.concat(`**${i+1})** ${t.response.docs[i].type_of_material.toUpperCase()} - ${t.response.docs[i].headline.main}\n`);
		}

		message.channel.send(new Discord.RichEmbed()
			.setTitle(`**Searches for "${search}"**`)
			.setDescription(news)
			.setColor("#8076AA"));
			

		var pre = guildSettings.prefix;

		var choose = [`${pre}1`,`${pre}2`,`${pre}3`,`${pre}4`,`${pre}5`,`${pre}nytimes`];
		var answer;
		var choice;

		var answerFilter = msg => choose.includes(msg.content.split(/ +/g).shift().toLowerCase());

		await message.channel.awaitMessages(answerFilter,{maxMatches:1, time:180000})
		.then(collected => {answer = collected.first().content.split(/ +/g).shift().toLowerCase();})
		.catch(collected => message.channel.send(`Search for "${search}" has expired`));
		
		if(answer === "-nytimes") return;
		
		answer = answer.slice(1,2);
		var choice = Number(answer)-1

		var article = t.response.docs[choice];

		var author = "";
		if(!article.byline) author = "";
		else author = (` - ${article.byline.original}`);

		var image;
		if(article.multimedia[0]) image = `http://www.nytimes.com/${article.multimedia[0].url}`;

		var articleURL = article.web_url.split(".");
		articleURL.shift();
		articleURL.unshift("https://www");
		articleURL = articleURL.join(".");


		let embed = new Discord.RichEmbed()
			.setDescription(`[**${article.headline.main}**](${articleURL})${author}\n\n${htmlEncode.htmlDecode(article.snippet)}`)
			.setImage(image)
			.setColor("#8076AA");

		message.channel.send(embed);
	});


	
}

module.exports.help = {
	name: "nytimes"
}