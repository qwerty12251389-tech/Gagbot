const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getGag, deleteGag, getMitten } = require('./../functions/gagfunctions.js')
const { getHeavy } = require('./../functions/heavyfunctions.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ungag')
        .setDescription('Remove a gag from a user')
        .addUserOption(opt =>
            opt.setName('user')
            .setDescription('The user to remove gag from (leave blank for yourself)')
            //.setRequired(true)
        ),
    async execute(interaction) {
        let gaggeduser = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;
        if (getHeavy(interaction.user.id)) {
            if (gaggeduser != interaction.user) {
                if (getGag(gaggeduser)) {
                    interaction.reply(`${interaction.user} bumps into ${gaggeduser}, trying to use their useless arms to help them out of their gag!`)
                }
                else {
                    interaction.reply({ content: `${gaggeduser} is not gagged!`, flags: MessageFlags.Ephemeral })
                }
            }
            else {
                if (getGag(gaggeduser)) {
                    interaction.reply(`${interaction.user} chews on their gag, trying to spit it out because they can't use their hands and arms!`)
                }
                else {
                    // User is in some form of heavy bondage and cannot put on a chastity belt
                    interaction.reply({ content: `You're not gagged, but you wouldn't be able to take it off anyway!`, flags: MessageFlags.Ephemeral })
                }
            }
        }
        else if (getGag(gaggeduser)) {
            if (interaction.user == gaggeduser) {
                if (!getMitten(interaction.user)) {
                    interaction.reply(`${interaction.user} has taken their gag out!`)
                    deleteGag(gaggeduser)
                }
                else {
                    interaction.reply(`${interaction.user} attempts to take their gag off, but struggles with the straps in their mittens!`)
                }
            }
            else {
                deleteGag(gaggeduser)
                interaction.reply(`${interaction.user} has freed ${gaggeduser} from their gag!`)
            }
        }
        else {
            interaction.reply({ content: `${gaggeduser} is not gagged!`, flags: MessageFlags.Ephemeral })
        }
    }
}