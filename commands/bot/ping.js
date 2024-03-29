const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun Gecikme Değerine Bakarsınız"),
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setAuthor({ name: "Vectus" })
      .setColor("#ff0000")
      .setDescription(`Gecikme Değerim Ölçülüyor...`)
    const embed1 = new EmbedBuilder()
      .setAuthor({ name: "Vectus" })
      .setColor("#00ff00")
      .setDescription(`Gecikme Değerim ${client.ws.ping}`)
    interaction.reply({ embeds: [embed] }).then(m => {
      setTimeout(() => {
        m.edit({ embeds: [embed1] })
      }, 5000)
    })
  }
};