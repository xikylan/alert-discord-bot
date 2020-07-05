const Discord = require("discord.js");
const youtube = require("ytdl-core");
const config = require("./config.js");
const bot = new Discord.Client();

const token = config.token;
const url = config.url;
const happyID = config.happyID;
const myID = config.myID;
const harryPotter = config.harryPotterURL;
const targetUserID = config.targetID;
const serverID = config.serverID;

bot.login(token);

bot.on("ready", () => {
  console.log("Bot is online.");
});

bot.on("voiceStateUpdate", async (oldUserState, currentTarget) => {
  if (currentTarget.channelID !== null) {
    // when a user enters any channel, log to the console
    logActivity(currentTarget, true);
    if (currentTarget.id === targetUserID) {
      // if the user is the target user, play the sound
      playSound(currentTarget, url);
      console.log(
        currentTarget.guild.channels.cache
          .get(serverID)
          .send(config.warningMessage)
      );
    }
    if (currentTarget.id === happyID) {
      playSound(currentTarget, harryPotter);
    }
  } else {
    // when a user disconnects, log to the console
    logActivity(currentTarget, false);
  }
});

async function playSound(target, url) {
  try {
    // bot joins the same channel as the target user
    const connection = await target.channel.join();
    // plays audio
    connection.play(youtube(url, { filter: "audioonly" }));
    // after a certaim time limit, the bot exist the channel
    setTimeout(() => {
      connection.disconnect();
    }, 8000);
  } catch (error) {
    console.log(error.message);
  }
}

function logActivity(user, isActive) {
  // log when the user joins/leaves a channel with timestamp.
  console.log(
    `${user.guild.members.cache.get(user.id).displayName} ${
      isActive ? "connected" : "disconnected"
    } (${new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}).`
  );
}
