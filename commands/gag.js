const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gag')
		.setDescription('Apply a gag to the user')
		.addUserOption(opt =>
			opt.setName('user')
			.setDescription('The user to gag')
			.setRequired(true)
        )
		.addStringOption(opt =>
			opt.setName('gag')
			.setDescription('Type of gag to use')
			.addChoices(...gagtypes)
		),
    async execute(interaction) {
		console.log(interaction)
		console.log(interaction.options)
    }
}