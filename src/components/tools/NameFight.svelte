<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import { delay } from './utils';
  import { gameLoop } from './NameFight';

  interface Log {
    id: number;
    content: string;
  }

  const maxHp = 100;
  let fighters = [
    {
      name: '玩家1',
      hp: 100,
    },
    {
      name: '玩家2',
      hp: 100,
    },
  ];
  let isFighting = false;
  let logs: Log[] = [];

  async function onStartClick() {
    for (const fighter of fighters) {
      fighter.hp = 100;
    }
    fighters = fighters;

    isFighting = true;
    if (logs.length !== 0) {
      logs = [];
      await delay(300);
    }

    const winner = await gameLoop(fighters, addLog, setHp);
    addLog(`<strong>${winner}</strong>取得了胜利！`);
    isFighting = false;
  }

  function addLog(log: string) {
    logs.unshift({
      id: logs.length,
      content: log,
    });
    logs = logs;
    console.log(logs);
  }

  function setHp(index: number, value: number) {
    if (value > maxHp) {
      value = maxHp;
    } else if (value < 0) {
      value = 0;
    }
    fighters[index].hp = value;
    fighters = fighters;
  }
</script>

<section class="health-section mb-m">
  <div class="fighter">
    <input
      class="name-input text-center mb-s"
      type="text"
      bind:value={fighters[0].name} />
    <div class="hp-bar" style="--hp: {(fighters[0].hp / maxHp) * 100}%"></div>
  </div>
  <div class="fighter">
    <input
      class="name-input text-center mb-s"
      type="text"
      bind:value={fighters[1].name} />
    <div class="hp-bar flipx" style="--hp: {(fighters[1].hp / maxHp) * 100}%">
    </div>
  </div>
</section>
<section class="button-section mb-s">
  <button
    class="center button start-button"
    on:click={onStartClick}
    disabled={isFighting}>
    Start!
  </button>
</section>
<section class="log-section">
  <ul class="logs">
    {#each logs as log (log.id)}
      <li in:slide={{ duration: 500 }} out:fade={{ duration: 200 }}>
        {@html log.content}
      </li>
    {/each}
  </ul>
</section>

<style>
  .name-input {
    padding: 0.5rem;
  }
  .flipx {
    transform: scale(-1, 1);
  }
  .health-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .hp-bar {
    position: relative;
    display: block;
    width: 100%;
    height: 1rem;

    background-color: var(--color-background2);
    border-radius: 1rem;

    &::before {
      content: '';
      position: absolute;
      width: var(--hp, 100%);
      height: 100%;

      background-color: var(--color-surface);
      border-radius: 1rem;

      transition: width 0.2s 0.3s ease;
    }

    &::after {
      content: '';
      position: absolute;
      width: var(--hp, 100%);
      height: 100%;

      background-color: var(--color-primary);
      border-radius: 1rem;

      transition: width 0.1s linear;
    }
  }
  .start-button {
    display: block;
    margin-inline: auto;
    padding: 0.5rem 2rem;

    color: white;
    font-size: 2rem;

    background-color: #f03752;
    border-radius: 10rem;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
  .logs {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    & :global(.damage) {
      color: #f03752;
    }

    & :global(.heal) {
      color: #2c9678;
    }
  }

  @media (max-width: 28em) {
    .health-section {
      gap: 1rem;
    }
  }
</style>
