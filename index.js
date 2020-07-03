const Discord = require('discord.js');
const youtube = require('ytdl-core');
const config = require('./config.js');
const bot = new Discord.Client();

const token = config.token;
const channelID = config.codChannelID;
const url = config.url;
const targetUserID = config.targetID;

bot.on('ready', () => {
  console.log('Bot is online');
});

bot.on('voiceStateUpdate', async (oldUserState, newUserState) => {
  if (
    newUserState.id === targetUserID &&
    newUserState.channelID === channelID
  ) {
    console.log('VINNY JOINED THE CHANNEL.');
    const connection = await newUserState.channel.join();
    connection.play(youtube(url, { filter: 'audioonly' }));
    setTimeout(() => {
      connection.disconnect();
    }, 8000);
  }

  console.log(
    `${
      newUserState.guild.members.cache.get(newUserState.id).displayName
    } has entered the channel.`
  );
});

bot.login(token);
