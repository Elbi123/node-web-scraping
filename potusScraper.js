const rp = require("request-promise");
const cheerio = require("cheerio");
const potusParser = require("./potusParse");
const url =
    "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

(async function () {
    const html = await rp(url);
    const $ = cheerio.load(html);
    const wikiLinks = [];
    for (let i = 0; i <= 45; i++) {
        const wikiLink = $(
            'table[class="wikitable"] > tbody > tr > td > b > a',
            html
        )[i].attribs.href;
        wikiLinks.push(wikiLink);
    }

    return Promise.all(
        wikiLinks.map((url) => {
            return potusParser(`https://en.wikipedia.org${url}`);
        })
    )
        .then(function (presidents) {
            console.log(presidents);
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
})();
