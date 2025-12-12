const fs = require('fs');
const path = require('path');
const https = require('https');
const { messageSend, messageSendImg, messageSendDev } = require(`./../functions/messagefunctions.js`)

const assignGag = (userID, gagtype = "ball") => {
    if (process.gags == undefined) { process.gags = {} }
    process.gags[userID] = gagtype
    fs.writeFileSync(`./gaggedusers.txt`, JSON.stringify(process.gags));
}

const getGag = (userID) => {
    if (process.gags == undefined) { process.gags = {} }
    return process.gags[userID]
}

const deleteGag = (userID) => {
    if (process.gags == undefined) { process.gags = {} }
    delete process.gags[userID]
}

const assignMitten = (userID) => {
    if (process.mitten == undefined) { process.mitten = {} }
    process.mitten[userID] = true
    fs.writeFileSync(`./mittenedusers.txt`, JSON.stringify(process.mitten));
}

const getMitten = (userID) => {
    if (process.mitten == undefined) { process.mitten = {} }
    return process.mitten[userID]
}

const deleteMitten = (userID) => {
    if (process.mitten == undefined) { process.mitten = {} }
    delete process.mitten[userID]
}

const garbleMessage = async (msg) => {
    try {
        if (process.gags == undefined) { process.gags = {} }
        if (process.gags[`<@${msg.author.id}>`]) {
            // Grab all the command files from the commands directory
            const gagtypes = [];
            const commandsPath = path.join(__dirname, '..', 'gags');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            if (commandFiles.includes(process.gags[`<@${msg.author.id}>`] + ".js")) {
                let gaggarble = require(path.join(commandsPath, `${process.gags[`<@${msg.author.id}>`]}.js`))
                let garbledtext = gaggarble.garbleText(msg.content);
                if (msg.channel.id == process.env.CHANNELIDDEV) {
                    let sentmessage = messageSendDev(garbledtext, msg.member.displayAvatarURL(), msg.member.displayName).then(() => {
                        msg.delete();
                    })
                }
                else {
                    if (msg.attachments?.first()) {
                        console.log(msg.attachments?.first())
                        let spoilertext = msg.attachments.first().url.search("SPOILER") ? "SPOILER_" : ""
                        let spoiler = msg.attachments.first().url.search("SPOILER") ? true : false
                        let nodedownload = new Promise((res,rej) => {
                            let spoilertext = msg.attachments.first().url.search("SPOILER") ? "SPOILER_" : ""
                            const file = fs.createWriteStream(`./${spoilertext}downloadedimage_${msg.id}.png`);
                            https.get(msg.attachments.first().url, (response) => {
                                response.pipe(file);
                                file.on('finish', () => {
                                file.close();
                                console.log(`Downloaded to ${`./${spoilertext}downloadedimage_${msg.id}.png`}`);
                                res(true);
                                });
                            }).on('error', (err) => {
                                fs.unlink(dest); // Delete the file if an error occurs
                                console.error(err.message);
                                rej(false);
                            });
                        }).then(() => {
                            messageSendImg(garbledtext, msg.member.displayAvatarURL(), msg.member.displayName, msg.id, spoiler).then(() => {
                                msg.delete().then(() => {
                                    fs.rmSync(`./${spoilertext}downloadedimage_${msg.id}.png`)
                                });
                            })
                        })
                    }
                    else {
                        let sentmessage = messageSend(garbledtext, msg.member.displayAvatarURL(), msg.member.displayName).then(() => {
                            msg.delete();
                        })
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.assignGag = assignGag;
exports.getGag = getGag;
exports.deleteGag = deleteGag;
exports.assignMitten = assignMitten;
exports.getMitten = getMitten;
exports.deleteMitten = deleteMitten;
exports.garbleMessage = garbleMessage;