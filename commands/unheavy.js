const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { calculateTimeout } = require("./../functions/timefunctions.js")
const { getHeavy, removeHeavy, convertheavy } = require('./../functions/heavyfunctions.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unheavy')
        .setDescription(`Free someone else from their heavy bondage`)
        .addUserOption(opt =>
			opt.setName('user')
			.setDescription('Who to free from their predicament...')
			.setRequired(true)
		),
    async execute(interaction) {
        let heavyuser = interaction.options.getUser('user')
        if (getHeavy(interaction.user.id)) {
            if (interaction.user == heavyuser) {
                interaction.reply(`${interaction.user} wiggles in their ${getHeavy(interaction.user.id).type}, but obviously they're *very* helpless and can't get far with taking it off on their own!`)
            }
            else {
                interaction.reply(`${interaction.user} wiggles in their ${getHeavy(interaction.user.id).type}, wanting to help ${heavyuser} out, but can't with their useless arms and hands!`)
            }
        }
        else {
            if (getHeavy(heavyuser.id)) {
                interaction.reply(`${interaction.user} helps ${heavyuser} out of their ${getHeavy(heavyuser.id).type}! They stretch their arms and sigh with gratitude!`)
                removeHeavy(heavyuser.id)
            }
            else {
                interaction.reply({ content: `${heavyuser} is not in any kind of heavy bondage!`, flags: MessageFlags.Ephemeral })
            }
        }
    }
}