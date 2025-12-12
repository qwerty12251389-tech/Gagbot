const { SlashCommandBuilder } = require('discord.js');
const { assignMitten, deleteMitten } = require('./../functions/gagfunctions.js')
const { calculateTimeout } = require("./../functions/timefunctions.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mitten')
		.setDescription('Put mittens on yourself, preventing the use of gag and ungag')
		/*.addStringOption(opt =>
			opt.setName('timelength')
			.setDescription('Human Readable Text (_days _ hours _ mins)')
		)
        .addBooleanOption(opt => 
            opt.setName('infinite')
            .setDescription("'Forget' a timelock - requires others to help you out")
        )*/,
    async execute(interaction) {
		/*let time = interaction.options.getBoolean('infinite') ? Math.min(calculateTimeout(interaction.options.getString('timelength')), 1000) : -1 */
        assignMitten(interaction.user);
        /*
		if (time != -1) {
            interaction.reply(`${interaction.user} puts on a pair of mittens, setting a timelock on them. They'll be unable to remove their gag!`)
            setTimeout(() => {
                deleteMitten(interaction.user);
            })
        }
		else {
			interaction.reply(`${interaction.user} puts on a pair of mittens, forgetting to set a timer on them. They'll need help to get out of them... eventually!`)
		}*/
        interaction.reply(`${interaction.user} puts on a pair of mittens with a pair of padlocks. They'll be unable to remove their gag!`)
    }
}