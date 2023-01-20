import { defineStore } from 'pinia';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

export const useGameStore = defineStore('game', () => {
  const router = useRouter();

  const isPlayer1 = ref(false);
  const player1Name = ref('');
  const player1Connected = ref(false);

  const player2Name = ref('');
  const player2Connected = ref(false);

  const gameCode = ref('');

  function connect() {
    const channel = supabase.channel(gameCode.value, {
      config: {
        presence: {
          key: isPlayer1.value ? 'player1' : 'player2',
        },
      },
    });

    channel.on('presence', { event: 'sync' }, () => {
      console.log('Online users: ', channel.presenceState());
    });

    channel.on('presence', { event: 'join' }, ({ newPresences }) => {
      console.log('New users have joined: ', newPresences);
    });

    channel.on('presence', { event: 'leave' }, ({ leftPresences }) => {
      console.log('Users have left: ', leftPresences);
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        const stat = await channel.track({
          online_at: new Date().toISOString(),
          name: isPlayer1.value ? player1Name.value : player2Name.value,
        });
        console.log(stat);
        // your callback function will now be called with the messages broadcast by the other client
      }
    });
  }

  function newGame(name: string) {
    player1Name.value = name;
    gameCode.value = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
      length: 3,
    });
    isPlayer1.value = true;
    router.push('/waiting');
    connect();
  }

  function joinGame(name: string, joinGameCode: string) {
    player2Name.value = name;
    gameCode.value = joinGameCode.toLowerCase();
    connect();
  }

  return {
    isPlayer1,
    player1Name,
    player1Connected,
    player2Name,
    player2Connected,
    gameCode,
    newGame,
    joinGame,
  };
});
