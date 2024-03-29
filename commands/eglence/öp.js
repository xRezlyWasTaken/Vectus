const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('öp')
    .setDescription('İstediğiniz Kişiyi Öpersiniz.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Öpmek İstediğin Kişiyi Seç')
        .setRequired(true)),
  run: async (client, interaction) => {
    let user = interaction.options.getUser('hedef');

    var sarilmak = ["https://media1.tenor.com/images/104b52a3be76b0e032a55df0740c0d3b/tenor.gif?itemid=10194764", "https://cdn.discordapp.com/attachments/854117147146715146/1138763459086004234/davydoff-love.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138763526748512286/giphy.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138763530921836584/e93540a5c88248b8580fe459dad8911a.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138763717715169370/KeyImpureAtlasmoth-max-1mb.gif"];

    let random = sarilmak[Math.floor(Math.random() * sarilmak.length)]

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} ${user.username}'i öptü`)
      .setImage(random)

    await interaction.reply({ embeds: [embed] })

  }
}