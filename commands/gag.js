const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { assignGag } = require('./../functions/gagfunctions.js')

// Grab all the command files from the commands directory
const gagtypes = [];
const commandsPath = path.join(__dirname, '..', 'gags');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Push the gag name over to the choice array. 
for (const file of commandFiles) {
    const gag = require(`./../gags/${file}`);
	gagtypes.push(
        { name: gag.choicename, value: file.replace('.js', '') }
    );
}

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
		let gaggeduser = interaction.options.getUser('user')
		let gagtype = interaction.options.getString('gag') ? interaction.options.getString('gag') : 'ball'
		assignGag(gaggeduser, gagtype)
		let gagname = gagtypes.find(g => g.value == gagtype).name;
		// We gagged ourselves!
		if (interaction.user.id == gaggeduser.id) {
			interaction.reply(`${interaction.user} inserts a ${gagname} in their own mouth!`)
		}
		else {
			interaction.reply(`${interaction.user} gagged ${gaggeduser} with a ${gagname}!`)
		}
    }
}