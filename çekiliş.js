const { EmbedBuilder, ButtonBuilder, SlashCommandBuilder, ChannelType, ButtonStyle, ActionRowBuilder } = require('discord.js')
const Discord = require('discord.js')
const rache = require("rachedb")
const db = new rache({
  "dbName": "db", // DB dosya adımız.
  "dbFolder": "database", // DB klasör adımız.
  "noBlankData": true,
  "readable": true,
  "language": "tr" // "tr" veya "en" yazabilirsiniz
})
const giveawayManager = require('discord-giveaways');
const ms = require('ms')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('çekiliş')
    .setDescription('Çekiliş Yaparsınız')
    .addChannelOption(option =>
      option
        .setName('kanal')
        .setDescription('Kanal Seç')
        .addChannelTypes(ChannelType.GuildText))
    .addStringOption(option =>
      option.setName('süre')
        .setDescription('Süre Belirt')
    )
    .addIntegerOption(option =>
      option.setName('kazanan')
        .setDescription('Kaç Kişi Kazanıcak?')
        .setMinValue(1)
        .setMaxValue(31)
    )
    .addStringOption(option =>
      option.setName('ödül')
        .setDescription('Ödül ne olucak?')
    ),


  run: async (client, interaction) => {
    let giveaways = (client.giveawaysManager ? client.giveawaysManager : [])

    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages) && !message.member.roles.cache.some((r) => r.name === "Giveaways"))
      return message.channel.send('<a:twitchbit:801155287842947133> Çekiliş başlatman için yeterli yetkin yok! gereken yetki; `Mesajları Yönet`.');
    let kanal = interaction.options.getChannel('kanal')
    let süre = interaction.options.getString('süre')
    let kazancak = interaction.options.getInteger('kazanan')
    let ödül = interaction.options.getString('ödül')

    client.giveawaysManager.start(kanal, {
      time: ms(süre),
      prize: ödül,
      winnerCount: parseInt(kazancak),
      hostedBy: interaction.user.username,
      messages: {
        giveaway: "🎉🎉 **Çekiliş başladı.** 🎉🎉",
        giveawayEnded: "🎉🎉 **Çekiliş bitti.** 🎉🎉",
        timeRemaining: "Kalan süre: **{duration}**!",
        inviteToParticipate: "Çekilişe katılmak için 🎉 emojisine tıklayın!",
        winMessage: `<a:twitchbit:801155287842947133> Tebrikler {winners}!, **{prize}** adlı çekilişi kazandın!`,
        embedFooter: "Çekiliş",
        noWinner: "<a:twitchbit:801155287842947133> Çekiliş iptal edildi. Yeterli katılım yok.",
        hostedBy: "{user} tarafından",
        winners: "kazanan",
        endedAt: "Bittiği zaman",
        units: {
          seconds: "saniye",
          minutes: "dakika",
          hours: "saat",
          days: "gün",
          pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        }
      }//////////////////////////////////////////
    });/////////////////////////////////////////////////////////////////////

    interaction.reply({ embeds: [new EmbedBuidler().addFields({ name: "Başarılı", value: `<a:twitchbit:801155287842947133> Çekiliş ${kanal} adlı kanalda başlatıldı!` }).setColor("Random")] });

  }
}
