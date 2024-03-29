const { Events, EmbedBuilder, PermissionsBitField, SlashCommandBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ActionRowBuilder, ComponentType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Botun Tüm Komutlarına Bakarsınız"),
  run: async (client, interaction, message) => {


    const menu = new StringSelectMenuBuilder()
      .setCustomId('select')
      .setPlaceholder('Lütfen Bir Kategori Seç')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('Ana Sayfa')
          .setDescription('Ana Sayfa')
          .setEmoji("🏠")
          .setValue('ana'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Yönetim')
          .setDescription('Yönetim Komutları Sayfası.')
          .setEmoji("🔨")
          .setValue('mod'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Eğlence')
          .setDescription('Eğlence Komutları Sayfası.')
          .setEmoji("🎉")
          .setValue('eğlence'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Bot')
          .setDescription('Bot Komutları Sayfası.')
          .setEmoji("🤖")
          .setValue('bot'),
          new StringSelectMenuOptionBuilder()
          .setLabel('Kullanıcı')
          .setDescription('Kullanıcı Komutları Sayfası.')
          .setEmoji("👤")
          .setValue('kullanıcı'),
          new StringSelectMenuOptionBuilder()
          .setLabel('Sistemler')
          .setDescription('Sistemleri Ayarlama Sayfası.')
          .setEmoji("⚙️")
          .setValue('sistemler'),
          new StringSelectMenuOptionBuilder()
          .setLabel('Koruma')
          .setDescription('Koruma Komutları Sayfası.')
          .setEmoji("🛡️")
          .setValue('koruma'),
      );

    const row = new ActionRowBuilder()
      .addComponents(menu);

    const embed = new EmbedBuilder()
      .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
      .setTitle('Ana Sayfa')
      .setColor(0x00ffff)
      .setDescription(`
      [Yönetim](https://dsc.gg/391craft) **⇝** Yönetim Komutları
      [Eğlence](https://dsc.gg/391craft) **⇝** Eğlence Komutları
      [Bot](https://dsc.gg/391craft) **⇝** Bot Komutları
      [Koruma](https://dsc.gg/391craft) **⇝** Koruma Komutları
      [Kullanıcı](https://dsc.gg/391craft) **⇝** Kullanıcı Komutları
      [Sistemler](https://dsc.gg/391craft) **⇝** Sistemleri Ayarlama Sayfası
      
      **• Güncelleme Notları:**
      **Sürüm V0.6:** \`Kayıt Sistemi Eklendi!\`
      **Sürüm V0.5:** \`Koruma Sistemi Eklendi!\`
      **Sürüm V0.4:** \`Abone Sistemi Eklendi!\`
      
      **• Linkler:**
      • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
      `)
      .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
      .setTimestamp()
      .setThumbnail(interaction.user.avatarURL())
      .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
    interaction.reply({ embeds: [embed], components: [row] })
    client.on(Events.InteractionCreate, async interaction => {

      if (!interaction.isStringSelectMenu()) return;
    
      if (interaction.customId === 'select') {
        let choices = "";
        await interaction.values.forEach(async value => {
          choices += `${value}`
        })
        if (choices == 'mod') {
          const ileri = new ButtonBuilder()
          .setCustomId('ileri')
          .setLabel('▶️')
          .setStyle(ButtonStyle.Success)
          const geri = new ButtonBuilder()
          .setCustomId('geri')
          .setLabel('◀️')
          .setStyle(ButtonStyle.Success)
          const row1 = new ActionRowBuilder()
          .addComponents(ileri)
          const row2 = new ActionRowBuilder()
          .addComponents(geri)
          const mod = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Yönetim Komutları')
            .setColor(0x00ffff)
            .setDescription(`
            </abone:1146164353784086709> **⇝**  Seçtiğiniz Hedefe Abone Rolü Verir
            </abone-sayı:1146170855055966288> **⇝**  Sizin/Seçtiğiniz Kişinin Abone Sayısını Gösterir
            </ban:1144376220876804174> **⇝**  Seçtiğiniz Kişiyi Sunucudan Yasaklarsınız
            </unban:1144728046872567923> **⇝**  Seçtiğiniz Kişinin Sunucudan Yasağını Kaldırırsınız
            </kayıt:1148010137815109632> **⇝**  Kayıt Sistemi ile Kullanıcıları Kayıt Etme
            </kayıtlar:1148019662370640045> **⇝**  Etiketlenen Üyenin/Kendinizin Kayıt Bilgilerine Bakarsınız
            </isim:1148019662370640042> **⇝**  Seçilen Üyenin İsmini Değiştirirsiniz
            </isimler:1148019662370640043> **⇝**  Seçilen Hedefin/Kendinizin İsimlerinize Bakarsınız
            </tag:1148019662370640044> **⇝**  Sunucunun Tagına Bakarsınız
          
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate()
          await interaction.editReply({ embeds: [mod], components: [row, row1] })
          const collectorFilter = i => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageComponentCollector({ filter: collectorFilter, componentType: ComponentType.Button, time: 60000 });
          collector.on('collect', async (i) => {
          if(i.customId === 'ileri') {
            const mod1 = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Yönetim Komutları')
            .setColor(0x00ffff)
            .setDescription(`
          </sayaç:1144376221451428022> **⇝**  Sayaç Sistemini Ayarlar
          </sil:1144376221451428023> **⇝**  Yazılan Miktar Kadar Mesaj Silinir
          </mute:1144376221451428020> **⇝**  Süreli Mute Atma Komutu
          </otorol:1144717188754833509> **⇝**  Otorol Sistemini Ayarlar
          
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
           await i.update({ embeds: [mod1], components: [row, row2] })
          } else if(i.customId === 'geri') {
             await i.update({ embeds: [mod], components: [row, row1] })
          }
        })
        } else if (choices == 'eğlence') {
          const eglence = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Eğlence Komutları')
            .setColor(0x00ffff)
            .setDescription(`
          </öp:1144376220876804172> **⇝**  Seçtiğiniz Kişiyi Öpersiniz.
          </sarıl:1144376220876804170> **⇝**  Seçtiğiniz Kişiye Sarılırsınız.
          </avatar:1144376220876804169> **⇝**  İstediğiniz Kişinin Avatarını Alırsınız.
          </tokat:1144376220876804171> **⇝**  İstediğiniz Kişiye Tokat Alırsınız.
          </idam:1145109299811602492> **⇝**  İstediğiniz Kişiyi İdam Edersiniz.
          </aşk-ölçer:1147609696757350420> **⇝**  İstediğiniz Kişiye Tokat Alırsınız.
          </yumruk:1147609696757350421> **⇝**  İstediğiniz Kişiyi İdam Edersiniz.
    
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate();
          await interaction.editReply({ embeds: [eglence], components: [row] })
        } else if (choices == 'bot') {
          const bot = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Bot Komutları')
            .setColor(0x00ffff)
            .setDescription(`
          </istatistik:1144376220876804166> **⇝** Botun İstatistiklerine bakarsınız
          </ping:1144376220876804167> **⇝** Botun Gecikme Değerlerine bakarsınız
          </davet:1146180961084637184> **⇝** Botu Davet Etmek ve Destek Sunucusuna Gelmek İçin
          
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate();
          await interaction.editReply({ embeds: [bot], components: [row] })
        } else if (choices == 'ana') {
          const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Ana Sayfa')
            .setColor(0x00ffff)
            .setDescription(`
          [Yönetim] **⇝** Yönetim Komutları
          [Eğlence] **⇝** Eğlence Komutları
          [Bot] **⇝** Bot Komutları
          [Koruma] **⇝** Koruma Komutları
          [Kullanıcı] **⇝** Kullanıcı Komutları
          [Sistemler] **⇝** Sistemleri Ayarlama Sayfası
          
          **• Güncelleme Notları:**
          **Sürüm V0.5:** \`Koruma Sistemi Eklendi!\`
          **Sürüm V0.4:** \`Abone Sistemi Eklendi!\`
          **Sürüm V0.3:** \`Snipe Sistemi Eklendi!\`
          
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate();
          await interaction.editReply({ embeds: [embed], components: [row] })
        } else if (choices == 'kullanıcı') {
          const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Kullanıcı Komutları')
            .setColor(0x00ffff)
            .setDescription(`
          </say:1144734920330203288> **⇝** Sunucunun Üye Bilgilerini Atar
          </kullanıcı-bilgi:1144738517503725620> **⇝** Hedef Üyenin Bilgilerini Atar
		  </sunucu-bilgi:1158822379015897214> **⇝** Sunucunun Bilgilerini Atar
          </snipe:1144740080376889344> **⇝**  Girilen Miktarda Silinen Son Mesajları Atar
    
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate();
          await interaction.editReply({ embeds: [embed], components: [row] })
        } else if (choices == 'sistemler') {
          const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Sistemler Sayfası')
            .setColor(0x00ffff)
            .setDescription(`
          </abone-sistem:1146164353784086708> **⇝** Abone Sistemini Ayarlar
          </ban-sistem:1144376220876804173> **⇝**  Ban Sistemini Ayarlar
          </mute-sistem:1144376220876804175> **⇝**  Süreli Mute Sistemini Ayarlar
          </kayıt-sistem ayarla:1147958672434135130> **⇝**  Kayıt Sistemini Ayarlar
          </kayıt-sistem taglı-alım:1147958672434135130> **⇝**  Taglı Alım ve Sunucu Tagın Ayarlar
          </kayıt-sistem sıfırla:1147958672434135130> **⇝**  Kayıt Sistemini Sıfırlar
    
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate();
          await interaction.editReply({ embeds: [embed], components: [row] })
        } else if (choices == 'koruma') {
          const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vectus', iconURL: client.user.avatarURL() })
            .setTitle('Koruma Sayfası')
            .setColor(0x00ffff)
            .setDescription(`
          </reklam-engel:1147100658718228596> **⇝** Reklam Engel Sistemi
          </küfür-engel:1147100658718228595> **⇝**  Küfür Engel Sistemi
          </kanal-koruma:1147100658718228594> **⇝**  Kanal Koruma Sistemi
          </rol-koruma:1147100658718228597> **⇝**  Rol Koruma Sistemi
          </emoji-koruma:1147100658718228593> **⇝**  Emoji Koruma Sistemi
          </bot-koruma:1147100658718228592> **⇝**  Bot Koruma Sistemi
          </webhook-koruma:1147100658718228592> **⇝**  Webhook Koruma Sistemi
    
          **• Linkler:**
          • [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1200082118252953731&permissions=8&scope=bot) • [Destek Sunucusu](https://dsc.gg/391craft) •
          `)
            .setImage("https://cdn.discordapp.com/attachments/1098171774522380308/1223267884797530223/standard-1.gif?ex=66193bfe&is=6606c6fe&hm=e696e099677bead816023e8c120b50cab41bb37af00a01502add1a6335f2f9d0&")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: 'Vectus', iconURL: interaction.user.avatarURL() })
          await interaction.deferUpdate();
          await interaction.editReply({ embeds: [embed], components: [row] })
        }
        //    await interaction.update({ contents: `${choices}` })
      }
    
    })
  }
};
