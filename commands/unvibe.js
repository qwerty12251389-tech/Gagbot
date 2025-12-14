const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getChastity, getVibe, removeVibe } = require('./../functions/vibefunctions.js')
const { getHeavy } = require('./../functions/heavyfunctions.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unvibe')
		.setDescription('Remove a vibrator')
        .addUserOption(opt =>
            opt.setName('user')
            .setDescription('Who to remove the vibrator from')
        ),
    async execute(interaction) {
        let vibeuser = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user
        if (getHeavy(interaction.user.id)) {
            if (vibeuser == interaction.user) {
                if (getChastity(vibeuser.id)) {
                    interaction.reply(`${interaction.user} tries to knock their vibrator off with their thighs, but can't because their arms are useless from the ${getHeavy(interaction.user.id).type}. Well, and their chastity belt of course!`)
                }
                else {
                    interaction.reply(`${interaction.user}'s ${getHeavy(interaction.user.id).type} prevents them from dexterously reaching the vibrator taped to them!`)
                }
            }
            else {
                if (getChastity(vibeuser.id)) {
                    interaction.reply(`${interaction.user} uses their nose to try to shift the vibrator off of ${vibeuser} because of their ${getHeavy(interaction.user.id).type}, but is immediately stopped by the metal shield protecting it!`)
                }
                else {
                    interaction.reply(`${interaction.user} uses their nose to try to shift the vibrator off of ${vibeuser} because of their ${getHeavy(interaction.user.id).type}. The move failed!`)
                }
            }
        }
        else if (getChastity(vibeuser.id)) {
            // The target is in a chastity belt
            if ((getChastity(vibeuser.id)?.keyholder == interaction.user.id)) {
                // User tries to modify the vibe settings for someone in chastity that they do have the key for
                if (vibeuser == interaction.user) {
                    // User tries to modify their own vibe settings while in chastity
                    if (getVibe(vibeuser.id)) {
                        // User already has a vibrator on
                        interaction.reply(`${interaction.user} unlocks their belt, removing the vibrator and then locks it back up!`)
                        removeVibe(vibeuser.id)
                    }
                    else {
                        interaction.reply({ content: `You don't have a vibrator on!`, flags: MessageFlags.Ephemeral })
                    }
                }
                else {
                    // User tries to modify another user's vibe settings
                    if (getVibe(vibeuser.id)) {
                        // User already has a vibrator on
                        interaction.reply(`${interaction.user} unlocks ${vibeuser}'s belt, removing the vibrator and then locks it back up!`)
                        removeVibe(vibeuser.id)
                    }
                    else {
                        interaction.reply({ content: `${vibeuser} does not have a vibrator on!`, flags: MessageFlags.Ephemeral })
                    }
                }
            }
            else {
                // User tries to modify vibe settings but does not have the key for the belt
                if (vibeuser == interaction.user) {
                    // User tries to modify their own vibe settings while in chastity
                    if (getVibe(vibeuser.id)) {
                        // User already has a vibrator on
                        interaction.reply(`${interaction.user} claws at their belt, desperately trying to take out the teasing vibrator, but can't!`)
                    }
                    else {
                        interaction.reply({ content: `You don't have a vibrator on!`, flags: MessageFlags.Ephemeral })
                    }
                }
                else {
                    // User tries to modify another user's vibe settings
                    interaction.reply({ content: `You do not have the key for ${vibeuser}'s chastity belt!`, flags: MessageFlags.Ephemeral })
                }
            }
        }
        else {
            // Target is NOT in a chastity belt!
            if (vibeuser == interaction.user) {
                // User tries to modify their own vibe settings
                if (getVibe(vibeuser.id)) {
                    // User already has a vibrator on
                    interaction.reply(`${interaction.user} takes their vibrator out!`)
                    removeVibe(vibeuser.id)
                }
                else {
                    interaction.reply({ content: `You don't have a vibrator on!`, flags: MessageFlags.Ephemeral })
                }
            }
            else {
                // User tries to modify another user's vibe settings
                if (getVibe(vibeuser.id)) {
                    // User already has a vibrator on
                    interaction.reply(`${interaction.user} takes the vibrator out from ${vibeuser}!`)
                    removeVibe(vibeuser.id)
                }
                else {
                    interaction.reply({ content: `${vibeuser} does not have a vibrator on!`, flags: MessageFlags.Ephemeral })
                }
            }
        }
    }
}