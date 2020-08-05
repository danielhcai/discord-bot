const Discord = module.require("discord.js");
const fetch = require("node-fetch");
const htmlEncode = require("js-htmlencode");

module.exports.run = async (client, message, args) => {

    if(!args) {
        return message.channel.send(`-wiki (search)`);
    }

    let url = `https://api.wordnik.com/v4/word.json/${args[0]}/definitions?limit=5&includeRelated=false&useCanonical=true&includeTags=false&api_key=${client.config.wordnik}`;

    fetch(url)
        .then(res => res.json())
        .then(json =>{
            if(json.error) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("Invalid Search")
                    .setColor("#8076AA"));
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(`Defintions for: ${args[0]}`);

            let numDefinitions = json.length;

            for(let i = 0; i < numDefinitions; i++) {
                let definition = json[i];
                embed.addField(`${i+1}. (${definition.partOfSpeech})`, definition.text);
            }

            console.log(json);
            message.channel.send(embed);
        });
}

module.exports.help = {
    name: "define"
}
