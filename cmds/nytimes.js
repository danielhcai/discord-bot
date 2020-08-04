const Discord = module.require("discord.js");
const fetch = require("node-fetch");
const htmlEncode = require("js-htmlencode");

module.exports.run = async (client, message, args) => {
	if(args.length == 0) {
        return message.channel.send("Usage: -nytimes (search)");
    }

	var wikiURL = `http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${client.config.nytimes}&q=`;

	var search = args.join(" ");


	var url = wikiURL+search;

	fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.status != "OK"){
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("Command Temporarily Down")
                    .setColor("#8076AA"));
            }
            let result = json.response;
            if(result.meta.hits == 0){
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("Invalid Search")
                    .setColor("#8076AA"));
            }

            var doc = result.meta.hits;
            if(doc>5) doc = 5;

            var news = "";

            for(i=0;i<doc;i++){
                news = news.concat(`**${i+1})** ${result.docs[i].type_of_material.toUpperCase()} - ${result.docs[i].headline.main}\n`);
            }

            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`**Searches for "${search}"**`)
                .setDescription(news)
                .setColor("#8076AA"));


            let choose = ["-1","-2","-3","-4","-5","-nytimes"];
            let answer;
            let choice;

            var answerFilter = msg => choose.includes(msg.content.split(/ +/g).shift().toLowerCase());

            message.channel.awaitMessages(answerFilter,{maxMatches:1, time:30000})
                .then(collected => {
                    //console.log(collected);
                    answer = collected.first().content.split(/ +/g).shift().toLowerCase();
                    if(answer === "-nytimes") {
                        return;
                    }

                    answer = answer.slice(1,2);
                    choice = Number(answer)-1

                    let article = result.docs[choice];

                    let author;
                    if(!article.byline) {
                        author = "";
                    }
                    else {
                        author = (` - ${article.byline.original}`);
                    }

                    let image;
                    if(article.multimedia[0]) image = `http://www.nytimes.com/${article.multimedia[0].url}`;

                    let articleURL = article.web_url.split(".");
                    articleURL.shift();
                    articleURL.unshift("https://www");
                    articleURL = articleURL.join(".");


                    let embed = new Discord.MessageEmbed()
                        .setDescription(`[**${article.headline.main}**](${articleURL})${author}\n\n${htmlEncode.htmlDecode(article.snippet)}`)
                        .setImage(image)
                        .setColor("#8076AA");

                    message.channel.send(embed);

                })
                .catch(collected => message.channel.send(`Search for "${search}" has expired`));
        });
}

module.exports.help = {
    name: "nytimes"
}
