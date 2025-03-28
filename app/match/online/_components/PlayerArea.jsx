import Avatar from '@/app/_components/Avatar'

export default function PlayerArea() {
  return (
    <div className="">
      <Avatar
        className={styles.playerAvatar}
        src={player.avatar}
        name={player.name}
      />
      <div className={styles.blindTag}>
        {sbBetsName === player.name
          ? 'SB'
          : bbBetsName === player.name
            ? 'BB'
            : null}
      </div>
      <div className={styles.playerNameText}>{player.name}</div>
      <ChipLabel className={styles.playerBank} chips={player.bank} digits={5}>
        BANK
      </ChipLabel>
      <div className={styles.playerHandArea}>
        {player.cards.map((item, index) => (
          <div key={index} className={styles.cardArea}>
            <PokerCard rank={item?.rank} suit={item?.suit} />
          </div>
        ))}
      </div>
      <div className={styles.playerBtnArea}>
        <ThemeBtn onClick={handleCall} disabled={isBtnDisabled}>
          {player.bets === top_bets ? 'CHECK' : 'CALL'}
        </ThemeBtn>
        <ThemeBtn onClick={handleRaise} disabled={isBtnDisabled}>
          RAISE
        </ThemeBtn>
        <ThemeBtn onClick={handleFold} disabled={isBtnDisabled}>
          FOLD
        </ThemeBtn>
      </div>
      <ChipLabel className={styles.playerBets} chips={player.bets} digits={3}>
        BETS
      </ChipLabel>
    </div>
  )
}
