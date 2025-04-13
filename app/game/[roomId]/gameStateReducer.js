export const gameStateInit = {
  playerUUID: "",
  playerName: "",
  playerAvatar: "",
  playerCards: [null, null],
  playerBets: 0,
  playerBuyIn: 0,
  disableAction: true,
  isHost: false,
  showNewRound: false,
  showRaisePanel: false,
  showBuyInDecrement: false,
  minBet: 4,
  gameText: "",
  opponents: [],
  centerCards: [],
  bbUUID: "",
  sbUUID: "",
  inTurnUUID: "",
  winnerUUIDs: [],
  reward: 0,
};

export const gameStateReducer = (state, { type, payload }) => {
  let playerState;
  switch (type) {
    case "JOIN_ROOM":
      return {
        ...state,
        playerUUID: payload.playerUUID,
        playerName: payload.playerName,
        playerAvatar: payload.playerAvatar,
        playerBuyIn: payload.playerBuyIn,
        opponents: payload.opponents,
        isHost: payload.isHost,
        showNewRound: payload.isHost,
        gameText: payload.isHost ? "Press NEW ROUND to start." : "Waiting for game to start.",
      };
    case "HIDE_NEW_GAME":
      return {
        ...state,
        showNewRound: false,
      };
    case "SHOW_NEW_GAME":
      return {
        ...state,
        showNewRound: true,
      };
    case "DISABLE_ACTION":
      return {
        ...state,
        disableAction: true,
      };
    case "ENABLE_ACTION":
      return {
        ...state,
        disableAction: false,
      };
    case "SHOW_RAISE_PANEL":
      return {
        ...state,
        showRaisePanel: true,
      };
    case "HIDDEN_RAISE_PANEL":
      return {
        ...state,
        showRaisePanel: false,
      };
    case "NEW_ROUND":
      playerState = payload.players.find((item) => item.uuid === state.playerUUID);
      return {
        ...state,
        reward: 0,
        showBuyInDecrement: true,
        playerBuyIn: playerState.buyIn,
        playerBets: playerState.bets,
        playerCards: [
          { rank: "X", suit: "X" },
          { rank: "X", suit: "X" },
        ],
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        centerCards: payload.centerCards,
        bbUUID: payload.bbUUID,
        sbUUID: payload.sbUUID,
        minBet: 4,
        inTurnUUID: payload.inTurnUUID,
        winnerUUIDs: payload.winnerUUIDs,
        gameText:
          payload.sbUUID === state.playerUUID
            ? "You are the Small Blind."
            : `${payload.players.find((item) => item.uuid === payload.sbUUID).username} is the Small Blind.`,
      };
    case "NEXT_TURN":
      playerState = payload.players.find((item) => item.uuid === state.playerUUID);
      return {
        ...state,
        showBuyInDecrement: false,
        inTurnUUID: payload.inTurnUUID,
        centerCards: payload.centerCards,
        disableAction: payload.inTurnUUID !== state.playerUUID,
        minBet: payload.minBet,
        playerBets: playerState.bets,
        playerBuyIn: playerState.buyIn,
        playerCards: playerState.cards[0] === null ? playerState.cards : state.playerCards,
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        gameText:
          payload.inTurnUUID === state.playerUUID
            ? "It's your turn now."
            : `${state.opponents.find((item) => item.uuid === payload.inTurnUUID).username}'s turn.`,
      };
    case "SET_PLAYER_CARD":
      return {
        ...state,
        playerCards: payload,
      };
    case "SET_WINNER":
      return {
        ...state,
        inTurnUUID: "",
        playerCards: payload.players.find((item) => item.uuid === state.playerUUID).cards,
        centerCards: payload.centerCards,
        playerBuyIn: payload.players.find((item) => item.uuid === state.playerUUID).buyIn,
        reward: payload.winnerUUIDs[0] === state.playerUUID ? payload.reward : 0,
        winnerUUIDs: payload.winnerUUIDs,
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        showNewRound: state.isHost && payload.players.find((item) => item.buyIn === 0) === undefined,
        gameText:
          payload.winnerUUIDs[0] === state.playerUUID
            ? "You are the winner!"
            : `${state.opponents.find((item) => item.uuid === payload.winnerUUIDs[0]).username} is the winner!`,
      };
    case "SET_WINNERS":
      return {
        ...state,
        inTurnUUID: "",
        playerCards: payload.players.find((item) => item.uuid === state.playerUUID).cards,
        centerCards: payload.centerCards,
        playerBuyIn: payload.players.find((item) => item.uuid === state.playerUUID).buyIn,
        reward: payload.winnerUUIDs.includes(state.playerUUID) ? payload.reward : 0,
        winnerUUIDs: payload.winnerUUIDs,
        opponents: payload.players.filter((item) => item.uuid !== state.playerUUID),
        showNewRound: state.isHost && payload.players.find((item) => item.buyIn === 0) === undefined,
        gameText: payload.winnerUUIDs.includes(state.playerUUID)
          ? `You, ${state.opponents
              .filter((item) => payload.winnerUUIDs.includes(item.uuid))
              .map((item) => item.username)
              .join(", ")} are the winners!`
          : `${state.opponents
              .filter((item) => payload.winnerUUIDs.includes(item.uuid))
              .map((item) => item.username)
              .join(", ")} are the winners!`,
      };
  }
};
