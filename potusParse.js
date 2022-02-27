const rp = require("request-promise");
const cheerio = require("cheerio");
const url = "https://en.wikipedia.org/wiki/George_Washington";

const potusParser = async function (url) {
    const html = await rp(url);
    const $ = cheerio.load(html);
    return {
        name: $(".firstHeading", html).text(),
        birthday: $(".bday", html).html(),
    };
};

module.exports = potusParser;
