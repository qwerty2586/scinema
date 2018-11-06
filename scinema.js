let request = require('request');
let strings = require('./strings');
const NodeCache = require( "node-cache" );
let scinemaCache = new NodeCache( { stdTTL: 3600, checkperiod: 600 } );

exports.get = function (url,callback) {
    let cached = scinemaCache.get(url);
    if (cached!==undefined) {
        callback(cached);
        return
    }
    // pri nove instalaci zmenit uuid
    const uid = ""; // sem dat uuid
    TODO();
    var full_url = "https://stream-cinema.online/kodi"+url+"?lang=eng&ver=1.3&uid="+uid+"&v=1.3.10";
    // zbavit se vice otazniku
    if (url.includes("?")) {
        full_url = full_url.split("?").join("&").replace("&","?");
    }
    let options = {
        url : full_url,
        headers : {
            'User-Agent': 'KODI/17.6 (X11; U; Linux i686; en) ver1.3.10',
            'X-LANG': 'en',
            'X-UID': uid,
            'X-VER': '1.3',
            'Accept': 'application/vnd.bbaron.kodi-plugin-v1.3+json'
        }
    };
    request(options, function (error,response,body) {
        if (error!=null) {
            callback(JSON.parse('"menu" : []'));
            return
        }

        function replacer(match,p1,p2,offset,string) {
            if (strings.cs[p2]) {
                return strings.cs[p2]
            } else {
                return match
            }
        }

        let translated = body.replace(/([$])([0-9]*)/gi,replacer);
        let data = JSON.parse(translated);
        scinemaCache.set(url,data);
        callback(data);
    });
};