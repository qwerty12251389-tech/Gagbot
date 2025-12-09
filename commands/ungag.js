const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getGag, deleteGag } = require('./../functions/gagfunctions.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ungag')
        .setDescription('Remove a gag from a user')
        .addUserOption(opt =>
            opt.setName('user')
            .setDescription('The user to remove gag from')
            .setRequired(true)
        ),
    async execute(interaction) {
        let gaggeduser = interaction.options.getUser('user')
        if (getGag(gaggeduser)) {
            deleteGag(gaggeduser)
            if (interaction.user == gaggeduser) {
                interaction.reply(`${interaction.user} has taken their gag out!`)
            }
            else {
                interaction.reply(`${interaction.user} has freed ${gaggeduser} from their gag!`)
            }
        }
        else {
            interaction.reply({ content: `${gaggeduser} is not gagged!`, flags: MessageFlags.Ephemeral })
        }
    }
}