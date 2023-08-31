<script lang="ts">
  import { setInterval, clearInterval } from "worker-timers";

  export let trans: {
    start: string;
    pause: string;
    skip: string;
    working: string;
    break: string;
  };

  const workingState = {
    name: "working",
    descText: trans.working,
    minutes: 25,
  };
  const breakState = {
    name: "break",
    descText: trans.break,
    minutes: 5,
  };

  let timerId: number | null = null;
  $: isRunning = timerId !== null;

  let state = workingState;
  let minutes = state.minutes;
  $: minutesText = timeToString(minutes);
  let seconds = 0;
  $: secondsText = timeToString(seconds);

  function timeToString(time: number): string {
    return time <= 9 ? `0${time}` : time.toString();
  }

  function start() {
    if (timerId) {
      alert("Timer id exists!");
    } else {
      checkNotification();
      // Start immediately
      timerId = setInterval(countdown(), 1000);
    }
  }

  function checkNotification() {
    if (window.Notification && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const _ = new Notification("Pomodoro started.");
        }
      });
    }
  }

  function pause() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function countdown() {
    seconds--;
    if (seconds < 0) {
      seconds = 60 + seconds;
      minutes--;
      if (minutes < 0) {
        minutes = 0;
        timeOut();
      }
    }
    return countdown;
  }

  function timeOut() {
    toggleState();

    if (window.Notification && Notification.permission === "granted") {
      const _ = new Notification("Pomodoro ended.");
    }
  }

  function toggleState() {
    state = state === workingState ? breakState : workingState;
    minutes = state.minutes;
    seconds = 0;
    pause();
  }
</script>

<article class="pomodoro" data-state={state.name}>
  <h3 class="time">{minutesText} : {secondsText}</h3>
  <div class="button-row">
    {#if isRunning}
      <button
        class="button play-button"
        type="button"
        on:click={pause}
        title={trans.pause}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          class="icon"
          ><path
            d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"
            fill="currentColor"
          /></svg
        >
      </button>
    {:else}
      <button
        class="button play-button"
        type="button"
        on:click={start}
        title={trans.start}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          class="icon"
          ><path
            d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"
            fill="currentColor"
          /></svg
        >
      </button>
    {/if}
    <button
      class="button"
      type="button"
      on:click={toggleState}
      title={trans.skip}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        class="icon"
        ><path
          d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"
          fill="currentColor"
        /></svg
      >
    </button>
  </div>
  <p class="state">{state.descText}</p>
</article>

<style lang="scss">
  .pomodoro {
    padding: 2rem 5rem;

    text-align: center;
    color: white;

    // background-color: rgb(250, 100, 100);
    background: linear-gradient(
      to right,
      rgb(250, 100, 100) 50%,
      rgb(100, 160, 250) 50%
    );
    background-size: 200% 100%;
    background-position: left;
    border-radius: 2rem;

    transition: background-position 0.3s ease-out;

    &[data-state="break"] {
      background-position: right;
    }
  }
  .time {
    font-family: Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 5rem;
  }
  .button-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-items: center;
  }
  .play-button {
    grid-column: 2;
    animation: bubble 0.3s;

    .icon {
      width: 6rem;
    }
  }
  .icon {
    width: 4rem;

    color: white;

    border-radius: 100%;

    transition: background-color 0.3s;
  }
  button:hover .icon {
    background-color: rgba(255 255 255 / 0.15);
  }
  .state {
    font-size: 1.5rem;
  }

  @keyframes bubble {
    from,
    to {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  @media (max-width: 28em) {
    .pomodoro {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    .button-row {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
