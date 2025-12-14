const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { calculateTimeout } = require("./../functions/timefunctions.js")
const { getHeavy, assignHeavy, commandsheavy, convertheavy } = require('./../functions/heavyfunctions.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('heavy')
        .setDescription(`Put heavy bondage on, preventing the use of any command`)
        .addStringOption(opt =>
			opt.setName('type')
			.setDescription('What flavor of helpless restraint to wear...')
			.addChoices(...commandsheavy)
		),
    async execute(interaction) {
        let heavychoice = interaction.options.getString('type') ? interaction.options.getString('type') : "armbinder_latex"
        if (getHeavy(interaction.user.id)) {
            interaction.reply(`${interaction.user} writhes in their ${getHeavy(interaction.user.id).type}, trying to change their bondage, but may need some help!`)
        }
        else {
            interaction.reply(`${interaction.user} slips into a ${convertheavy(heavychoice)}, rendering their arms and hands completely useless!`)
            assignHeavy(interaction.user.id, heavychoice)
        }
    }
}