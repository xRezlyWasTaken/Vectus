const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, resolveColor, Embed } = require('discord.js')
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
    .setName('abone-sayı')
    .setDescription('Abone Sayısına Bakmak Sen')
    .addUserOption(option =>
        option.setName('hedef')
          .setDescription('Abone Sayısı Sorgulanacak Hedefi Seçin (Opsiyonel)')
      ),
  run: async (client, interaction) => {
    let abonerol = db.get(`abonerol_${interaction.guild.id}`)
    let abonesistem = db.get(`abonesistem_${interaction.guild.id}`)
    let yetkili = db.get(`aboneyetkili_${interaction.guild.id}`)
    let log = db.get(`abonelog_${interaction.guild.id}`)
    let member = interaction.options.getUser('hedef')
    let toplam = db.get(`abonetop_${interaction.guild.id}_${interaction.user.id}`) || 0
    if(!interaction.member.roles.cache.has(yetkili)) return interaction.reply({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle(`Yetkisiz Kullanım`).setDescription(`Bu komutu kullanabilmek için ${yetkili} rolüne sahip olman lazım`)]})
 
    let uye;
  if (member) {
      uye = member;
    } else {
        uye = interaction.user;
    }
    const embed = new EmbedBuilder()
.setAuthor({name: `Sorgulayan ${uye.username}`, iconURL: uye.avatarURL()})
.addFields(
    {name: "Sorgulanan", value: `<@!${uye.id}>`, inline: true},
    {name: "Sorgulayan", value: `<@!${interaction.user.id}>`, inline: true},
    {name: "Abone Verme Sayısı", value: `\`${toplam}\``, inline: true},
    )
.setFooter({text: 'Vectus', avatarURL: interaction.user.avatarURL()})
.setTimestamp()
interaction.reply({embeds: [embed]})
  }
}