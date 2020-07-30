const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let member;
    let mention = message.mentions.users.array();
    if(mention.length == 0) {
        member = message.author;
    }
    else {
        member = mention[0];
    }
    
    let embed = new Discord.MessageEmbed()
        .setDescription(`Avatar of **${member.username}**`)
        .setImage(member.displayAvatarURL())
        .setColor("#8076AA");

    message.channel.send(embed);
}

module.exports.help = {
    name: "avatar"
}
