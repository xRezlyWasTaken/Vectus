const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tokat')
    .setDescription('İstediğiniz Kişiyi Tokatlarsınız.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Tokatlamak İstediğin Kişiyi Seç')
        .setRequired(true)),
  run: async (client, interaction) => {
    let user = interaction.options.getUser('hedef');

    var sarilmak = ["https://cdn.discordapp.com/attachments/1136388462845640744/1140728227577475162/tokat-atmak.gif", "https://cdn.discordapp.com/attachments/1136388462845640744/1140728257935847454/recep-recepivedik6.gif", "https://cdn.discordapp.com/attachments/1136388462845640744/1140728263367479406/sevgiliden-tokat-yemek_1230994.gif", "https://cdn.discordapp.com/attachments/1136388462845640744/1140728584252694529/baka-slap.gif", "https://cdn.discordapp.com/attachments/1136388462845640744/1140728602061705297/penguin-slap.gif",
      "https://tenor.com/view/esin-eser-slapped-mad-angry-gif-14908174"];

    let random = sarilmak[Math.floor(Math.random() * sarilmak.length)]

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} ${user.username}'i tokatladı`)
      .setImage(random)

    interaction.reply({ embeds: [embed] })

  }
}