<script lang="ts">
  export let trans: {
    detect: string;
    output: string;
  };

  let id = 0;
  let result = "";

  function detect() {
    id++;
    result = trans.output;
  }
</script>

<article>
  {#key id}
    <strong
      class="flex items-center justify-center gap-2 text-3xl mb-4 animate-pop min-h-16">
      {#if result !== ""}
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
  <button class="button-primary w-full" type="button" on:click={detect}>
    {trans.detect}
  </button>
</article>
