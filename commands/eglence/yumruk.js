const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yumruk')
    .setDescription('İstediğiniz Kişiye Yumruk Atarsınız.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Sarılmak İstediğin Kişiyi Seç')
        .setRequired(true)),
  run: async (client, interaction) => {
    let user = interaction.options.getUser('hedef');

    var sarilmak = ["https://cdn.discordapp.com/attachments/854117147146715146/1147608723989217410/dean-winchester-punch.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1147608746344853695/kemal-sunal-vur.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1147608756889333951/yumruk.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1147608761863778304/200w.gif"];

    let random = sarilmak[Math.floor(Math.random() * sarilmak.length)]

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} ${user.username}'i yumrukladı`)
      .setImage(random)

    await interaction.reply({ embeds: [embed] })

  }
}