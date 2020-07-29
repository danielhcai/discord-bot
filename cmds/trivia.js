const Discord = module.require("discord.js");
const snekfetch = require("node-fetch")
const htmlEncode = require("js-htmlencode");

module.exports.run = async (client, message, args) => {
	// Generates a Trivia Questions
	
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

	if(args.includes("help")){
		let embed = new Discord.RichEmbed()
    		.addField("Trivia Help", `
    			Usage: -trivia (Category Number) (Difficult) (Question Type)
    			\n**Category**
    			\n\t\tAll Categories: 0
    			\n\t\tGeneral Knowledge: 9
    			\n\t\tBooks: 10
    			\n\t\tFilm: 11
    			\n\t\tMusic: 12
    			\n\t\tMusical & Theatere: 13
    			\n\t\tTelevision: 14
    			\n\t\tVideo Games: 15 
    			\n\t\tBoard Games: 16
    			\n\t\tScience & Nature: 17
    			\n\t\tComputers: 18
    			\n\t\tMathmatics: 19
    			\n\t\tMythology: 20
    			\n\t\tSports: 21
    			\n\t\tGeography: 22
    			\n\t\tHistory: 23
    			\n\t\tPolitics: 24
    			\n\t\tNature: 25
    			\n\t\tCelebrities: 26
    			\n\t\tAnimals: 27
    			\n\t\tVechicles: 28
    			\n\t\tComics: 29
    			\n\t\tGadgets: 30
    			\n\t\tAnima & Manga: 31
    			\n\t\tCartoons & Animations: 32
    			\n**Difficulty**
    			\n\t\tEasy: easy
    			\n\t\tMedium: medium
    			\n\t\tHard: hard
    			\n**Type**
    			\n\t\tMultple Choice: mc
    			\n\t\tTrue/False: tf
    		`)
    		.setColor("#50e080");

    	return message.author.send(embed);
	}

	for(var i = 0; i < args.length; i++) {
		args[i] = args[i].toLowerCase();
	}

	var category = "&category=" + args.filter(f => !isNaN(f)&&Number(f)>8&&Number(f)<33).shift();
	if(category === "&category=undefined") category = "";

	var difficulty= "&difficulty=" + args.filter(f => f==="easy"||f==="medium"||f==="hard").shift();
	if(difficulty === "&difficulty=undefined") difficulty = "";

	var type = args.filter(f => f==="mc"||f==="tf").shift();
	if(!type) type = "";
	if(type === "mc") type = "&type=multiple";
	if(type === "tf") type = "&type=boolean";

	var url = `https://opentdb.com/api.php?amount=1${category}${difficulty}${type}`;
	
	

	snekfetch.get(url).then(async r =>{

		if(!r) return message.channel.send(new Discord.RichEmbed()
			.setTitle("This command is temporarily down.")
			.setColor("#8076AA"));

		var results = r.body.results[0];
		

		var embed;
		var answers = ["True", "False"];

		var question = results.question
		question = htmlEncode.htmlDecode(question);


		if(results.type === "multiple"){
			answers = [results.correct_answer].concat(results.incorrect_answers);

			for(var i = 0; i < answers.length; i++) {
				answers[i] = htmlEncode.htmlDecode(answers[i]);
			}

			function shuffle(a) {
    			var j, x, i;
    			for(i = a.length - 1; i > 0; i--) {
       				j = Math.floor(Math.random() * (i + 1));
        			x = a[i];
        			a[i] = a[j];
        			a[j] = x;
    			}
			}
			shuffle(answers);
			embed = new Discord.RichEmbed()
				.addField(`**Question: ${question}**`, `**A)** ${answers[0]}\n**B)** ${answers[1]}\n**C)** ${answers[2]}\n**D)** ${answers[3]}`)
				.setColor("#8076AA");
		}

		else{
			embed = new Discord.RichEmbed()
				.addField(`**Question: ${question}**`,`**A)** True\n**B)** False`)
				.setColor("#8076AA");
		}

		await message.channel.send(embed);

		var pre = guildSettings.prefix;
		var tfAns = [`${pre}a`,`${pre}b`,`${pre}trivia`];
		var mAns = [`${pre}a`,`${pre}b`,`${pre}c`,`${pre}d`,`${pre}trivia`];
		var answer;

		var answerFilter = msg => tfAns.includes(msg.content.split(/ +/g).shift().toLowerCase());

		if(results.type == "multiple"){
			answerFilter = msg => mAns.includes(msg.content.split(/ +/g).shift().toLowerCase());
		}

		var shop;
		await message.channel.awaitMessages(answerFilter,{maxMatches:1, time:60000})
		.then(collected => {answer = collected.first().content.split(/ +/g).shift().toLowerCase(); shop = client.currency.get(collected.first().author.id);})
		.catch(collected => message.channel.send(`Triva Question has Expired`));
		if(answer == "-trivia") return;
		answer = answer.toLowerCase();

		var arrayAnswer;
		switch(answer){
    		case "-a":
       			arrayAnswer = 0;
        		break;
    		case "-b":
        		arrayAnswer = 1;
        		break;
    		case "-c":
        		arrayAnswer = 2;
        		break;
    		case "-d":
        		arrayAnswer = 3;
        		break;
		}

		if(answers[arrayAnswer]==results.correct_answer){
			var coin;
			if(results.difficulty == "easy"){
				shop.coins = shop.coins + 1;
				coin = 1;
			}
			if(results.difficulty == "medium"){
				shop.coins = shop.coins + 2;
				coin = 2;
			}
			if(results.difficulty == "hard"){
				shop.coins = shop.coins + 3;
				coin = 3;
			}
			client.currency.set(message.author.id, shop);
			return message.channel.send(`Correct! You have gained ${coin} coins!`);
		} 
		if(results.incorrect_answers.includes(answers[arrayAnswer])) return message.channel.send(`The Correct answer was ${htmlEncode.htmlDecode(results.correct_answer)}`)
	});
}

module.exports.help = {
	name: "trivia"
}