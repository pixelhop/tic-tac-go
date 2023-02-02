import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { useIntervalFn } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../supabase';

type GameState =
  | 'waiting-for-players'
  | 'instructions'
  | 'countdown'
  | 'game'
  | 'round-winner'
  | 'game-winner'
  | 'disconnected';
type GameGrid = ('x' | '0' | undefined)[];

export interface Game {
  code: string;
  round: number;
  roundStartTime?: string;
  state: GameState;
  currentPlayer: 1 | 2;
  currentGoStart?: string;
  currentGoEnd?: string;
  roundWinners: ((1 | 2) | null)[];
}

const TURN_DURATION = 3000;

/**
 * The below masks represent all the winning combinations possible
 */
const WIN_MASKS = [
  [true, true, true, false, false, false, false, false, false],
  [false, false, false, true, true, true, false, false, false],
  [false, false, false, false, false, false, true, true, true],
  [true, false, false, true, false, false, true, false, false],
  [false, true, false, false, true, false, false, true, false],
  [false, false, true, false, false, true, false, false, true],
  [true, false, false, false, true, false, false, false, true],
  [false, false, true, false, true, false, true, false, false],
];

export const useGameStore = defineStore('game', () => {
  const router = useRouter();

  const isPlayer1 = ref(false);
  const player1Name = ref('');
  const player1Connected = ref(false);
  const player1Ready = ref(false);

  const player2Name = ref('');
  const player2Connected = ref(false);
  const player2Ready = ref(false);

  const imReady = computed(() => (isPlayer1.value ? player1Ready.value : player2Ready.value));

  function initGameState(): Game {
    return {
      code: '',
      round: 1,
      roundStartTime: undefined,
      state: 'waiting-for-players',
      currentPlayer: 1,
      currentGoStart: undefined,
      currentGoEnd: undefined,
      roundWinners: [null, null, null, null, null],
    };
  }

  const game = reactive<Game>(initGameState());

  const grid = ref<GameGrid>([]);

  const winningMask = computed(() => {
    // Test X
    const winningXMask = WIN_MASKS.find((mask) =>
      mask.every((shouldMatch, index) => (shouldMatch ? grid.value[index] === 'x' : true))
    );

    if (winningXMask) {
      return winningXMask;
    }

    // Test 0
    const winning0Mask = WIN_MASKS.find((mask) =>
      mask.every((shouldMatch, index) => (shouldMatch ? grid.value[index] === '0' : true))
    );

    if (winning0Mask) {
      return winning0Mask;
    }

    return null;
  });

  const channel = ref<RealtimeChannel>();

  /**
   * Broadcast the current game state to the
   * other player
   */
  async function broadcastState() {
    const payload = {
      game,
      grid: grid.value,
    };

    console.log('Broadcast state');
    console.log({ payload });

    await channel.value?.send({
      type: 'broadcast',
      event: 'state',
      payload,
    });
  }

  /**
   * Recieve game state from the other player and update our local state
   * @param state
   */
  function onReceiveState(state: { game: Game; grid: GameGrid }) {
    console.log('Receive state');
    console.log({ state });
    Object.assign(game, state.game);
    grid.value = state.grid;
  }

  /**
   * Conect to the supabase realtime channel for this game
   * and setup listeners for the events we are interested in
   */
  function connect() {
    channel.value = supabase.channel(game.code, {
      config: {
        presence: {
          key: isPlayer1.value ? 'player1' : 'player2',
        },
      },
    });

    channel.value.on('presence', { event: 'sync' }, () => {
      const presenceState: any = channel.value?.presenceState();
      console.log('Online users: ', channel.value?.presenceState());
      if (Object.keys(channel.value?.presenceState() as object).length === 2) {
        console.log({ name: presenceState.player1[0].name });
        player1Name.value = presenceState.player1[0].name;
        player2Name.value = presenceState.player2[0].name;
        game.state = 'instructions';
        router.push('/game');
      }
    });

    channel.value.on('presence', { event: 'join' }, ({ newPresences }) => {
      console.log('New users have joined: ', newPresences);
    });

    channel.value.on('presence', { event: 'leave' }, ({ leftPresences }) => {
      console.log('Users have left: ', leftPresences);
      game.state = 'disconnected';
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

    // Listen for updates to the grid
    channel.value.on('broadcast', { event: 'grid' }, (event) => {
      console.log('Update grid');
      grid.value = event.payload.grid;
      console.log({ grid: grid.value });
    });

    // List for state broadcasts
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
   * Disconnect from the current game
   */
  function disconnect() {
    channel.value?.unsubscribe();
    game.code = '';
    player1Name.value = '';
    player1Connected.value = false;
    player1Ready.value = false;

    player2Name.value = '';
    player2Connected.value = false;
    player2Ready.value = false;

    Object.assign(game, initGameState());
    grid.value = [];
  }

  /**
   * Create a new game. This sets the player 1 name and generates
   * a new random game code that can be used to connec to the
   * correct channel
   * @param name
   */
  function newGame(name: string) {
    player1Name.value = name;
    game.code = uniqueNamesGenerator({
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
    game.code = joinGameCode.toLowerCase();
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
      game.state = 'countdown';
      game.roundStartTime = dayjs().add(5, 'seconds').toISOString();
      broadcastState();
      setTimeout(() => {
        game.state = 'game';
        game.currentGoStart = new Date().toISOString();
        game.currentGoEnd = dayjs().add(TURN_DURATION, 'milliseconds').toISOString();
        broadcastState();
      }, 5000);
    }
  });

  function nextRound() {
    grid.value = [];
    game.round += 1;
    game.currentPlayer = (2 - (game.round % 2)) as 1 | 2;
    game.roundStartTime = dayjs().add(5, 'seconds').toISOString();
    game.state = 'countdown';
    broadcastState();
    setTimeout(() => {
      game.state = 'game';
      game.currentGoStart = new Date().toISOString();
      game.currentGoEnd = dayjs().add(TURN_DURATION, 'milliseconds').toISOString();
      broadcastState();
    }, 5000);
  }

  function placeMarker(gridIndex: number) {
    // Check it is the current players turn
    if ((isPlayer1.value && game.currentPlayer !== 1) || (!isPlayer1.value && game.currentPlayer !== 2)) {
      return;
    }

    // Check we aren't placing our marker on an existing marker
    if (grid.value[gridIndex]) {
      console.warn('Cannot place marker here');
      return;
    }

    // Check someone hasn't already won
    if (winningMask.value) {
      return;
    }

    // Logic to check if its the players turn
    const marker = isPlayer1.value ? '0' : 'x';
    grid.value[gridIndex] = marker;

    // Test for a win
    const winner = WIN_MASKS.some((mask) =>
      mask.every((shouldMatch, index) => (shouldMatch ? grid.value[index] === marker : true))
    );

    if (winner) {
      console.log('Winner');
      game.roundWinners[game.round - 1] = isPlayer1.value ? 1 : 2;

      setTimeout(() => {
        game.state = 'round-winner';
        broadcastState();

        setTimeout(() => {
          // If we have had less than five rounds and no player has won 3 games, start the next round
          // otherwise show the game winner screen
          const player1Wins = game.roundWinners.filter((value) => value === 1).length;
          const player2Wins = game.roundWinners.filter((value) => value === 2).length;

          console.log({
            player1Wins,
            player2Wins,
            gameRound: game.round,
          });
          if (game.round < 5 && player1Wins < 3 && player2Wins < 3) {
            nextRound();
          } else {
            game.state = 'game-winner';
            broadcastState();
          }
        }, 5000);
      }, 2000);
    }

    // Test for a draw
    const usedGridCells = grid.value.filter((cell) => !!cell);
    if (usedGridCells.length === 9) {
      console.log('Draw');
      setTimeout(() => {
        game.state = 'round-winner';
        broadcastState();

        setTimeout(() => {
          if (game.round < 5) {
            nextRound();
          } else {
            game.state = 'game-winner';
            broadcastState();
          }
        }, 5000);
      }, 2000);
    }

    // Next go
    game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
    game.currentGoStart = new Date().toISOString();
    game.currentGoEnd = dayjs().add(TURN_DURATION, 'milliseconds').toISOString();

    broadcastState();
  }

  useIntervalFn(() => {
    const player = isPlayer1.value ? 1 : 2;
    if (game.state !== 'game' || game.currentPlayer !== player) {
      return;
    }

    // If our go has ended place a random marker
    const freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((index) => !grid.value[index]);
    if (dayjs().isAfter(dayjs(game.currentGoEnd))) {
      console.log('Missed turn playing randomly!');
      console.log({ freeIndexes });
      const randomIndex = freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
      console.log({ randomIndex });
      placeMarker(randomIndex);
    }
  }, 200);

  return {
    isPlayer1,
    player1Name,
    player1Connected,
    player1Ready,
    player2Name,
    player2Connected,
    player2Ready,
    imReady,
    newGame,
    joinGame,
    disconnect,
    ready,
    // gameCode,
    // gameState,
    // gameRound,
    // gameRoundStartTime,
    // gameCurrentPlayer,
    // gameCurrentGoStart,
    // gameCurrentGoEnd,
    // gameRoundWinners,
    winningMask,
    // state,
    game,
    grid,
    placeMarker,
  };
});
