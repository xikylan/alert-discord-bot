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
          .send(
            "ATTENTION: HE HAS JOINED.\n\nThis is not a test. This is your emergency broadcast system announcing the commencement of the Annual Purge sanctioned by the U.S Government. Weapons of class 4 and lower have been authorized for use during the Purge. All other weapons are restricted. Government officials of ranking 10 have been granted immunity from the Purge and shall not be harmed. Commencing at the siren, any and all crime, including murder, will be legal for 12 continuous hours. Police, fire, and emergency medical services will be unavailable until tomorrow morning, until 7 a.m., when the Purge concludes. Blessed by our New Founding Fathers and America, a nation reborn. May God be with you all."
          )
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
