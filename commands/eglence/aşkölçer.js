const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aşk-ölçer')
    .setDescription('İstediğiniz Kişiye Aşk Ölçümü Yaparsınız.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Sarılmak İstediğin Kişiyi Seç')
        .setRequired(true)),
  run: async (client, interaction) => {
    let member = interaction.options.getUser('hedef');

    var anasonuc = Math.floor(Math.random() * 101);
    var kalp = "";
    var akalp = "";
    if (Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
      var c = 0;
      for (var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
        kalp += "❤️";
        c++;
      }
      for (var x = c; x < 10; x++) {
        akalp += `🖤`;
      }
    } else {
      var kalp = "🖤";
      var akalp = "🖤🖤🖤🖤🖤🖤🖤🖤🖤";
    }
    var yorum = "Sizi evlendirelim <3";
    if (anasonuc < 80) {
      var yorum = "Biraz daha uğraşırsan bu iş olacak gibi :)";
    }
    if (anasonuc < 60) {
      var yorum = "Eh biraz biraz bir şeyler var gibi.";
    }
    if (anasonuc < 40) {
      var yorum = "Azıcıkta olsa bir şeyler hissediyor sana :)";
    }
    if (anasonuc < 20) {
      var yorum = "Bu iş olmaz sen bunu unut.";
    }
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.displayName} ve ${interaction.user.displayName}`, iconURL: interaction.user.avatarURL() })
      .setDescription(
        `Aşk yüzdesi **%${anasonuc}**! \n${kalp}${akalp} \n\n${yorum}`
      )
      .setColor(0x00ffff);
    await interaction.reply({ embeds: [embed] });

  }
}