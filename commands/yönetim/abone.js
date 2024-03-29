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
    .setName('abone')
    .setDescription('Abone Rolü Vermek Sen')
    .addUserOption(option =>
        option.setName('hedef')
          .setDescription('Abone Rolü Verilecek Hedefi Seçin')
          .setRequired(true)
      ),
  run: async (client, interaction) => {
    let abonerol = db.get(`abonerol_${interaction.guild.id}`)
    let abonesistem = db.get(`abonesistem_${interaction.guild.id}`)
    let yetkili = db.get(`aboneyetkili_${interaction.guild.id}`)
    let log = db.get(`abonelog_${interaction.guild.id}`)
    let member = interaction.options.getUser('hedef')
    let uye = interaction.guild.members.cache.get(member.id)
    let toplam = db.get(`abonetop_${interaction.guild.id}_${interaction.user.id}`) || 0
    if(!interaction.member.roles.cache.has(yetkili)) return interaction.reply({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle(`Yetkisiz Kullanım`).setDescription(`Bu komutu kullanabilmek için ${yetkili} rolüne sahip olman lazım`)]})
    if(abonesistem == "false") return interaction.reply({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle(`Abone Sistem`).setDescription(`Abone Sistemi Ayarlanmamış!`)]}) 
    if(uye.roles.cache.has(abonerol)) return interaction.reply({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle(`Abone Rol`).setDescription(`Bu kullanıcı zaten bu role sahip!`)]})
  
    uye.roles.add(abonerol)
    if(!toplam) {
      db.set(`abonetop_${interaction.guild.id}_${interaction.user.id}`, 1)
    } else {
      db.add(`abonetop_${interaction.guild.id}_${interaction.user.id}`, 1)
    }
    const embed1 = new EmbedBuilder()
    .setColor(0xff0000)
    .setDescription(`Abone Rolü Veriliyor.`)
    .setTimestamp()
    interaction.reply({embeds: [embed1]}).then(m => {
      setTimeout(() => {
        m.edit({embeds: [new EmbedBuilder().setColor(0x00ff00).setDescription(`Abone Rolü Veriliyor..`)]})
      }, 1000)
      setTimeout(() => {
        uye.roles.add(abonerol)
        m.edit({embeds: [new EmbedBuilder().setColor(0x0000ff).setTitle(`Abone Rolü Verildi!`).addFields(
          {name: `Abone Yetkilisi`, value: `${interaction.user}`, inline: true},
          {name: `Abone Rolü Verilen`, value: `${member}`, inline: true},
          {name: `Toplam Abone Verme`, value: `${toplam}`, inline: true},
        )]})
        interaction.guild.channels.cache.get(log).send({embeds: [new EmbedBuilder().setTitle(`Abone Rolü Verildi!`).setColor(0x0000ff).addFields(
          {name: `Abone Yetkilisi`, value: `${interaction.user}`, inline: true},
          {name: `Abone Rolü Verilen`, value: `${member}`, inline: true},
          {name: `Toplam Abone Verme`, value: `${toplam}`, inline: true},
        )]})
      }, 2000)
    })
  }
}