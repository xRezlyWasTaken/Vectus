const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
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
    .setName('say')
    .setDescription('Sunucu Üye Bilgileri'),
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator))return interaction.reply({ embeds: [new EmbedBuidler().setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] })
    let aktif = interaction.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
    let uye = interaction.guild.memberCount
    //let bot = interaction.guild.channels.cache.filter(channel => channel.type == ChannelType.GuildVoice).map(channel => channel.members.filter(member => member.user.bot).size).reduce((a, b) => a + b)
    let sesli = interaction.guild.members.cache.filter(x => !x.user.bot && x.voice.channel).size || "0"
    let boost = interaction.guild.premiumSubscriptionCount;
    let boosts = interaction.guild.premiumTier;
	let botsayı = 0
	if(interaction.guild.channels.cache.filter(channel => channel.type == ChannelType.GuildVoice) === 0) {
		botsayı += 0;
	} else {
		botsayı += interaction.guild.channels.cache.filter(channel => channel.type == ChannelType.GuildVoice).map(channel => channel.members.filter(member => member.user.bot).size).reduce((a, b) => a + b)
	}
    
    await interaction.reply({ embeds: [
      new EmbedBuilder()
      .setColor(0x00ffff)
      .setAuthor({name: `${interaction.guild.name} Sunucusunun İstatistik`, iconURL: interaction.user.avatarURL()})
      .addFields(
        {name: `<a:tac2:802309471296290817> Toplam Üye Sayısı:`, value: `${uye}`, inline: true},
        {name: `<a:krmzyldz:843471834938867732> Toplam Aktif Üye Sayısı:`, value: `${aktif}`, inline: true},
        {name: `<a:seviye:843471961316655105> Toplam Kaç Kişi Seste:`, value: `${sesli} \`(+${botsayı} Bot)\``, inline: true},
        {name: `<a:boost:843471830157361173> Toplam Boost Sayısı`, value: `${boost}`, inline: true},
        {name: `<a:boost:843471830157361173> Boost Seviyesi`, value: `${boosts}`, inline: true},
      )
      .setFooter({text: `Sorgulayan ${interaction.user.displayName}`, iconURL: interaction.guild.iconURL()})
      .setTimestamp()
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setTitle(`Sunucu İstatistik`)] });
  }
}