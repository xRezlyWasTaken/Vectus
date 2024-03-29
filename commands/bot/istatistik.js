const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require("discord.js");
const discord = require('discord.js');
const moment = require('moment');
const client = require("moment-duration-format")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("istatistik")
    .setDescription("Botun Gecikme Değerine Bakarsınız"),
  run: async (client, interaction) => {

    const duration = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
    const embed = new EmbedBuilder()
      .setAuthor({ name: `İstatistiklerim`, iconurl: "https://media.discordapp.net/attachments/944295908399538187/1138467462967464129/image.png" })
      .setColor(0x00ffff)
      .addFields(
        { name: "<:dev:829823441867112488> Geliştiriciler", value: `<@!962002003779805264> \n<@!962002003779805264>`, inline: true },
        { name: "<:discord:829823598595407952> Discord Sürümü", value: `${discord.version}`, inline: true },
        { name: "<a:tamam:806136101529059338> Ping", value: `${client.ws.ping}`, inline: true },
        { name: "<:Js:811661537491943445> Kullanıcı Sayısı", value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, inline: true },
        { name: "<:Js:811661537491943445> Sunucu Sayısı", value: `${client.guilds.cache.size}`, inline: true },
        { name: "<:Js:811661537491943445> Kanal Sayısı", value: `${client.channels.cache.size}`, inline: true },
        { name: "<:AyarPng:829828591575105616> Destek Sunucusu", value: `[Tıkla ve Katıl](https://dsc.gg/391craft)`, inline: true },
        { name: "<a:idle:843471802809712661> Uptime", value: `${duration}`, inline: true },)
    const alınıyor = new EmbedBuilder()
      .setDescription(`
        İstatistiklerim Alınıyor Lütfen Bekleyin...
        `)
    interaction.reply({ embeds: [alınıyor] }).then(m => {
      setTimeout(() => {
        m.edit({ embeds: [embed] })
      }, 3500)
    })
  }
};