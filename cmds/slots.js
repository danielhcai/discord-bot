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
  	var s1 = slot();
  	var s2 = slot();
  	var s3 = slot();

  	var slotsMessage;

  	if(s1==s2&&s1==s3){
  		slotsMessage = "Congrats! You have won!";
  	}
  		
  	else{
  		slotsMessage = "Better luck next time!";
  	}




  	return message.channel.send(`**[${s1} | ${s2} | ${s3}]**\n${slotsMessage}`);
}

module.exports.help = {
	name: "slots"
}