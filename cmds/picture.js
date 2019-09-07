const Discord = module.require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (client, message, args) => {
	// Edits a picture
	var input = message.attachments.first();
	
	if(args[0]==="help"){
		let embed = new Discord.RichEmbed()
    		.addField("Picture Help", `
    			Usage: -picture (Options)
    			\n**Options**
    			\n\tinfo
    			\n\tflip (vertical/horizontal)
    			\n\trotate (degree)
    			\n\tgreyscale
    			\n\tbrightness (-1 to +1)
    			\n\tconstrast (-1 to +1)
    			\n\tinvert
    			\n\tposterize (levels)
    			\n\tsepia
    			\n\tpixelate (pixel size)
    			\n\tblur (pixels)
    		`)
    		.setColor("#50e080");

    	return message.author.send(embed);
	}

    if(!input) return message.channel.send("Please attach a pictrure.");

	if(args[0]==="info"){
		let embed = new Discord.RichEmbed()
			.setDescription(`[**${message.author.username}'s Picture**](${input.url})`)
    		.addField("Name", input.filename)
    		.addField("Size", `${Math.round(input.filesize/102.4)/10} Kilobytes`)
    		.addField("Dimensions", `${input.width} x ${input.height}`)
    		.setThumbnail(input.url)
    		.setColor("#8076AA");

    	return message.channel.send(embed);
	}

	Jimp.read(input.url).then(function(image){
		var picture;

		if(args[0] == "flip"){
			var option =  args.filter(f => f==="vertical"||f==="horizontal").shift();
			if(!option) return message.channel.send("Usage: -picture flip (degree)");
			if(option === "horizontal") picture = image.flip(true, false);
			else picture = image.flip(false, true);
        }

        if(args[0] == "rotate"){
			var option = args.filter(f => !isNaN(f)).shift();
			if(!option) return message.channel.send("Usage: -picture rotate (degree)");
			picture = image.rotate(Number(option));
        }

		if(args[0] == "greyscale"){
			picture = image.greyscale();
        }

        if(args[0] == "brightness"){
			var option = args.filter(f => !isNaN(f)&&Number(f)>=-1&&Number(f)<=1).shift();
			if(!option) return message.channel.send("Usage: -picture brightness (-1 to +1)");
			picture = image.brightness(Number(option));
        }

        
        if(args[0] == "contrast"){
			var option = args.filter(f => !isNaN(f)&&Number(f)>=-1&&Number(f)<=1).shift();
			if(!option) return message.channel.send("Usage: -picture contrast (-1 to +1)");
			picture = image.contrast(Number(option));
        }
        

        if(args[0] == "invert"){
			picture = image.invert();
        }

		        
        if(args[0] == "posterize"){
			var option = args.filter(f => !isNaN(f)).shift();
			if(!option) return message.channel.send("Usage: -picture posterize (levels)");
			picture = image.posterize(Number(option));
		}



        if(args[0] == "sepia"){
			picture = image.sepia();
        }

        if(args[0] == "pixelate"){
        	var option = args.filter(f => !isNaN(f)).shift();
			if(!option) return message.channel.send("Usage: -picture pixelate (pixel size)");
			picture = image.pixelate(Number(option),Number(option));
        }

        if(args[0] == "blur"){
        	var option = args.filter(f => !isNaN(f)).shift();
			if(!option) return message.channel.send("Usage: -picture blue (pixels)");
			picture = image.blur(Number(option));
        }


    	picture.getBuffer(Jimp.AUTO, function(err, buffer){
         	if(err) console.log(err);
         	else{
         		var editpicture = new Discord.Attachment(buffer);
         		message.channel.send(editpicture);
         	}
         });
    
	}).catch(function (err){
		console.error(err);
	});



	//console.log(pictureBuffer);
	//var picture = new Discord.Attachment(pictureBuffer);
	//
}

module.exports.help = {
	name: "picture"
}