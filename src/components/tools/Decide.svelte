<script lang="ts">
  import { scale, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { getRandomElement } from "./utils";

  export let trans: {
    dice: string;
    int: string;
    throw: string;
    decideHelper: string;
    addBelow: string;
    makeDecide: string;
    add: string;
    clear: string;
    remove: string;
    optionTip: string;
  };

  interface Option {
    id: number;
    content: string;
  }

  let uid = 1;

  let diceFrom = 1;
  let diceTo = 6;
  let diceResult = "0";
  let diceInt = true;

  let decideResult = "";
  let optionInput = "";
  let options: Option[] = [];
  $: isOptionInputEmpty = optionInput === "";
  $: isOptionsEmpty = options.length === 0;

  function dice() {
    const result = Math.random() * (diceTo - diceFrom) + diceFrom;
    diceResult = diceInt ? result.toFixed(0) : result.toFixed(4);
  }

  function decide() {
    const [result] = getRandomElement(options);
    decideResult = result.content;
  }

  function addOption() {
    options.unshift({
      id: uid++,
      content: optionInput,
    });
    options = options;
    optionInput = "";
  }

  function clearOptions() {
    options = [];
  }

  function removeOption(id: number) {
    options = options.filter((option) => option.id !== id);
  }
</script>

<fieldset class="field-set mb-m">
  <legend>{trans.dice}</legend>

  <div class="settings mb-s">
    <input
      class="focus-outline input-outlined random-number-input"
      type="number"
      bind:value={diceFrom}
    />
    <span class="to">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M2 15s0-6 6-6c4 0 4.5 3.5 7.5 3.5c4 0 4-3.5 4-3.5H22s0 6-6 6c-4 0-5.5-3.5-7.5-3.5c-4 0-4 3.5-4 3.5H2"
        /></svg
      >
    </span>
    <input
      class="focus-outline input-outlined random-number-input"
      type="number"
      bind:value={diceTo}
    />
    <div class="int-box">
      <input
        id="int"
        name="int"
        class="checkbox"
        type="checkbox"
        bind:checked={diceInt}
      />
      <label for="int" class="nowrap">{trans.int}</label>
    </div>
  </div>
  <div class="output">
    <button
      class="button-primary text-icon-container"
      type="button"
      on:click={dice}
    >
      <slot name="dice-icon" />
      {trans.throw}
    </button>
    <span><slot name="right-arrow-icon" /></span>
    <strong class="dice-result text-center">{diceResult}</strong>
  </div>
</fieldset>

<fieldset class="field-set">
  <legend>{trans.decideHelper}</legend>

  <div class="decide-result text-center mb-s">
    {#if decideResult !== ""}
      <strong>{decideResult}</strong>
    {:else}
      {trans.addBelow}
    {/if}
  </div>
  <div class="mb-s">
    <button
      class="center button-primary button-decide"
      type="button"
      disabled={isOptionsEmpty}
      on:click={decide}
    >
      {trans.makeDecide}
    </button>
  </div>
  <div class="decide-input-box mb-s">
    <input
      class="focus-outline input-outlined random-number-input"
      type="text"
      placeholder={trans.optionTip}
      maxlength="15"
      bind:value={optionInput}
    />
    <button
      class="button-primary"
      type="button"
      disabled={isOptionInputEmpty}
      on:click={addOption}
      title={trans.add}
    >
      <slot name="add-icon" />
    </button>
    <button
      class="button-primary"
      type="button"
      disabled={isOptionsEmpty}
      on:click={clearOptions}
      title={trans.clear}
    >
      <slot name="clear-icon" />
    </button>
  </div>
  <ul class="options-list">
    {#each options as option (option.id)}
      <li class="option" transition:slide={{ duration: 300 }}>
        {option.content}
        <button
          class="button button-remove"
          type="button"
          on:click={() => removeOption(option.id)}
          title={trans.remove}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
            /></svg
          >
        </button>
      </li>
    {/each}
  </ul>
</fieldset>

<style lang="scss">
  // @keyframes pop {
  //   from {
  //     transform: scale(1);
  //   }
  //   50% {
  //     transform: scale(1.5);
  //   }
  //   to {
  //     transform: scale(1);
  //   }
  // }

  fieldset {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 1rem;

    transition: height 0.2s;
  }
  legend {
    font-size: 1.2rem;
  }
  .checkbox {
    width: 1.5rem;

    accent-color: var(--color-primary);
  }
  .nowrap {
    white-space: nowrap;
  }
  .settings {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .int-box {
    display: flex;
    gap: 0.5rem;
  }
  .output {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: center;
    gap: 1rem;
  }
  .dice-result,
  .decide-result {
    font-size: 2rem;
  }
  .decide-result {
    color: #ccc;

    strong {
      color: var(--color-on-background);
    }
  }
  .decide-input-box {
    display: flex;
    gap: 0.5rem;

    .button-primary {
      padding: 0.6rem;
    }
  }
  .button-decide {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .options-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .option {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;

    font-size: 1.5rem;

    background-color: var(--color-surface);
    border-radius: 1rem;

    .button-remove {
      margin-left: auto;

      color: rgba(240, 55, 83, 0.5);
    }
  }
</style>
