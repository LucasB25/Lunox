const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "join",
    description: "Invite bot to your voice channel.",
    category: "Music",
    permissions: {
        bot: ["Speak", "Connect"],
        channel: ["Speak", "Connect"],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: false,
        player: false,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: false });

        if (player) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | I already joined a voice channel.`);

            return interaction.editReply({ embeds: [embed] });
        }

        if (!player) {
            player = await client.ruvyrias.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                region: interaction.member.voice.channel.rtcRegion || undefined,
                deaf: true,
            });

            await player.connect();

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`☑️\` | Joined to ${interaction.member.voice.channel.toString()}`);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
