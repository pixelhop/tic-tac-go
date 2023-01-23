import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../supabase';

type GameState = 'waiting-for-players' | 'instructions' | 'countdown' | 'game' | 'rounder-winner' | 'game-winner';

export const useGameStore = defineStore('game', () => {
  const router = useRouter();

  const isPlayer1 = ref(false);
  const player1Name = ref('');
  const player1Connected = ref(false);
  const player1Ready = ref(false);

  const player2Name = ref('');
  const player2Connected = ref(false);
  const player2Ready = ref(false);

  const gameCode = ref('');
  const gameRound = ref(1);
  const gameRoundStartTime = ref<string>();
  const gameState = ref<GameState>('waiting-for-players');

  const grid = ref<('x' | '0' | undefined)[]>([]);

  const channel = ref<RealtimeChannel>();

  async function broadcastState() {
    await channel.value?.send({
      type: 'broadcast',
      event: 'state',
      payload: {
        gameRoundStartTime: gameRoundStartTime.value,
        gameState: gameState.value,
      },
    });
  }

  function onReceiveState(state: { gameRoundStartTime: string; gameState: GameState }) {
    console.log('Receive state');
    console.log({ state });
    gameState.value = state.gameState;
    gameRoundStartTime.value = state.gameRoundStartTime;
  }

  /**
   * Conect to the supabase realtime channel for this game
   * and setup listeners for the events we are interested in
   */
  function connect() {
    channel.value = supabase.channel(gameCode.value, {
      config: {
        presence: {
          key: isPlayer1.value ? 'player1' : 'player2',
        },
      },
    });

    channel.value.on('presence', { event: 'sync' }, () => {
      console.log('Online users: ', channel.value?.presenceState());
      if (Object.keys(channel.value?.presenceState() as object).length === 2) {
        gameState.value = 'instructions';
        router.push('/game');
      }
    });

    channel.value.on('presence', { event: 'join' }, ({ newPresences }) => {
      console.log('New users have joined: ', newPresences);
    });

    channel.value.on('presence', { event: 'leave' }, ({ leftPresences }) => {
      console.log('Users have left: ', leftPresences);
    });

    channel.value.on('broadcast', { event: 'player-ready' }, ({ payload }) => {
      if (payload.player === 1) {
        player1Ready.value = true;
        router.push('/game');
      }

      if (payload.player === 2) {
        player2Ready.value = true;
        router.push('/game');
      }
    });

    channel.value.on('broadcast', { event: 'grid' }, (event) => {
      console.log('Update grid');
      console.log({ event });
      console.log(event.payload.grid);
      grid.value = event.payload.grid;
      console.log(grid.value);
    });

    channel.value.on('broadcast', { event: 'state' }, (event) => {
      onReceiveState(event.payload);
    });

    channel.value.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        const stat = await channel.value?.track({
          online_at: new Date().toISOString(),
          name: isPlayer1.value ? player1Name.value : player2Name.value,
        });
        console.log(stat);
        // your callback function will now be called with the messages broadcast by the other client
      }
    });
  }

  /**
   * Create a new game. This sets the player 1 name and generates
   * a new random game code that can be used to connec to the
   * correct channel
   * @param name
   */
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

  /**
   * Join an existing game. This will set the player 2 name
   * and connect them to the supabase realtime channel
   * @param name
   * @param joinGameCode
   */
  function joinGame(name: string, joinGameCode: string) {
    player2Name.value = name;
    gameCode.value = joinGameCode.toLowerCase();
    connect();
    router.push('/game');
  }

  /**
   * Mark the player as ready. When both players are ready the game will start
   */
  async function ready() {
    if (isPlayer1.value) {
      player1Ready.value = true;
      const begin = performance.now();
      await channel.value?.send({
        type: 'broadcast',
        event: 'player-ready',
        payload: {
          player: 1,
        },
      });
      const end = performance.now();
      console.log(`Latency is ${end - begin} milliseconds`);
    } else {
      player2Ready.value = true;
      channel.value?.send({
        type: 'broadcast',
        event: 'player-ready',
        payload: {
          player: 2,
        },
      });
    }
  }

  watch([player1Ready, player2Ready], ([player1ReadyValue, player2ReadyValue]) => {
    if (isPlayer1.value && player1ReadyValue && player2ReadyValue) {
      console.log('Readyyyyy');
      gameState.value = 'countdown';
      gameRoundStartTime.value = dayjs().add(5, 'seconds').toISOString();
      broadcastState();
    }
  });

  function placeMarker(gridIndex: number) {
    // Logic to check if its the players turn
    const marker = isPlayer1.value ? 'x' : '0';
    grid.value[gridIndex] = marker;

    // Broadcast the grid
    channel.value?.send({
      type: 'broadcast',
      event: 'grid',
      payload: {
        grid: grid.value,
      },
    });

    // Test for a win
  }

  return {
    isPlayer1,
    player1Name,
    player1Connected,
    player1Ready,
    player2Name,
    player2Connected,
    player2Ready,
    newGame,
    joinGame,
    ready,
    gameCode,
    gameState,
    gameRound,
    gameRoundStartTime,
    grid,
    placeMarker,
  };
});
