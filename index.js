const Discord = require('discord.js');
const youtube = require('ytdl-core');
const config = require('./config.js');
const bot = new Discord.Client();

const token = config.token;
const url = config.url;
const targetUserID = config.targetID;

bot.login(token);

bot.on('ready', () => {
  console.log('Bot is online.');
});

bot.on('voiceStateUpdate', async (oldUserState, currentTarget) => {
  if (currentTarget.channelID !== null) {
    logActivity(currentTarget, true);
    if (currentTarget.id === targetUserID) {
      playSound(currentTarget);
    }
  } else {
    logActivity(currentTarget, false);
  }
});

async function playSound(target) {
  try {
    const connection = await target.channel.join();
    connection.play(youtube(url, { filter: 'audioonly' }));
    setTimeout(() => {
      connection.disconnect();
    }, 8000);
  } catch (error) {
    console.log(error.message);
  }
}

function logActivity(user, isActive) {
  console.log(
    `${user.guild.members.cache.get(user.id).displayName} ${
      isActive ? 'connected' : 'disconnected'
    }.`
  );
}
