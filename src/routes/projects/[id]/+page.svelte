<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Chart, registerables } from "chart.js";

  export let data;

  let chart: Chart;
  let canvas: HTMLCanvasElement;

  Chart.register(...registerables);

  let chartData = null;

  if (data.languages) {
    const labels = Object.keys(data.languages);
    const values = Object.values(data.languages);
    chartData = {
      labels,
      datasets: [
        {
          label: "Language Breakdown",
          data: values,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#C9CBCF",
          ],
        },
      ],
    };
  }

  onMount(() => {
    if (chartData && canvas) {
      chart = new Chart(canvas, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
        },
      });
    }
  });

  onDestroy(() => {
    chart?.destroy();
  });
</script>

<div class="p-5">
  <h2 class="font-bold text-2xl">{data.project?.name}</h2>
  <p>{data.project?.description}</p>

  {#if chartData}
    <div class="max-w-md mt-8">
      <canvas bind:this={canvas}></canvas>
    </div>
  {:else}
    <p class="mt-8">No language data available for this project.</p>
  {/if}

  <div class="mt-12">
    <h3 class="font-bold text-lg mb-2">
      Similar Projects (AI Recommendations)
    </h3>
    {#if data.similarProjects && data.similarProjects.length > 0}
      <ul class="list-disc ml-6">
        {#each data.similarProjects as proj}
          <li class="mb-2">
            <a
              class="text-blue-600 hover:underline"
              href={`/projects/${proj.id}`}>{proj.name}</a
            >
            {#if proj.description}
              <span class="text-gray-500"> — {proj.description}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {:else}
      <p>No similar projects found.</p>
    {/if}
  </div>
</div>
