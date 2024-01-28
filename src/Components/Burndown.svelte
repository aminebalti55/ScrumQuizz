<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let chart;
    let estimatedEffortData = [10, 18, 14, 22, 12];
    let actualEffortData = [8, 15, 12, 20, 10];
  
    let tasks = [
      { id: 1, name: 'Analyse des besoins', effort: 3, remainingEffort: 5, dueDate: '2024-01-30' },
      { id: 2, name: 'Conception de l\'architecture', effort: 4, remainingEffort: 4, dueDate: '2024-01-31' },
      { id: 3, name: 'Développement des fonctionnalités', effort: 8, remainingEffort: 8, dueDate: '2024-02-03' },
      { id: 4, name: 'Tests et validation', effort: 1, remainingEffort: 5, dueDate: '2024-02-05' },
      { id: 5, name: 'Documentation', effort: 2, remainingEffort: 2, dueDate: '2024-02-05' },
    ];
  
    let draggedTask;
    let feedback = '';
    let requiredEffortPerDayBeforeDrag;
  
    function handleDragStart(event, task) {
      draggedTask = task;
  
      // Calculate requiredEffortPerDay before the task is dragged
      const remainingEffort = tasks.reduce((acc, task) => acc + task.remainingEffort, 0);
      const daysRemaining = actualEffortData.length; // Update this according to your logic
      requiredEffortPerDayBeforeDrag = remainingEffort / daysRemaining;
  
      // Update instructions based on the task being dragged
      const instructions = document.getElementById('instructions');
      instructions.innerHTML = `
        <p>En déplaçant la tâche "${task.name}", vous pouvez simuler son avancement sur le graphique.</p>
        <p>L'effort estimé pour chaque jour est représenté par la ligne bleue.</p>
        <p>L'effort réel est représenté par la ligne verte.</p>
        <p>Lorsque vous déplacez une tâche, l'effort correspondant est soustrait de l'effort réel du dernier jour.</p>
      `;
  
      // Clear the initial feedback message
      feedback = '';
    }
  
    function updateRemainingEffortAfterDrag() {
    if (draggedTask) {
      // Subtract draggedTask's effort from each task's remainingEffort
      tasks = tasks.map(task => {
        if (task.id === draggedTask.id) {
          return {
            ...task,
            remainingEffort: Math.max(0, task.remainingEffort - draggedTask.effort),
          };
        } else {
          return task;
        }
      });
    }
  }

  function handleDrop(event) {
  if (draggedTask) {
    // Update remaining effort for each task
    updateRemainingEffortAfterDrag();

    // Subtract the effort of the dragged task from the last day of actualEffortData
    actualEffortData[actualEffortData.length - 1] -= draggedTask.effort;

    // Redraw the chart with the updated data
    chart.data.datasets[1].data = actualEffortData;
    chart.update();

    // Move the task element to the completed tasks container
    let taskElement = document.getElementById(draggedTask.id);
    let completedTasksContainer = document.getElementById('completedTasks');
    if (taskElement && completedTasksContainer) {
      completedTasksContainer.appendChild(taskElement);
    }

    draggedTask = null;

    // Reset draggedTask to undefined if all tasks have been dragged
    if (tasks.every(task => task.remainingEffort === 0)) {
      draggedTask = undefined;
    }
  }
}

  
    $: {
      if (draggedTask !== undefined && draggedTask !== null) {
        // Calculate progress and update feedback
        const totalEstimatedEffort = estimatedEffortData.reduce((acc, val) => acc + val, 0);
        const totalActualEffort = actualEffortData.reduce((acc, val) => acc + val, 0);
        const remainingEffort = tasks.reduce((acc, task) => acc + task.remainingEffort, 0);
  
        const daysRemaining = actualEffortData.length; // Update this according to your logic
        const averageEffortPerDay = totalActualEffort / daysRemaining;
        const requiredEffortPerDay = remainingEffort / daysRemaining;
  
        if (remainingEffort === 0) {
          feedback = 'Félicitations ! Toutes les tâches ont été terminées.';
        } else if (remainingEffort < 0) {
          feedback = 'Attention ! L\'effort réel dépasse l\'effort estimé.';
        } else {
          if (averageEffortPerDay >= requiredEffortPerDayBeforeDrag) {
            feedback = `Bon travail ! En déplaçant la tâche "${draggedTask.name}", vous avez augmenté votre avance sur le planning.`;
          } else if (averageEffortPerDay < requiredEffortPerDayBeforeDrag) {
            feedback = `Attention ! En déplaçant la tâche "${draggedTask.name}", vous avez réduit votre avance sur le planning.`;
          } else {
            feedback = `Vous êtes dans les temps. En déplaçant la tâche "${draggedTask.name}", vous n'avez pas affecté votre avancement.`;
          }
        }
      }
    }
  
    onMount(() => {
      const ctx = document.getElementById('burndownChart').getContext('2d');
  
      const data = {
        labels: ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4', 'Jour 5'],
        datasets: [
          {
            label: 'Effort estimé',
            borderColor: 'blue',
            data: estimatedEffortData,
            fill: false,
          },
          {
            label: 'Effort réel',
            borderColor: 'green',
            data: actualEffortData,
            fill: false,
          },
        ],
      };
  
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            position: 'bottom',
            title: {
              display: true,
              text: 'Jours',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Effort',
            },
          },
        },
      };
  
      chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    });
  </script>
  
  
  
  
  
  <style>
    main {
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  
    .tasks {
      margin-right: 20px;
    }
  
    .task {
  background-color: #e0f7fa;
  color: #0d47a1;
  padding: 5px; /* Reduce padding */
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: move;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-size: 14px; /* Reduce font size */
}

.task-details {
  font-size: 10px; /* Reduce font size */
  color: #0d47a1;
}

.task:hover {
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}


    .chart-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    #burndownChart {
      max-height: 300px;
      width: 100%;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  
    .instructions, .feedback {
  background-color: #e0f7fa; /* Light blue background */
  color: #0d47a1; /* Dark blue text */
  padding: 10px;
  margin-top: 70px;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.instructions:hover, .feedback:hover {
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
  
    .feedback {
      margin-top: 10px;
      font-weight: bold;
    }

    .completed-tasks {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #ccc;
  max-height: 20px; /* Limit the height */
  margin-bottom: 90px;
}

  </style>
  
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 w-full h-full fixed top-0 left-0">
    <div class="bg-white rounded-lg shadow-lg p-2 m-2 max-w-200 max-h-120 w-auto h-auto overflow-auto flex flex-col md:flex-row">
      <div class="mb-2 md:mr-2 flex-grow">
        <h2 class="text-sm font-bold text-gray-800">Tasks</h2>
        <div class="mt-1">
          {#each tasks as task (task.id)}
            <div class="task bg-gray-200 p-1 rounded-lg mb-1" draggable="true" on:dragstart={(event) => handleDragStart(event, task)} id="{task.id}">
              {task.name}
              <div class="task-details text-xs text-gray-700">
                <p>Effort estimé: {task.effort}</p>
                <p>Effort restant: {task.remainingEffort}</p>
                <p>Date limite: {task.dueDate}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="mb-2 flex-grow">
        <h2 class="text-sm font-bold text-gray-800">Burndown Chart</h2>
        <canvas id="burndownChart" on:drop={handleDrop} on:dragover={(event) => event.preventDefault()}></canvas>
        <div class="completed-tasks" id="completedTasks">
            <!-- Completed tasks will be appended here -->
          </div>
        <div class="instructions bg-gray-200 p-1 rounded-lg mt-1 text-center text-xs text-gray-700" id="instructions">
          <p>Faites glisser les tâches sur le graphique de consommation pour simuler l'avancement du projet.</p>
          <p>Le graphique affiche l'effort estimé et l'effort réel sur cinq jours.</p>
        </div>
        <div class="feedback mt-1 font-bold">{feedback}</div>
      </div>
    </div>
  </div>
  