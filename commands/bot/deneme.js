const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField } = require('discord.js')
const Rache = require('rachedb')
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
    .setName('davetsil')
    .setDescription('Tüm Davetleri Sil'),
    run: async (client, interaction) => {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "Yeterli Yetkin Yok"})
      
  setInterval(() => {
	       interaction.guild.invites.fetch().then(invites => {
  invites.each(i => i.delete())
}) 
  }, 2500)
	  
    }
}