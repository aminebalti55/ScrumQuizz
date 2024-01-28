<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import confetti from 'canvas-confetti';
    import { writable } from 'svelte/store';
    import { quizQuestions } from './store';  // adjust the path according to your directory structure

   

    let currentQuestion = 0;
    let timerInterval;
    let progressWidth = 0;
    let successMessage = '';
    let errorMessage = '';
    let score = 0;
    let quizFinished = false;

    const startTimer = () => {
    timerInterval = setInterval(() => {
        if (quizzes[currentQuestion].timer > 0) {
            quizzes[currentQuestion].timer--;
        } else {
            clearInterval(timerInterval);
            handleAnswer(-1);
        }
    }, 1000);
};

  

    let quizzes = [];

quizQuestions.subscribe(value => {
    quizzes = value;
    if (quizzes.length > 0) {
        startTimer();
    }
});

    const handleAnswer = () => {
      clearInterval(timerInterval);
      quizzes[currentQuestion].attempts++;
      if (quizzes[currentQuestion].selectedOption === quizzes[currentQuestion].correctAnswer) {
        quizzes[currentQuestion].isCorrect = true;
        quizzes[currentQuestion].isAnswered = true;
        successMessage = 'Correct! Success message here.';
        errorMessage = '';
        score++;
        progressWidth = ((currentQuestion + 1) / quizzes.length) * 100;
      } else {
        if (quizzes[currentQuestion].attempts === 1) {
          successMessage = '';
          errorMessage = 'Incorrect! Hint: ' + quizzes[currentQuestion].hint;
        } else {
          quizzes[currentQuestion].isAnswered = true;
          successMessage = '';
          errorMessage = 'Incorrect! Second attempt. Error message here.';
          progressWidth = ((currentQuestion + 1) / quizzes.length) * 100;
        }
      }
  
      if (currentQuestion === quizzes.length - 1) {
        successMessage = '';
        errorMessage = '';
        clearInterval(timerInterval);
        quizFinished = true;
        score = calculateScore();
  
        const allCorrect = quizzes.every((quiz) => quiz.isCorrect);
        if (allCorrect) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    };
  
    const calculateScore = () => {
      let correctCount = 0;
      quizzes.forEach((quiz) => {
        if (quiz.isCorrect) {
          correctCount++;
        }
      });
  
      return correctCount;
    };
  
    const handleNextQuestion = () => {
      currentQuestion++;
      if (currentQuestion >= quizzes.length) {
        successMessage = '';
        errorMessage = '';
        clearInterval(timerInterval);
        quizFinished = true;
        score = calculateScore();
      } else {
        quizzes[currentQuestion].attempts = 0;
        quizzes[currentQuestion].selectedOption = null;
        quizzes[currentQuestion].isCorrect = false;
        quizzes[currentQuestion].isAnswered = false;
        successMessage = '';
        errorMessage = '';
        startTimer();
      }
  
      progressWidth = ((currentQuestion + 1) / quizzes.length) * 100;
    };
  
    const redoQuiz = () => {
      currentQuestion = 0;
      timerInterval = null;
      progressWidth = 0;
      successMessage = '';
      errorMessage = '';
      score = 0;
      quizFinished = false;
      quizzes.forEach((quiz) => {
        quiz.attempts = 0;
        quiz.timer = 60;
        quiz.selectedOption = null;
        quiz.isCorrect = false;
        quiz.isAnswered = false;
      });
      startTimer();
    };
  
    onMount(() => {
    const storedQuestions = sessionStorage.getItem('selectedQuestions');

    if (storedQuestions) {
        quizQuestions.set(JSON.parse(storedQuestions));
    } else {
        goto('/Difficulty');
    }
});
</script>

<div class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 w-full h-full fixed top-0 left-0">
    <div class="bg-white rounded-xl shadow-2xl p-8 m-4 w-full sm:w-3/4 lg:w-1/2">
      <div class="mb-4">
        <div class="h-3 rounded-xl bg-gray-200">
          <div class="h-full text-xs text-center text-white bg-blue-500 rounded-xl" style="width: {progressWidth}%"></div>
        </div>
        <div class="flex justify-between mt-1 text-sm text-gray-700">
            <span>Time Remaining: {quizzes[currentQuestion] ? quizzes[currentQuestion].timer : 0}s</span>
            <span>Question {currentQuestion + 1}/{quizzes.length}</span>
        </div>
      </div>
      {#if quizzes[currentQuestion]}
        <div class="mb-4">
          <h2 class="text-xl font-bold text-gray-800">{quizzes[currentQuestion].question}</h2>
          <div class="mt-2">
            {#each quizzes[currentQuestion].options as option, index}
              <div class="flex items-center space-x-2">
                <input type="radio" bind:group={quizzes[currentQuestion].selectedOption} value={index} disabled={quizzes[currentQuestion].isAnswered} class="form-radio text-blue-500 h-4 w-4" />
                <label class="text-base text-gray-700">{option}</label>
              </div>
            {/each}
          </div>
          {#if !quizFinished && (!quizzes[currentQuestion].isCorrect && quizzes[currentQuestion].attempts < 2) && quizzes[currentQuestion].timer > 0}
          <button on:click={() => handleAnswer(quizzes[currentQuestion].selectedOption)} disabled={!quizzes[currentQuestion] || quizzes[currentQuestion].isAnswered} class="mt-4 btn btn-primary">Submit</button>
      {/if}
        {#if successMessage}
            <div class="mt-4 p-2 bg-green-200 text-green-700 border-l-4 border-green-500 rounded">
            {successMessage}
            </div>
        {/if}
        {#if errorMessage}
            <div class="mt-4 p-2 bg-red-200 text-red-700 border-l-4 border-red-500 rounded">
            {errorMessage}
            </div>
        {/if}
        </div>
      {/if}
      {#if quizFinished}
        <div class="text-center">
          <h3 class="text-lg font-bold">Quiz Finished</h3>
          <p class="text-base">Your score: {score}</p>
          <button on:click={redoQuiz} class="mt-4 btn btn-primary">Redo Quiz</button>
        </div>
      {/if}
      {#if quizzes[currentQuestion] && (quizzes[currentQuestion].isAnswered || quizzes[currentQuestion].timer <= 0) && !quizFinished}
      <button on:click={handleNextQuestion} class="mt-4 btn btn-primary">Next Question</button>
  {/if}
    </div>
</div>
