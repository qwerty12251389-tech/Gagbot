const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getMitten, deleteMitten } = require('./../functions/gagfunctions.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmitten')
		.setDescription(`Take someone else's mittens off`)
		.addUserOption(opt =>
			opt.setName('user')
			.setDescription('Who to free from their mittens')
		),
    async execute(interaction) {
		let mitteneduser = interaction.options.getUser('user')
        if (interaction.options.getUser('user') == interaction.user) {
            interaction.reply({ content: `You can't take your own mittens off!`, flags: MessageFlags.Ephemeral })
        }
		else if (getMitten(mitteneduser)) {
            deleteMitten(mitteneduser)
            interaction.reply(`${interaction.user} takes off ${interaction.options.getUser('user')}'s mittens so they can take off their gag!`)
        }
		else {
			interaction.reply({ content: `${interaction.options.getUser('user')} is not wearing mittens!`, flags: MessageFlags.Ephemeral })
        }
    }
}