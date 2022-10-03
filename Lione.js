//════════════════════════════//
//If you want to recode, reupload
//or copy the codes/script,
//pls give credit
//no credit? i will take action immediately
//© 2022 kavee Bot Inc. Dark nero Bot MD 
//Thank you to Lord Buddha, Family and Myself
//════════════════════════════//
// my owenr kaveesha
//════════════════════════════//
//If you recode and uploading on your channel
//or copy pasting the codes in ur script, 
//i give permission to do as long as you
//put kavee youtube channel link in the video
//description and tag me on githuh repo, 
//thank you
//════════════════════════════//

require('./settings')
const { default: LioneBotIncConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')
const moment = require('moment-timezone')

var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`database/database.json`)
)
global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
}

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

async function startLioneBotInc() {
    const LioneBotInc = LioneBotIncConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Subscribe Lione','Safari','1.0.0'],
        auth: state
    })

    store.bind(LioneBotInc.ev)
    


    LioneBotInc.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!LioneBotInc.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(LioneBotInc, mek, store)
        require("./Blue-Lion")(LioneBotInc, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    // Group Update
    LioneBotInc.ev.on('groups.update', async pea => {
       //console.log(pea)
    // Get Profile Picture Group
       try {
       ppgc = await LioneBotInc.profilePictureUrl(pea[0].id, 'image')
       } catch {
       ppgc = 'https://shortlink.LioneBotIncarridho.my.id/rg1oT'
       }
       let lolLione = { url : ppgc }
       if (pea[0].announce == true) {
       LioneBotInc.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nThe Group Has Been Closed By Admin, Now Only Admin Can Send Messages !`, `${botname}`, lolLione, [])
       } else if(pea[0].announce == false) {
       LioneBotInc.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nThe Group Has Been Opened By Admin, Now Participants Can Send Messages !`, `${botname}`, lolLione, [])
       } else if (pea[0].restrict == true) {
       LioneBotInc.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nGroup Info Has Been Restricted, Now Only Admin Can Edit Group Info !`, `${botname}`, lolLione, [])
       } else if (pea[0].restrict == false) {
       LioneBotInc.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nGroup Info Has Been Opened, Now Participants Can Edit Group Info !`, `${botname}`, lolLione, [])
       } else {
       LioneBotInc.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nGroup Subject Has Been Changed To *${pea[0].subject}*`, `${botname}`, lolLione, [])
     }
    })
    
    //randoming function
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}
//document randomizer
let documents = [doc1,doc2,doc3,doc4,doc5,doc6]
let docs = pickRandom(documents)

    LioneBotInc.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await LioneBotInc.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await LioneBotInc.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                //Get Profile Picture Group\\
                try {
                    ppgroup = await LioneBotInc.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

//welcome\\
      
//welcome\\
let nama = await LioneBotInc.getName(num)
memb = metadata.participants.length
LioneWlcm = await getBuffer(`https://hardianto.xyz/api/welcome3?profile=${encodeURIComponent(ppuser)}&name=${encodeURIComponent(nama)}&bg=https://telegra.ph/file/d460e086f9f9bf6b04e17.jpg&namegb=${encodeURIComponent(metadata.subject)}&member=${encodeURIComponent(memb)}`)
LioneLft = await getBuffer(`https://hardianto.xyz/api/goodbye3?profile=${encodeURIComponent(ppuser)}&name=${encodeURIComponent(nama)}&bg=https://telegra.ph/file/d460e086f9f9bf6b04e17.jpg&namegb=${encodeURIComponent(metadata.subject)}&member=${encodeURIComponent(memb)}`)
                if (anu.action == 'add') {
                const Lionebuffer = await getBuffer(ppuser)
                let LioneName = num
                const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	            const xdate = moment.tz('Asia/Kolkata').format('YYYY/MM/DD')
	            const xmembers = metadata.participants.length
                let unicorndoc = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "916909137213-1604595598@g.us"}, "message": {orderMessage: {itemCount: 9999999,status: 200, thumbnail: LioneWlcm, surface: 200, message: `${metadata.subject}`, orderTitle: 'Lione', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
                 Lionebody = `🐬 Hi👋 @${LioneName.split("@")[0]}

🍁 Welcome To  ${metadata.subject}
🍁 ${xmembers} Members

Date 📆  =  ${xdate}
Time ⏰ =  ${xtime} `
      //if you copy the code value,
   //dont forget to put my name(Lione) as credit
   //you fail to put, i sue you for sure!
   let buttons = [
    {buttonId: `owner`, buttonText: {displayText: '👍 WELCOME 👍'}, type: 1},
    {buttonId: `menu`, buttonText: {displayText: '♞ MENU ♞'}, type: 1}
    ]
let buttonMessage = {
    image: { url: 'https://i.ibb.co/hXtGkzj/welcome-poster-spectrum-brush-strokes-white-background-colorful-gradient-brush-design-vector-paper-i.jpg'},
caption: Lionebody,
footer: `📶 𝘽𝙡𝙪𝙚 𝙇𝙞𝙤𝙣𝙚 📶`,
buttons,
headerType: 4
}
LioneBotInc.sendMessage(anu.id, buttonMessage)
                } else if (anu.action == 'remove') {
                	const Lionebuffer = await getBuffer(ppuser)
                    const Lionetime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	                const Lionedate = moment.tz('Asia/Kolkata').format('YYYY/MM/DD')
                	let LioneName = num
                    const Lionemembers = metadata.participants.length
                    let unicorndoc = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "916909137213-1604595598@g.us"}, "message": {orderMessage: {itemCount: 9999999,status: 200, thumbnail: Lionebuffer, surface: 200, message: `${metadata.subject}`, orderTitle: 'Lione', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
                     Lionebody = `🐬 Bye👋 @${LioneName.split("@")[0]}

🍁 Left From  ${metadata.subject}
🍁 ${Lionemembers} Members
                    
Date 📆 =  ${Lionedate}
Time ⏰ =  ${Lionetime} `

   let buttons = [
    {buttonId: `owner`, buttonText: {displayText: '🐼 BYE 🐼'}, type: 1},
    {buttonId: `menu`, buttonText: {displayText: '♞ MENU ♞'}, type: 1}
    ]
    let buttonMessage = {
        image: { url: 'https://i.ibb.co/gytytkM/images.jpg'},
    caption: Lionebody,
    footer: `📶 𝘽𝙡𝙪𝙚 𝙇𝙞𝙤𝙣𝙚 📶`,
    buttons,
    headerType: 4
    }
LioneBotInc.sendMessage(anu.id, buttonMessage)
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
	
    //Setting\\
    LioneBotInc.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    LioneBotInc.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = LioneBotInc.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    LioneBotInc.getName = (jid, withoutContact  = false) => {
        id = LioneBotInc.decodeJid(jid)
        withoutContact = LioneBotInc.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = LioneBotInc.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === LioneBotInc.decodeJid(LioneBotInc.user.id) ?
            LioneBotInc.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    LioneBotInc.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await LioneBotInc.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await LioneBotInc.getName(i + '@s.whatsapp.net')}\nFN:${global.ownername}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${global.ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${global.socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${global.location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    	////////////////////////////////////////////////////////////vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${ownername}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click To Chat\nitem2.EMAIL;type=INTERNET:${botscript}\nitem2.X-ABLabel:Script\nitem3.URL:${websitex}\nitem3.X-ABLabel:Script\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	LioneBotInc.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }
    
    LioneBotInc.setStatus = (status) => {
        LioneBotInc.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
	
    LioneBotInc.public = true

    LioneBotInc.serializeM = (m) => smsg(LioneBotInc, m, store)

    LioneBotInc.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); LioneBotInc.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("🦄Connection closed, reconnecting...."); startLioneBotInc(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("🦄Connection Lost from Server, reconnecting..."); startLioneBotInc(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("🦄Connection Replaced, Another New Session Opened, Please Close Current Session First"); LioneBotInc.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`🦄Device Logged Out, Please Scan Again And Run.`); LioneBotInc.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("🦄Restart Required, Restarting..."); startLioneBotInc(); }
            else if (reason === DisconnectReason.timedOut) { console.log("🦄Connection TimedOut, Reconnecting..."); startLioneBotInc(); }
            else LioneBotInc.end(`🦄Unknown DisconnectReason: ${reason}|${connection}`)
        }
        console.log('Connected...', update)
    })

    LioneBotInc.ev.on('creds.update', saveState)

    // Add Other
    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    LioneBotInc.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: LioneBotInc.waUploadToServer })
        var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            LioneBotInc.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    LioneBotInc.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        LioneBotInc.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendText = (jid, text, quoted = '', options) => LioneBotInc.sendMessage(jid, { text: text, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await LioneBotInc.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await LioneBotInc.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await LioneBotInc.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendTextWithMentions = async (jid, text, quoted, options = {}) => LioneBotInc.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await LioneBotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await LioneBotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    LioneBotInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    LioneBotInc.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await LioneBotInc.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image' 
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await LioneBotInc.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    LioneBotInc.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await LioneBotInc.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    LioneBotInc.cMod = (jid, copy, text = '', sender = LioneBotInc.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === LioneBotInc.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


//send 5 button image by Lione
    LioneBotInc.send5ButImg = async (jid , text = '' , footer = '', img, but = [], thumb, options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img, jpegThumbnail:thumb }, { upload: LioneBotInc.waUploadToServer })
        var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            LioneBotInc.relayMessage(jid, template.message, { messageId: template.key.id })
    }


    //send5butvid by Lione
        LioneBotInc.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: vid }, { upload: LioneBotInc.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            LioneBotInc.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    
    
    //send5butmsg by Lione
            LioneBotInc.send5ButMsg = (jid, text = '' , footer = '', but = []) =>{
        let templateButtons = but
        var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
        }
        LioneBotInc.sendMessage(jid, templateMessage)
        }


//sendlistmsg by Lione
        LioneBotInc.sendListMsg = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
        text: text,
        footer: footer,
        title: title,
        buttonText: butText,
        sections
        }
        LioneBotInc.sendMessage(jid, listMes, { quoted: quoted })
        }


    //send5butgif by Lione
        LioneBotInc.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: LioneBotInc.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            LioneBotInc.relayMessage(jid, template.message, { messageId: template.key.id })
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    LioneBotInc.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

    return LioneBotInc
}

startLioneBotInc()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
