<script lang="ts">
  export let trans: {
    detect: string;
    output: string;
  };

  let id = 0;
  let result = '';

  function detect() {
    id++;
    result = trans.output;
  }
</script>

<article class="flex gap-l">
  <button class="button-primary" type="button" on:click={detect}>
    {trans.detect}
  </button>
  {#key id}
    <strong
      class="flex items-center justify-center gap-2 text-3xl mb-4 animate-pop min-h-16">
      {#if result !== ''}
        <div class="animate-wiggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3rem"
            height="3rem"
            viewBox="0 0 24 24"
            {...$$props}>
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M8 10L6 8l6-6l6 6l-2 2v7a1 1 0 0 0 2 0a1 1 0 0 1 2 0a3 3 0 0 1-5 2.236V21a1 1 0 0 1-2 0v-2h-2v2a1 1 0 0 1-2 0v-1.764A3 3 0 0 1 4 17a1 1 0 0 1 2 0a1 1 0 0 0 2 0z" />
          </svg>
        </div>
        {result}
      {:else}
        &nbsp;
      {/if}
    </strong>
  {/key}
</article>

<style>
  article {
    align-items: flex-start;
  }
  button {
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
  }
  .animate-wiggle {
    animation: wiggle 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-12deg);
    }
    50% {
      transform: rotate(12deg);
    }
  }
</style>
