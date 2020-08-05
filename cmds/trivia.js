const Discord = module.require("discord.js");
const fetch = require("node-fetch")
const htmlEncode = require("js-htmlencode");

module.exports.run = async (client, message, args) => {
    // Generates a Trivia Question

    if(args.includes("help")){
        let embed = new Discord.MessageEmbed()
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



    fetch(url)
        .then(async res => res.json())
        .then(json => {
            //console.log(json);
            
            if(!json) return message.channel.send(new Discord.MessageEmbed()
                .setTitle("This command is temporarily down.")
                .setColor("#8076AA"));

            let results = json.results[0];

            let embed;
            let answers = ["True", "False"];

            let question = results.question
            question = htmlEncode.htmlDecode(question);


            if(results.type === "multiple"){
                answers = [results.correct_answer].concat(results.incorrect_answers);

                for(let i = 0; i < answers.length; i++) {
                    answers[i] = htmlEncode.htmlDecode(answers[i]);
                }

                shuffle(answers);
                embed = new Discord.MessageEmbed()
                    .addField(`**Question: ${question}**`, `**A)** ${answers[0]}\n**B)** ${answers[1]}\n**C)** ${answers[2]}\n**D)** ${answers[3]}`)
                    .setColor("#8076AA");
            }

            else{
                embed = new Discord.MessageEmbed()
                    .addField(`**Question: ${question}**`,`**A)** True\n**B)** False`)
                    .setColor("#8076AA");
            }

            message.channel.send(embed);

            let possibleAnswers = ["-a","-b","-trivia"];
            if(results.type == "multiple") {
                possibleAnswers.push("-c");
                possibleAnswers.push("-d");
            }
            let answer;

            let answerFilter = msg => possibleAnswers.includes(msg.content.split(/ +/g).shift().toLowerCase());


            message.channel.awaitMessages(answerFilter,{max:1, time:10000})
                .then(collected => {
                    console.log("received");
                    answer = collected.first().content.split(/ +/g).shift().toLowerCase();
                    if(answer == "-trivia") return;
                    answer = answer.toLowerCase();

                    let arrayAnswer;
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
                        return message.channel.send(`Correct!`);
                    } 
                    if(results.incorrect_answers.includes(answers[arrayAnswer])) {
                        return message.channel.send(`The Correct answer was ${htmlEncode.htmlDecode(results.correct_answer)}`)
                    }

                })
                .catch(collected => message.channel.send(`Triva Question has Expired`));
        });
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

module.exports.help = {
    name: "trivia"
}
