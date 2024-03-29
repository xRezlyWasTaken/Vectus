const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js')
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
    .setName('tag')
    .setDescription('Tagı Öğrenirsiniz'),
  run: async (client, interaction) => {
    let sistem = db.get(`kayıttag_${interaction.guild.id}`)
    if(!sistem) return interaction.reply({content: "Bu sunucuda taglı alım aktif edilmemiş!"})
    const embed = new EmbedBuilder()
    .setColor(0x00ffff)
    .setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.user.avatarURL()})
    .addFields(
      {name: "Tagımız:", value: "❃", inline: true},
      {name: "Yardım Almak İsterseniz", value: "/yardım", inline: true}
    )
    .setFooter({text: `Versty`, iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL())
    interaction.reply({ embeds: [embed]})
  }
}