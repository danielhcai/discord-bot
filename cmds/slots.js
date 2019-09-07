const Discord = module.require("discord.js");

function slot(){
	var num = Math.random();

	if(num < .05) return ":slot_machine:";
	if(num < .15) return ":cherries:";
	if(num < .30) return ":grapes:";
	if(num < .60) return ":tangerine:";
	return ":lemon:";
}

module.exports.run = async (client, message, args) => {
	//console.log(message.guild.id);
	var guildSettings;
	if(message.channel.type === "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

  	if(args.includes("help"))
	{
		var embed = new Discord.RichEmbed()
			.setDescription(`**Slot Machine Help**
				\nUsage: ${guildSettings.prefix}slots (coins)
				\nLemons: 3x
				\nTangarines: 5x
				\nGrapes: 20x
				\nCherries: 200x
				\nSlot Machine: 500x`);
		return message.channel.send(embed);
	}

	var amount = args.filter(f => !isNaN(f));
	if(!amount[0]) amount[0] = 0;

  	var shop = client.currency.get(message.author.id);
  	
	bet = Math.floor(Number(amount[0]));
	if(bet<0) return message.channel.send("You are not allowed to bet negative coins!");
  	if(bet>shop.coins) return message.channel.send("You do not have that many coins!");

  	var s1 = slot();
  	var s2 = slot();
  	var s3 = slot();

  	var slotsMessage;

  	if(s1==s2&&s1==s3){
  		if(s1 === ":lemon:"){shop.coins = shop.coins+(bet*3); slotsMessage = `Congrats! You have won ${bet*3} coins!`}
  		if(s1 === ":tangerine:"){shop.coins = shop.coins+(bet*5); slotsMessage = `Congrats! You have won ${bet*5} coins!`}
  		if(s1 === ":grapes:"){shop.coins = shop.coins+(bet*20); slotsMessage = `Congrats! You have won ${bet*20} coins!`}
  		if(s1 === ":cherries:"){shop.coins = shop.coins+(bet*200); slotsMessage = `Congrats! You have won ${bet*200} coins!`}
  		if(s1 === ":slot_machine:"){shop.coins = shop.coins+(bet*500); slotsMessage = `Congrats! You have won ${bet*500} coins!`}
  		if(bet===0) slotsMessage = `Congrats! You have won!`
  		client.currency.set(message.author.id, shop);
  	}
  		
  	else{
  		shop.coins = shop.coins - bet;
  		client.currency.set(message.author.id, shop);
  		if(bet===1)slotsMessage = `You have lost ${bet} coin. Better luck next time!`;
  		else slotsMessage = `You have lost ${bet} coins. Better luck next time!`;
  		if(bet===0) slotsMessage = `Better luck next time!`
  	}




  	return message.channel.send(`**[${s1} | ${s2} | ${s3}]**\n${slotsMessage}`);
}

module.exports.help = {
	name: "slots"
}