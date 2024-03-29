const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sarıl')
    .setDescription('İstediğiniz Kişiye Sarılırsınız.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Sarılmak İstediğin Kişiyi Seç')
        .setRequired(true)),
  run: async (client, interaction) => {
    let user = interaction.options.getUser('hedef');

    var sarilmak = ["https://cdn.discordapp.com/attachments/854117147146715146/1138599224825618562/aysegul-poyraz.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138599308241944686/sarlma-sarlmak.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138599805837377706/4df030beb2228b72367a568dba9b4667.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138599808538517504/s-772560c4748677191a85cece7e35742879c1c47c.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1138599811730387034/tumblr_oxtq0hOF4s1sug9kko8_r1_540.gif"];

    let random = sarilmak[Math.floor(Math.random() * sarilmak.length)]

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} ${user.username}'e sarıldı`)
      .setImage(random)

    await interaction.reply({ embeds: [embed] })

  }
}