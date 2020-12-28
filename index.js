
const ticketSystem = require('djs-ticketsystem');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const sqlite3 = require('sqlite3').verbose();


client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);    

client.on('messageReactionAdd', async (reaction, user) => {
    if(!reaction.message.author.bot) return;
    if(user.bot) return;
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
            return;
        }
    }
    for (const reaction2 of reaction.message.reactions.cache.values()) {
        if((reaction2.emoji.name == "✅" && reaction.emoji.name == "❎") || (reaction2.emoji.name == "❎" && reaction.emoji.name == "✅")) {
            await reaction2.users.remove(user.id);
        }
        if((reaction2.emoji.name == "📢" && reaction.emoji.name == "📢")){
            await reaction.message.delete();
        }
    }   
})

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

client.on('message', message => {
    let jmeno_promene = message.content.split(";"); 
    if(jmeno_promene[0] === '!akce'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
    if(message.channel.id === '792837952622952489'){
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('***PLÁNOVANÁ AKCE***')                                         // Nadpis
        //.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
        .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')   //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
        .setDescription(jmeno_promene[1])                //Text embedu
        //.setThumbnail('https://images.obi.cz/product/CZ/1500x1500/441278_2.jpg')          //Obrázek vlevu
        //.addField('Nadpis', jmeno_promene[1], true)
        //.setImage('https://i.imgur.com/wSTFkRM.png')          // Velký obrázek doprostřed
        .setTimestamp()
        //.setFooter(`Akce byla vyhlášena: `, 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png');           // URL obrázku dole
        message.channel.send(exampleEmbed).then(reakce_emoji => {
            reakce_emoji.react('✅');
            reakce_emoji.react('❎');
        });
        message.delete()
    }
}};
    
    if (message.content == '!ticket') {
        message.guild.createTicket({ owner: message.author })
        message.delete();
    }
    if(message.content == '!close') {
    if(message.channel.parentID == '792801119188287509'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
        message.channel.delete();
    }}}
    if(jmeno_promene[0] === '!radio'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
    if(message.channel.id === '792837952622952489'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#4c99ff')
            .setTitle('***Aktuální rádiová frekvence***')                                         // Nadpis
            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(jmeno_promene[1])                //Text embedu
            .setThumbnail('https://cdn.discordapp.com/attachments/792473923056828466/792473958737379378/ezgif-4-26f6de327d55.png')
            .setTimestamp()
            .setFooter(`Změnu frekvence dal ${message.author.username}`, 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png');           // URL obrázku dole
        message.channel.send(exampleEmbed).then(message.delete())
        //message.channel.send('@here')
    }}}
    if(jmeno_promene[0] === '!navrh'){
    if(message.channel.id === '792837952622952489'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#e6801a')
            .setTitle('***NÁVRH K ZLEPŠENÍ***')
            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png') 
            //.setDescription(jmeno_promene[1])
            .setDescription(`Uživatel <@${message.author.id}> má navrh k zlepšení`)
            .addField('\u200B',jmeno_promene[1],false)
            .setTimestamp()
            //.setFooter(`Návrh podal ${message.author.username}`)
        message.channel.send(exampleEmbed).then(reakce_emoji => {
            reakce_emoji.react('✅');
            reakce_emoji.react('❎');
        });
         message.delete()
    }}
    if(jmeno_promene[0] === '!methan'){
        if(jmeno_promene.length == 3){
        let db = new sqlite3.Database("methan.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
            if (error){
                db.close();
                return console.error(error.message);
            }
            else{
                db.run('create table if not exists methan(id TEXT, pocet integer)', (error) =>{
                    if (error){
                        db.close();
                        return console.error(error.message);
                    }
                    
                    else{
                        db.get('select id from methan where id=?',[message.author.id], (error,row) =>{
                            if (error){
                                db.close();
                                return console.error(error.message);
                            }
                            else{
                                if(row){
                                    db.run('update methan set pocet=pocet+? where id=?', [jmeno_promene[1],message.author.id] ,(error) =>{
                                        if (error){
                                            reaction.message.channel.send(vytvor_chybu(error.message));
                                            db.close();
                                            return console.error(error.message);
                                        }
                                        else{
                                            const exampleEmbed = new Discord.MessageEmbed()
                                            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
                                            .setTitle('***POČET SÁČKŮ METHANU NA OSOBU***')
                                            .setColor('#000000')
                                            .addFields(
                                                {name: '*JMÉNO OSOBY*', value: `${message.author.username}`},
                                                {name: '*POČET SÁČKŮ*', value: jmeno_promene[1]},
                                                )
                                            .setTimestamp()
                                            .setImage(jmeno_promene[2])
                                            const channel = client.channels.cache.get('792831720911011850')
                                            channel.send(exampleEmbed).then(message.delete()) 
                                            db.close();
                                        }
                                    });
                                }
                                else{
                                    db.run('insert into methan values(?,?)', [message.author.id, jmeno_promene[1]] ,(error) =>{
                                        if (error){ 
                                            message.channel.send(vytvor_chybu(error.message) + vytvor_pozadavek(message.author.username));
                                            db.close();
                                            return console.error(error.message);
                                        }
                                        else{
                                            const exampleEmbed = new Discord.MessageEmbed()
                                            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
                                            .setColor('#000000')
                                            .setTitle('***POČET SÁČKŮ METHANU NA OSOBU***')
                                            .addFields(
                                                {name: '*JMÉNO OSOBY*', value: `${message.author.username}`},
                                                {name: '*POČET SÁČKŮ*', value: jmeno_promene[1]},
                                                )
                                            .setTimestamp()
                                            message.channel.send(exampleEmbed).then(message.delete())
                                            db.close();
                                        }
                                    });
                                }
                           }
                        });
                    }
                });
            }  
        });
    }else{message.delete()}
    }
    if(message.content === '!sacky'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
        let db = new sqlite3.Database("methan.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
            if (error){
                db.close();
                return console.error(error.message);
            }
            else{
                const exampleEmbed = new Discord.MessageEmbed()
                            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
                            .setTitle('***CELKOVÝ POČET DROG NA OSOBY***')
                db.run('create table if not exists methan(id TEXT, pocet integer)', (error) =>{
                    if (error){
                        db.close();
                        return console.error(error.message);
                    } 
                    else{
                        db.each('select * from methan', (error,row) =>{
                            if (error){
                                db.close();
                                return console.error(error.message);
                            }
                            else{
                                exampleEmbed.addField('\u200b',`<@${row.id}> - počet sáčků methanu:**${formatNumber(row.pocet)}** - výdej peněz:**${formatNumber(row.pocet*80*0.88)}** `, false)
                           }},()=>{
                            message.channel.send(exampleEmbed).then(message.delete())
                            db.close();
                            }
                        );
                    }
                });
            }  
        });
    }}
    if(message.content === '!smazanidatabaze'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
        let db = new sqlite3.Database("methan.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
            if (error){
                db.close();
                return console.error(error.message);
            }
            else{
                db.run('drop table methan', (error) =>{
                    if (error){
                        db.close();
                        return console.error(error.message);
                    } 
                    else{
                        db.close();
                        message.channel.send(`**Databáze byla promazána uživatelem ${message.author.username}**`).then(message.delete())
                    }
                });
            }  
        });
    }}
    if(jmeno_promene[0] === '!smazaniosoba'){
        if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
        if(jmeno_promene.length == 2){
        let db = new sqlite3.Database("methan.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
            if (error){
                db.close();
                return console.error(error.message);
            }
            else{
                db.run('delete from methan where id=?',[jmeno_promene[1]], (error) =>{
                    if (error){
                        db.close();
                        return console.error(error.message);
                    } 
                    else{
                        db.close();
                        let user =''
                        try{
                            user = message.guild.members.cache.get(jmeno_promene[1]).nickname;
                        }
                        catch{
                            user = "undefined";
                        }
                        message.channel.send(`**Uživatel ${message.author.username} promazal databázi uživateli ${user}**`).then(message.delete())
                    }
                });
            }  
        });
    }}}
    if(jmeno_promene[0] === '!vaha'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
            .setColor('#2bdcff')
            .addField('Zapůjčení váhy pro osobu',jmeno_promene[1],false)
            .setTimestamp()
        message.channel.send(exampleEmbed).then(dodatek => { dodatek.react("📢")})
        message.delete();
    }}
    if(jmeno_promene[0] === '!oznameni'){
    if(message.member.roles.cache.find(role => role.id === '792798838002810920')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
            .setColor('#65b555')
            .setTitle('**OZNÁMENÍ**')
            .setURL('https://www.youtube.com/watch?v=d1YBv2mWll0')
            .setDescription(jmeno_promene[1])
            .setTimestamp()
        message.channel.send(exampleEmbed).then(message.delete())
        }}
    if(message.content === '!prikazy'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
            .setColor('#21570a')
            .setTitle('***SEZNAM DOSTUPNÝCH PŘÍKAZŮ PRO BOTA***')
            .addFields(
                {name:'!navrh', value: 'Vytvoří do speciální roomky návrhy', inline: false},
                {name:'!ticket', value:'Vytvoří ticket roomku do kategorie', inline: false},
            )
            .setTimestamp()
        message.channel.send(exampleEmbed).then(message.delete())
        }
    if(jmeno_promene[0] === '!omluvenka'){
    if(message.channel.id === '792837952622952489'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor('Cartel La Familia', 'https://cdn.discordapp.com/attachments/605497861286920192/792453798734856192/stahovani.png')
            .setColor('#3283FF ')
            .setTitle('***OMLUVENKA***')
            .setDescription(`Osoba <@${message.author.id}> si chce podat omluvenku`)
            .addFields(
                {name:'DOBA', value:jmeno_promene[1], inline:false},
                {name:'DŮVOD', value:jmeno_promene[2],inline:false},
            )
            .setTimestamp()
        message.channel.send(exampleEmbed).then(message.delete())
    }}
});