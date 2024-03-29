const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const rache = require("rachedb")
const db = new rache({
    "dbName": "db", // DB dosya adımız.
    "dbFolder": "database", // DB klasör adımız.
    "noBlankData": true,
    "readable": true,
    "language": "tr" // "tr" veya "en" yazabilirsiniz
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName('idam')
    .setDescription('İdam Oylaması.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('İdam Oylaması Başlatmak İstediğin Kişiyi Seç')
        .setRequired(true)),
  run: async (client, interaction) => {
    let user = interaction.options.getUser('hedef');

let gif = "https://cdn.discordapp.com/attachments/1136388462845640744/1145099914674700478/idam-dirilis.gif"

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setDescription(`${interaction.user} ${user}'i idam etti'`)
    .setImage(gif)
    await interaction.reply({ embeds: [embed] })
  }
}