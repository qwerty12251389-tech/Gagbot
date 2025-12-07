const garbleText = (text) => {
    let newtext = text.replace('th', 'f')
    newtext = text.replace("TH", "F")
    return newtext
}

exports.garbleText = garbleText;
exports.choicename = "Ball Gag"