
const ticketSystem = require('djs-ticketsystem');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.login('NzA3NjA4Nzk3NjgxODExNDg3.XrLSDA.UbWptuBhqwCtLCOgkAgvaQ6Ttyo');

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
    if (message.content === '!status') {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0000FF')
            .setTitle('Status Governmentu')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setAuthor('Government of State California', 'https://i.imgur.com/zYA8nm3.png')
            .addFields(
                { name: '**Počet členů na Discordu:** ', value: message.guild.memberCount, inline: false },
            )
            .setFooter(`Zobrazil ${message.author.username}`, 'https://i.imgur.com/zYA8nm3.png');
        message.channel.send(exampleEmbed)
        message.delete()
    }
    let jmeno_promene = message.content.split("-");  

    if(jmeno_promene[0] === '!návrh'){
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
    if(jmeno_promene[0] === '!oznámení'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#4b5320')
            .setTitle('**OZNÁMENÍ**')                                         // Nadpis
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
            .setAuthor('Government of State California', 'https://i.imgur.com/zYA8nm3.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setDescription(jmeno_promene[1])                //Text embedu
            .setTimestamp()
            .setFooter(`Návrh podal ${message.author.username}`, 'https://i.imgur.com/zYA8nm3.png');           // URL obrázku dole
        message.channel.send(exampleEmbed)
        message.delete()
    }
    if(jmeno_promene[0] === '!pokuta'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('**POKUTA**')                                         // Nadpis
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')                          //Co se otevře po kliknutí na nadpis 
            .setAuthor('Police Department', 'https://2img.net/h/img3.wikia.nocookie.net/__cb20131207184033/lsrp/pl/images/b/b0/Logolspd.png')    //Horní část embedu - Kdo to vytvoři, obrázek vpravu, co se otevře po kliknutí
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/512px-Paper-notes.svg.png') //Obrázek vlevo
            .addFields(
                { name: '**OSOBA**', value: jmeno_promene[1], inline: false },
                { name: '**VÝŠE POKUTY**', value: jmeno_promene[2], inline: false },
                { name: '**DŮVOD**', value: jmeno_promene[3], inline: false },
            )          
            .setTimestamp()
            .setFooter(`Pokutu vystavil ${message.author.username}`, 'https://2img.net/h/img3.wikia.nocookie.net/__cb20131207184033/lsrp/pl/images/b/b0/Logolspd.png');           // URL obrázku dole
        message.channel.send(exampleEmbed)
        message.delete()
    }
    if(jmeno_promene[0] == '!pd'){   //Přidá to roli 
        message.member.roles.add('751127045005770925').then(message.react('✅'));
    }
    if(jmeno_promene[0] == '!rpd'){
        message.member.roles.remove('751127045005770925')
    }
    if (message.content == '-ticket') {
        message.guild.createTicket({ owner: message.author })
        message.delete();
    }
    if (message.content == 'close' && message.channel.isTicket()) {
        message.channel.delete();
    }
});