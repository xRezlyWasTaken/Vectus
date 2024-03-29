const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, resolveColor } = require('discord.js')
const moment = require("moment")
require('moment-duration-format');
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
    .setName('snipe')
    .setDescription('Silinen Son Mesaj'),
  run: async (client, interaction) => {
    let snipemesaj = db.get(`snipe_${interaction.channel.id}`)
    if (!snipemesaj) return await interaction.reply({ content: "Bu Kanalda Daha önce hiç mesaj silinmemiş." });
    let now = moment()
    let before = moment(`${snipemesaj.ytarih}`)
    let before1 = moment(`${snipemesaj.starih}`)
    const embed = new EmbedBuilder()
      .setTitle("Silinen Mesaj")
      .setColor(0x00ffff)
      .setDescription(`
    ◾️ \`Yazan Kişi:\` <@${snipemesaj.author.id}>
    ◾️ \`Mesaj:\` **${snipemesaj.content}**
    ◾️ \`Yazılma Tarihi:\` ${moment.duration(now - before).format("D[ gün(ler)], H[ saat], m[ dakika], s[ saniye]")} **Önce Yazılmış**
    ◾️ \`Silinme Tarihi:\` ${moment.duration(now - before1).format("D[ gün(ler)], H[ saat], m[ dakika], s[ saniye]")} **Önce Silinmiş**
    `)
    //.setDescription(silinenler.sort((a, b) => b.created - a.created).map(x => `**Mesaj İçeriği:** \`${x.content}\`\n**Mesajı Silen:** \`${x.tag}\`\n**Silinme Zamanı:** \`${x.created}\``).join('\n'))
    interaction.reply({ embeds: [embed] });
  }
}