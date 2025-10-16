<script lang="ts">
  export let trans: {
    inputText: string;
    cleanLb: string;
    clean: string;
  };

  let input = '';
  let cleanLineBreaks = false;
  let showSuccess = false;

  async function clean() {
    if (input === '') {
      return;
    }

    input = input.replace(/\ /g, '');
    if (cleanLineBreaks) {
      input = input.replace(/(\r\n|\n|\r)/gm, '');
    }

    await navigator.clipboard.writeText(input);
    showSuccess = true;
  }
</script>

<article>
  <textarea
    class="focus-outline border-2 border-gray-400"
    placeholder={trans.inputText}
    bind:value={input}></textarea>
  <div class="flex gap-s justify-content-center mb-m">
    <input
      id="clean-line-breaks"
      type="checkbox"
      bind:checked={cleanLineBreaks} />
    <label for="clean-line-breaks">{trans.cleanLb}</label>
  </div>

  <div class="flex items-center gap-m">
    <button
      type="button"
      class="button-primary center"
      on:click={clean}
      disabled={input === ''}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1Z" /></svg>
      {trans.clean}
    </button>
    {#if showSuccess}
      <strong>OK</strong>
    {/if}
  </div>
</article>

<style>
  textarea {
    display: block;
    width: 100%;
    height: 30vh;
    resize: none;
    margin-bottom: 1rem;
    padding: 1rem;

    border-radius: var(--border-radius-s);
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
