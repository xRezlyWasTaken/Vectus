const { EmbedBuilder, ButtonBuilder, SlashCommandBuilder, ChannelType, ButtonStyle, ActionRowBuilder } = require('discord.js')
const Discord = require('discord.js')
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
  .setName('rol')
  .setDescription('Rol Al/Ver Komutu')
  .addStringOption(option =>
    option.setName('işlem')
                   .setDescription('Yapmak İstediğiniz İşlemi Seçin')
                   .setRequired(true)
                   .addChoices(
                     {name: "ver", value: "ver"},
                     {name: "al", value: "al"},
                   )
    )
  .addUserOption(option => 
    option.setName('hedef')
                 .setDescription('Hedef Üyeyi Seçin')
                 .setRequired(true))
  .addRoleOption(option =>
    option.setName('rol')
                 .setDescription('Verilecek Rolü Seçin')
                 .setRequired(true)
    ),
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return await interaction.reply({ content: `Bu Komutu Kullanmak İçin \`Yönetici\` Yetkisi Lazım`, ephemeral: true })

  let işlem = interaction.options.getString('işlem')
  let hedef = interaction.options.getUser('hedef')
  let rol = interaction.options.getRole('rol')

  if (işlem === 'ver') {
	  if(hedef.id == interaction.user.id) return interaction.reply({content: `Kendine rol veremezsin!`, ephemeral: true})
    const embed = new EmbedBuilder()
    .setAuthor({name: "Rol İşlemi", iconURL: interaction.user.avatarURL()})
    .setDescription(`
    Hey! ${interaction.user.username},
    ${hedef} adlı üyeye ${rol} Yetkisini Vermek Üzeresin?
    `)
    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Onayla')
        .setStyle(ButtonStyle.Success);

      const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('İptal')
        .setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);
      await interaction.reply({ embeds: [embed], components: [row] })
      const onay = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
    ${hedef} adlı üyeye ${rol} Yetkisini Verildi!
      `)
      const iptal = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Rol Verme İşlemi İptal Edildi!
      `)
      const collectorFilter = i => i.user.id === interaction.user.id;
      const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

      if (confirmation.customId === 'confirm') {
        interaction.guild.members.cache.get(hedef.id).roles.add(rol)
        await interaction.editReply({ embeds: [onay], components: [] })
      } else if (confirmation.customId === 'cancel') {
        await interaction.editReply({ embeds: [iptal], components: [] });
      }
  } else if (işlem === 'al') {
	  	  if(hedef.id == interaction.user.id) return interaction.reply({content: `Kendinden rol alamazsın!`, ephemeral: true})
    const embed = new EmbedBuilder()
    .setAuthor({name: "Rol İşlemi", iconURL: interaction.user.avatarURL()})
    .setDescription(`
    Hey! ${interaction.user.username},
    ${hedef} adlı üyeden ${rol} Yetkisini Almak Üzeresin?
    `)
    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Onayla')
        .setStyle(ButtonStyle.Success);

      const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('İptal')
        .setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);
      await interaction.reply({ embeds: [embed], components: [row] })
      const onay = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
    ${hedef} adlı üyeden ${rol} Yetkisi Alındı!
      `)
      const iptal = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Rol Alma İşlemi İptal Edildi!
      `)
      const collectorFilter = i => i.user.id === interaction.user.id;
      const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

      if (confirmation.customId === 'confirm') {
        interaction.guild.members.cache.get(hedef.id).roles.remove(rol)
        await interaction.editReply({ embeds: [onay], components: [] })
      } else if (confirmation.customId === 'cancel') {
        await interaction.editReply({ embeds: [iptal], components: [] });
      }
  }
  }
    
}