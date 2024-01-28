<script>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let tasks = writable([
      { id: 1, name: 'Définir les objectifs du sprint', status: 'À faire', correctStatus: 'À faire', tooltip: 'Cette tâche doit être placée dans la colonne "À faire".' },
      { id: 2, name: 'Créer le backlog du produit', status: 'À faire', correctStatus: 'En cours', tooltip: 'Cette tâche doit être placée dans la colonne "En cours".' },
      { id: 3, name: 'Planification du sprint', status: 'À faire', correctStatus: 'En cours', tooltip: 'Cette tâche doit être placée dans la colonne "En cours".' },
      { id: 4, name: 'Standup quotidien', status: 'À faire', correctStatus: 'En cours', tooltip: 'Cette tâche doit être placée dans la colonne "En cours".' },
      { id: 5, name: 'Revue de sprint', status: 'À faire', correctStatus: 'Terminé', tooltip: 'Cette tâche doit être placée dans la colonne "Terminé".' },
      { id: 6, name: 'Rétrospective de sprint', status: 'À faire', correctStatus: 'Terminé', tooltip: 'Cette tâche doit être placée dans la colonne "Terminé".' },
    ]);
  
    let messageType = '';
    let message = '';
  
    let columns = ['À faire', 'En cours', 'Terminé'];
  
    let draggedTask;
  
    function handleDragStart(event, task) {
      draggedTask = task;
    }
  
    function handleDrop(event, column) {
      if (draggedTask) {
        draggedTask.status = column;
        tasks.update(allTasks => allTasks.map(t => t.id === draggedTask.id ? draggedTask : t));
        draggedTask = null;
      }
    }
  
    function handleDragEnter(event) {
      event.target.classList.add('drag-over');
    }
  
    function handleDragLeave(event) {
      event.target.classList.remove('drag-over');
    }
  
    let totalInteractions = 2; // Total number of interactions
    let currentInteraction = 1; // Current interaction
    let answeredQuestions = 0; // Number of answered questions
    let progressWidth = (answeredQuestions / totalInteractions) * 100; // Initial progress bar width
  
    let timeRemaining = 60; // Total time in seconds
    let timerInterval;
    let showSubmitButton = writable(true);
    let showNextButton = writable(false);
  
    function startTimer() {
      timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
          timeRemaining--;
        } else {
          clearInterval(timerInterval);
          showSubmitButton.set(false);
          showNextButton.set(true);
        }
      }, 1000);
    }
  
    function checkAnswer() {
  let isCorrect = true;
  $tasks.forEach(task => {
    if (task.status !== task.correctStatus) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    message = 'Correct! Vous avez organisé les tâches correctement.';
    messageType = 'success';
    answeredQuestions++;
    progressWidth = (answeredQuestions / totalInteractions) * 100; // Update progress bar width

    // Directly hide the "Soumettre" button and show the "Next Interaction" button
    showSubmitButton.set(false);
    showNextButton.set(true);
  } else {
    message = 'Incorrect. Essayez encore.';
    messageType = 'error';
  }
}
  
    function goToNextInteraction() {
        goto('/Burndown');
    }
  
    onMount(startTimer);
  </script>
  
<style>
    .next-button {
    background: linear-gradient(45deg, #007BFF, #800080);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.next-button:hover {
    background: linear-gradient(45deg, #0056b3, #4b0082);
}

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;

    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .submit-button {
    background: linear-gradient(45deg, #007BFF, #800080);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .submit-button:hover {
    background: linear-gradient(45deg, #0056b3, #4b0082);
  }

  .message {
    font-size: 1.2em;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .message.success {
    color: #0f5132;
    background-color: #fcf8e3;
  }

  .message.error {
    color: #842029;
    background-color: #f8d7da;
  }

  .scrum-board {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .column {
    margin: 0 10px;
    width: calc(33.33% - 20px);
    height: 250px;  /* Decreased height */
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .column::-webkit-scrollbar {
    width: 10px;
  }

  .column::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .column::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #007BFF, #0056b3);
    border-radius: 10px;
  }

  .column::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .task {
    width: calc(100% - 3px);  /* Adjusted width */
    margin-bottom: 3px;  /* Decreased bottom margin */
    margin-right: 50px;
    min-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    padding: 1px;
  }

  .container {
    max-height: 60vh;  /* Decreased max-height */
    width: 60%;  /* Decreased width */
  }

  
  .timer-bar {
  width: 100%;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 10px;
}

.progress-container {
  display: flex;
  align-items: center;
}

.progress-bar {
  height: 100%;
  background-color: #007BFF;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.timer {
  margin-left: 10px;
}

.timer p {
  color: #007BFF;
  font-size: 16px;
}
.timer p {
  color: #007BFF;
  font-size: 16px;
  white-space: nowrap;
  font-weight: bold;
  margin-bottom: 7px;
}
</style>

<div class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 w-full h-full fixed top-0 left-0">
    <div class="container bg-white rounded-xl shadow-2xl p-8 m-4">
      <div class="progress-container">
        <div class="timer-bar">
          <div class="progress-bar" style="width: {progressWidth}%"></div>
        </div>
        <div class="timer">
          <p>Remaining Time: {timeRemaining}</p>
        </div>
      </div>
      <div class="scrum-board">
        {#each columns as column}
          <div class="column relative p-10 border border-gray-300 rounded-xl bg-gray-100" id={column} on:dragover={(event) => event.preventDefault()} on:drop={(event) => handleDrop(event, column)} on:dragenter={handleDragEnter} on:dragleave={handleDragLeave}>
            <h2 class="text-xl font-bold text-gray-800">{column}</h2>
            {#each $tasks.filter(task => task.status === column) as task (task.id)}
              <div class="task my-5 bg-blue-200 cursor-move border border-blue-500 rounded-md shadow-lg tooltip" draggable="true" on:dragstart={(event) => handleDragStart(event, task)}>
                <p class="text-blue-800 font-semibold">{task.name}</p>
                <span class="tooltiptext">{task.tooltip}</span>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    {#if $showSubmitButton}
      <button class="submit-button" on:click={checkAnswer}>Soumettre</button>
    {/if}
    {#if $showNextButton}
      <button class="next-button" on:click={goToNextInteraction}>Next Interaction</button>
    {/if}
    <p class="message {messageType}">{message}</p>
</div>