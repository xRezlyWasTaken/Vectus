const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')
const config = require('../../config.js')
const moment = require("moment");
moment.locale("tr");
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
    .setName('cihaz-bilgi')
    .setDescription('Üyeninin Cihaz Bilgisini Görürsünüz')
    .addUserOption(opt => opt.setName('hedef').setDescription('Cihaz Bilgisini Görmek İstediğiniz Hedef')),
  run: async (client, interaction) => {
    let botkomut = config.botkomut
    var uye = interaction.options.getUser('hedef')
    let member = interaction.guild.members.cache.get(uye.id)
    let Cihaz = {
      web: 'İnternet Tarayıcısı',
      desktop: 'Bilgisayar (App)',
      mobile: 'Mobil'
    }
    let clientStatus;
    if (member.presence && member.presence.status !== 'offline') { clientStatus = `${Cihaz[Object.keys(member.presence.clientStatus)[0]]}` } else { clientStatus = 'Çevrimdışı/Görünmez' }
        interaction.reply({ embeds: [new EmbedBuilder().setColor(0x00ff00).setDescription(`${member.toString()} kullanıcısının bağlandığı cihaz: \`${clientStatus}\`
`)] });
          
  }
}