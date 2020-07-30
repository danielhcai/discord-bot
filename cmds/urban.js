const Discord = module.require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
    if(args.length == 0) {
        return message.channel.send("-wiki (search)");
    }

    var urbanURL = "http://api.urbandictionary.com/v0/define?term=";
    var search = args.join(" ");

    var url = urbanURL+search;

    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.error){
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("An Error has Occured")
                    .setColor("#8076AA"));
            }

            let definitions = json.list;
            let length = definitions.length;
            if(length == 0) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("Invalid Search")
                    .setColor("#8076AA"));
            }

            let i = 0;
            let found;
            while(i < length) {
                if(definitions[i].definition.length < 750) {
                    found = definitions[i];
                    i = length;
                }
                i++;
            }

            if(!found){
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("No Results Found")
                    .setColor("#8076AA"));
            }


            let embed = new Discord.MessageEmbed()
                .setDescription(`[**${found.word}**](${found.permalink})\nBy: ${found.author}`)
                .addField("Defintion", found.definition)
                .addField("Example", found.example)
                .setColor("#8076AA");

            message.channel.send(embed);
        });
}

module.exports.help = {
    name: "urban"
}
