const client = require("../index.js");
const { Collection } = require("discord.js")
const path = require('path');
const { readdirSync } = require("fs")
const fs = require("fs")
const config = require("../config.js")
const { joinVoiceChannel } = require('@discordjs/voice');

const { ActivityType } = require("discord.js")
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {

    client.user.setActivity("Vectus En İyisi!")
    client.user.setStatus(config.Bot.DurumTipi)
    joinVoiceChannel({
      channelId: "1098171779765239889",
      guildId: "1094154910485987378",
      adapterCreator: client.guilds.cache.get("1094154910485987378").voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });
  }
};

