const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
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
    .setName('afk')
    .setDescription('Afk Olmak')
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Afk Sebebini Girin')
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const reason = interaction.options.getString('sebep');
    if (interaction.member.displayName.startsWith("[AFK]") || db.has(`afk-${interaction.user.id}`)) return await interaction.reply({content: "Zaten Afk Modundasın!", ephemeral: true})
    db.set(`afk-${interaction.user.id}`, { reason: reason, time: Date.now(), nick: interaction.member.displayName })
    interaction.member.setNickname(`[AFK] ` + interaction.member.displayName).catch(err => { })
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(0x00ffff)
          .setAuthor({ name: "Afk İşlemi", iconURL: interaction.user.avatarURL() })
          .setDescription(`> **${interaction.user} ${reason} Sebebiyle AFK Moduna Giriş Yaptın!**`)]
    })
  }
}