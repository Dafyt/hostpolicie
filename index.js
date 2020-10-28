
const ticketSystem = require('djs-ticketsystem');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');


client.once('ready', () => {
	console.log('Ready!');
});
   

client.on('messageReactionAdd', async (reaction, user) => {
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
    }
})

client.on('message', message => {
    if (message.content === '!statusxxx') {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0000FF')
            .setTitle('Policie České republiky')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')
            .addFields(
                { name: '**Počet členů na Discordu:** ', value: message.guild.memberCount, inline: false },
            )
            .setFooter(`Zobrazil ${message.author.username}`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png');
        message.channel.send(exampleEmbed)
        message.delete()
    }
    let jmeno_promene = message.content.split("-");  

    if(jmeno_promene[0] === '!navrhyxxx'){
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#4b5320')
        .setTitle('Návrhy k řešení na poradě')                                         // Nadpis
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
        .setAuthor('Government of State California', 'https://i.imgur.com/zYA8nm3.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
        .setDescription(jmeno_promene[1])                //Text embedu
        //.setThumbnail('https://images.obi.cz/product/CZ/1500x1500/441278_2.jpg')          //Obrázek vlevu
        //.addField('Nadpis', jmeno_promene[1], true)
        //.setImage('https://i.imgur.com/wSTFkRM.png')          // Velký obrázek doprostřed
        .setTimestamp()
        .setFooter(`Návrh podal ${message.author.username}`, 'https://i.imgur.com/zYA8nm3.png');           // URL obrázku dole
        message.channel.send(exampleEmbed).then(reakce_emoji => {
            reakce_emoji.react('✅');
            reakce_emoji.react('❎');
        });
        message.delete()
    }
    if(jmeno_promene[0] === '!oznameni'){
        if(message.member.roles.cache.find(role => role.id === '769857535502581820')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#00BFFF')
            .setTitle('**OZNÁMENÍ**')                                         // Nadpis
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(jmeno_promene[1])                //Text embedu
            .setTimestamp()
            .setFooter(`Oznamovatel ${message.member.nickname}`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png');           // URL obrázku dole
        message.channel.send(exampleEmbed)
        message.delete()
    }}
    if(jmeno_promene[0] === '!omluvenka'){
        if(message.member.roles.cache.find(role => role.id === '769871981826408476')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FFD700')
            .setTitle('**OMLUVENKA**')                                         // Nadpis
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(`Policista **${message.member.nickname}** si žádá o omluvenku z práce:`)
            .setThumbnail('https://cdn.discordapp.com/attachments/729654155798380548/769931760657104896/hodiny.png') //Obrázek vlevo
            .addFields(
                { name: '**Doba omluvenky/dovolené**', value: jmeno_promene[1], inline: false },
                { name: '**DŮVOD**', value: jmeno_promene[2], inline: false },
            )          
            .setTimestamp()
            //.setFooter(`Žádost si podal ${message.member.nickname}`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png');           // URL obrázku dole
        message.channel.send(exampleEmbed)
        message.delete()
    }}
    if(jmeno_promene[0] === '!pokutaxxx'){
        if(message.member.roles.cache.find(role => role.id === '769871981826408476')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#48CDFF')
            .setTitle('**POKUTA**')                                         // Nadpis
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(`Pokutu vystavil **${message.member.nickname}** a zapsal jí do databáze PČR`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/512px-Paper-notes.svg.png') //Obrázek vlevo
            .addFields(
                { name: '**OSOBA**', value: jmeno_promene[1], inline: false },
                { name: '**VÝŠE POKUTY**', value: jmeno_promene[2], inline: false },
                { name: '**DŮVOD**', value: jmeno_promene[3], inline: false },
            )          
            .setTimestamp()
            //.setFooter(`Pokutu vystavil ${message.member.nickname} a zapsal jí do databáze PČR`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png');           // URL obrázku dole
        message.channel.send(exampleEmbed)
        message.delete()
    }}
    if(jmeno_promene[0] === '!vazbaxxx'){
        if(message.member.roles.cache.find(role => role.id === '769871981826408476')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#3B3B3B')
            .setTitle('**ODNĚTÍ SVOBODY**')                                         // Nadpis
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(`Policista **${message.member.nickname}** udělil odnětí svobody...`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/512px-Paper-notes.svg.png') //Obrázek vlevo
            .addFields(
                { name: '**OSOBA**', value: jmeno_promene[1], inline: false },
                { name: '**VÝŠE POKUTY**', value: jmeno_promene[2], inline: false },
                { name: '**DŮVOD**', value: jmeno_promene[3], inline: false },
                { name: '**DOBA**', value: jmeno_promene[4], inline: false },
            )          
            .setTimestamp()
            //.setFooter(`Pokutu vystavil ${message.member.nickname} a zapsal jí do databáze PČR`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png');           // URL obrázku dole
        message.channel.send(exampleEmbed)
        message.delete()
    }}
    if(jmeno_promene[0] == '!pdxx'){   //Přidá to roli 
        message.member.roles.add('751127045005770925').then(message.react('✅'));
        message.delete()
    }
    if(jmeno_promene[0] == '!rpdxx'){
        message.member.roles.remove('751127045005770925')
        message.delete()
    }
    if(message.channel.id === '769919022724022292'){
    if (message.content == '!ticket') {
        message.guild.createTicket({ owner: message.author })
        message.delete();
    }}
    if(message.channel.parentID === '769918691227074580'){
    if(message.content == '!close') {
    if(message.member.roles.cache.find(role => role.id === '769857535502581820')){
        message.channel.delete();
    }}}
    if(jmeno_promene[0] === '!ssluzba'){
        if(message.member.roles.cache.find(role => role.id === '769871981826408476')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#36FF00')
            .setTitle('**Začal službu**')                                         // Nadpis
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(`Policista **${message.member.nickname}** si potvrdil kartou příchod do práce a vzal si výbavu.`)                //Text embedu
            .setTimestamp()
            .setFooter(`Informace se zapsala do databáze Policie České republiky`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')           // URL obrázku dole
        message.channel.send(exampleEmbed).then(message.member.roles.add('769911778350989342'))
        message.delete()
    }}
    if(jmeno_promene[0] === '!ksluzba'){
        if(message.member.roles.cache.find(role => role.id === '769871981826408476')){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('**Ukončil službu**')                                         // Nadpis
            .setAuthor('Policie České republiky', 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(`Policista **${message.member.nickname}** si potvrdil kartou odchod z práce a odevzdal výbavu.`)                //Text embedu
            .setTimestamp()
            .setFooter(`Informace se zapsala do databáze Policie České republiky`, 'https://media.discordapp.net/attachments/729654155798380548/769906915022471208/pcr.png');           // URL obrázku dole
        message.channel.send(exampleEmbed).then(message.member.roles.remove('769911778350989342'))
        message.delete()
    }}
});

client.login(process.env.TOKENS);    

