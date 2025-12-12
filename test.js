const { WebhookClient, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const dotenv = require('dotenv')

dotenv.config()

const messageSend = async (str, avatarURL, username) => {
    // When called, we want to do something with str and then send it.
    const webhookClient = new WebhookClient({ 
        id: process.env.WEBHOOKID, 
        token: process.env.WEBHOOKTOKEN 
    })

    webhookClient.send({
        content: str,
        username: username,
        avatarURL: avatarURL
    }).then(() => {
        return true
    })
}

const webhookClient = new WebhookClient({ 
    id: process.env.WEBHOOKID, 
    token: process.env.WEBHOOKTOKEN 
})

let imageonsystem = "./SPOILER_image.png"

let file = new AttachmentBuilder(imageonsystem, { name: imageonsystem } );

const embed = new EmbedBuilder()
  .setTitle('Image from URL')
  .setImage(`attachment://${imageonsystem}`); // Replace with your image URL

webhookClient.send({
    content: "Test webhook with just an image",
    files: [file]
}).then(() => {
    return true
})