const ticketSystem = require('djs-ticketsystem');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.login('NzA3NjA4Nzk3NjgxODExNDg3.XrLSDA.UbWptuBhqwCtLCOgkAgvaQ6Ttyo');

client.on('message', message => {
    if (message.content == '-ticket') {
        message.guild.createTicket({ owner: message.author })
            .catch(console.error);
        message.delete();
    }
client.on('message', message => {
    if (message.content == 'close' && message.channel.isTicket()) {
        message.channel.delete();
    }
})
});