const { EmbedBuilder, ButtonBuilder, SlashCommandBuilder } = require('discord.js')
const data = require('carnoxisdbyaml');

module.exports = {
  data: new SlashCommandBuilder()
	.setName("sil")
	.setDescription("Mesaj Silme Komutu")
	.addIntegerOption(option =>
	  option
		.setName('miktar')
		.setDescription('Silinecek Mesaj Miktarı')
		.setRequired(true)),
  run: async (client, interaction) => {
	if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ contents: `Bu Komutu Kullanmak İçin \`Mesajları Yönet\` Yetkisi Lazım`, ephemeral: true })
let miktar = interaction.options.getInteger('miktar')
let sayı = 0;
interaction.channel.messages.fetch({limit: miktar}).then(a => {
	if(a.createdAt >= Date.now()-1209600000) return sayı--;
sayı++
})
if(sayı <= 0) return interaction.reply({content: "Hiçbir mesaj silinmedi, mesajların iki haftadan eski olmadığından emin olun.", ephemeral: true});
	const channel = interaction.channel;
let math = Math.floor(miktar / 100);
for (let i = 0; i < math; i++) {
try {
await channel.bulkDelete(100);
} catch (err) {}
}
try {
await channel.bulkDelete(miktar - 100 * math);
} catch (err) {}
try {
interaction.reply({ content: `${miktar} Adet Mesaj Silindi`, ephemeral: true });
} catch {}
  }
}