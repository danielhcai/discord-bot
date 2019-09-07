const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  // Get the info of a user
  var guildSettings;
  if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  else guildSettings = client.defaultSettings;

  var member;

  if(args.length==0){
    var member = message.author;
  }
  
  else{
    var mention = message.mentions.users.array();
    if(mention.length == 0) member = message.author;
    else var member = mention[0];
  }

  var shop = client.currency.get(member.id);

  let embed = new Discord.RichEmbed()
    .setAuthor(member.username)
    .setDescription(`Coins: ${shop.coins}`)
    .setThumbnail(member.displayAvatarURL)
    .setColor("#8076AA");

  message.channel.send(embed);
}

module.exports.help = {
  name: "profile"
}
