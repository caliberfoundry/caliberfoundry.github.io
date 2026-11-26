export function fileRequestProgress() {
  const meter = document.getElementById('requestProgress');
  const timing = document.getElementById('requestTiming');
  let timer;
  let start;
  let previousDuration;
  function reset() {
    clearInterval(timer);
    meter.hidden = true;
    timing.textContent = '';
  }
  return {
    reset,
    begin() {
      reset();
      meter.value = 0;
      meter.hidden = false;
      start = performance.now();
    },
    waiting() {
      meter.value = 50;
      const deadline = performance.now() + 15000;
      function update() {
        const elapsed = performance.now() - start;
        const remaining = Math.ceil((deadline - performance.now()) / 1000);
        timing.textContent = previousDuration > elapsed
          ? 'About ' + Math.ceil((previousDuration - elapsed) / 1000) + ' s remaining, based on the previous run.'
          : 'Waiting for the service. Request timeout in ' + Math.max(0, remaining) + ' s.';
      }
      update();
      timer = setInterval(update, 500);
    },
    complete() {
      clearInterval(timer);
      previousDuration = performance.now() - start;
      timing.textContent = '';
      meter.value = 100;
    }
  };
}

export async function readUtf8(file) {
  try {
    return new TextDecoder('utf-8', {fatal:true}).decode(await file.arrayBuffer());
  } catch {
    throw Error('Could not read this file as UTF-8. Save it as UTF-8 and retry.');
  }
}
