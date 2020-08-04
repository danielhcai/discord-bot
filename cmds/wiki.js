const Discord = module.require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
	if(!args) {
        return message.channel.send(`${guildSettings.prefix}wiki (search)`);
    }

	let wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&redirects=resolve&search=";

	let search = args.join(" ");


    let url = wikiURL+search;

    fetch(url)
        .then(res => res.json())
        .then(json => {
            let choice = 0;

            console.log(json);

            let names = json[1];
            let numResults = names.length;
            let resultURL = json[3];

            if(numResults == 0) return message.channel.send(new Discord.MessageEmbed()
                .setTitle("Invalid Search")
                .setColor("#8076AA"));

            results = "";

            for(let i = 0; i < numResults; i++) {
                results += `[${names[i]}](${resultURL[i]})` + "\n";
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(`Search: ${search}`)
                .setDescription(results)
                .setColor("8076AA");

            message.channel.send(embed);

        });
}

module.exports.help = {
    name: "wiki"
}
