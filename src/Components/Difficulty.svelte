<script>
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { quizQuestions } from './store.js';  // adjust the path according to your directory structure
    import { dndzone } from 'svelte-dnd-action';


    let isSpinning = writable(false); // Declare isSpinning as a reactive variable

    // Easy questions
    const easyQuestions = [
  {
    question: 'Quelle est la durée typique d\'un sprint dans Scrum?',
    options: ['1 semaine', '2 semaines', '1 mois', '6 mois'],
    correctAnswer: 1,
    hint: 'C\'est généralement plus court qu\'un mois',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qui est responsable de la gestion du backlog du produit dans Scrum?',
    options: ['Scrum Master', 'Product Owner', 'L\'équipe de développement', 'Les parties prenantes'],
    correctAnswer: 1,
    hint: 'Cette personne possède le produit',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel est le but d\'une réunion de stand-up quotidienne dans Scrum?',
    options: ['Pour discuter de tous les problèmes', 'Pour une pause-café', 'Pour synchroniser l\'équipe et planifier la journée', 'Pour résoudre tous les problèmes'],
    correctAnswer: 2,
    hint: 'C\'est une réunion de synchronisation',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle est la principale responsabilité du Scrum Master?',
    options: ['Gérer l\'équipe', 'Supprimer les obstacles pour l\'équipe', 'Assigner des tâches à l\'équipe', 'Évaluer la performance de l\'équipe'],
    correctAnswer: 1,
    hint: 'Ils aident l\'équipe à rester productive',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel artefact Scrum contient une liste de toutes les tâches à réaliser dans le sprint?',
    options: ['Backlog du produit', 'Backlog du sprint', 'Burndown chart', 'Increment'],
    correctAnswer: 1,
    hint: 'C\'est le plan pour le sprint',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quand une tâche du backlog du sprint peut-elle être modifiée?',
    options: ['N\'importe quand', 'Seulement avant le sprint', 'Seulement pendant le sprint', 'Seulement après le sprint'],
    correctAnswer: 1,
    hint: 'Les modifications sont bloquées une fois le sprint commencé',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle réunion marque la fin d\'un sprint?',
    options: ['Sprint Planning', 'Daily Standup', 'Sprint Review', 'Sprint Retrospective'],
    correctAnswer: 3,
    hint: 'C\'est une réunion pour réfléchir à l\'amélioration',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel est le but principal de la méthodologie Agile?',
    options: ['Livrer le produit le plus rapidement possible', 'Minimiser les coûts', 'Satisfaire le client grâce à une livraison continue de valeur', 'Maximiser le profit'],
    correctAnswer: 2,
    hint: 'Le client est au cœur de la méthodologie Agile',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel terme est utilisé dans Scrum pour une version potentiellement livrable du produit à la fin d\'un sprint?',
    options: ['Backlog', 'Sprint', 'Increment', 'Product Owner'],
    correctAnswer: 2,
    hint: 'C\'est le résultat d\'un sprint',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel est le rôle de l\'équipe de développement dans Scrum?',
    options: ['Gérer le projet', 'Livrer un "Increment" de produit potentiellement livrable à la fin de chaque sprint', 'Organiser les réunions', 'Gérer le budget'],
    correctAnswer: 1,
    hint: 'Ils sont responsables de la création du produit',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle est la taille recommandée pour une équipe Scrum?',
    options: ['1 à 3 personnes', '3 à 9 personnes', '9 à 15 personnes', 'Plus de 15 personnes'],
    correctAnswer: 1,
    hint: 'Une équipe Scrum est généralement petite',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },

  {
  question: 'Quelle est la durée recommandée pour une réunion de stand-up quotidienne dans Scrum?',
  options: ['10 minutes', '30 minutes', '1 heure', '2 heures'],
  correctAnswer: 0,
  hint: 'C\'est une réunion très brève',
  attempts: 0,
  timer: 60,
  selectedOption: null,
  isCorrect: false,
  isAnswered: false,
}

];

const mediumQuestions = [
  {
    question: 'Quel est le rôle du Scrum Master?',
    options: ['Chef de projet', 'Facilitateur', 'Développeur', 'Client'],
    correctAnswer: 1,
    hint: 'Il aide l\'équipe à comprendre et à appliquer Scrum',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle est la durée typique d\'un sprint dans Scrum?',
    options: ['1 semaine', '2 semaines', '1 mois', '3 mois'],
    correctAnswer: 1,
    hint: 'Il est généralement plus court que 30 jours',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'un backlog produit dans Scrum?',
    options: ['Une liste de bugs', 'Une liste de fonctionnalités', 'Un journal de modifications', 'Un plan de projet'],
    correctAnswer: 1,
    hint: 'Il contient tout ce qui pourrait être nécessaire pour le produit',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle est la principale responsabilité du Product Owner dans Scrum?',
    options: ['Développement du produit', 'Test du produit', 'Gestion du backlog produit', 'Vente du produit'],
    correctAnswer: 2,
    hint: 'Il doit s\'assurer que le travail est bien défini et priorisé',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'une réunion de revue de sprint dans Scrum?',
    options: ['Planification du prochain sprint', 'Discussion des problèmes du sprint actuel', 'Présentation du travail accompli pendant le sprint', 'Réunion quotidienne de stand-up'],
    correctAnswer: 2,
    hint: 'Elle a lieu à la fin de chaque sprint',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'un incrément dans Scrum?',
    options: ['Une nouvelle fonctionnalité', 'Un nouveau sprint', 'Un nouveau projet', 'La somme de tous les éléments du produit terminés pendant un sprint'],
    correctAnswer: 3,
    hint: 'Il représente une étape vers un objectif ou une version',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel est le principal avantage de l\'utilisation de la méthodologie Agile?',
    options: ['Rapidité de développement', 'Flexibilité et adaptabilité', 'Documentation complète', 'Pas de gestion nécessaire'],
    correctAnswer: 1,
    hint: 'Il permet des changements rapides et flexibles pendant le développement',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quel est le but d\'une réunion de rétrospective de sprint dans Scrum?',
    options: ['Planifier le prochain sprint', 'Discuter de ce qui a bien fonctionné et de ce qui pourrait être amélioré', 'Présenter le travail accompli pendant le sprint', 'Assigner des tâches pour le prochain sprint'],
    correctAnswer: 1,
    hint: 'Elle a lieu après la revue de sprint et avant le prochain sprint',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'un burndown chart dans Scrum?',
    options: ['Un graphique montrant le travail restant dans le temps', 'Un graphique montrant le nombre de bugs', 'Un graphique montrant le coût du projet', 'Un graphique montrant la satisfaction de l\'équipe'],
    correctAnswer: 0,
    hint: 'Il est souvent utilisé pour prédire quand tout le travail sera terminé',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'un spike dans Scrum?',
    options: ['Une augmentation soudaine du travail', 'Une tâche qui ne peut pas être estimée', 'Un problème majeur', 'Un objectif atteint'],
    correctAnswer: 1,
    hint: 'Il est généralement utilisé pour la recherche ou l\'exploration',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que le TDD (Test-Driven Development) dans Agile?',
    options: ['Développement basé sur les tests', 'Développement basé sur la technologie', 'Développement basé sur le temps', 'Développement basé sur les tâches'],
    correctAnswer: 0,
    hint: 'Il implique d\'écrire les tests avant le code',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que le pair programming dans Agile?',
    options: ['Deux personnes travaillent sur le même code', 'Deux personnes travaillent sur des codes différents', 'Une personne écrit le code, l\'autre écrit les tests', 'Une personne écrit le code, l\'autre fait la revue de code'],
    correctAnswer: 0,
    hint: 'Il est souvent utilisé pour améliorer la qualité du code et favoriser le partage des connaissances',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  }
];

const hardQuestions = [
  {
    question: 'Quelle est la différence entre un produit incrémental et un produit itératif?',
    options: ['Il n\'y a pas de différence', 'Un produit incrémental ajoute de nouvelles fonctionnalités à chaque itération, un produit itératif améliore les fonctionnalités existantes', 'Un produit incrémental améliore les fonctionnalités existantes, un produit itératif ajoute de nouvelles fonctionnalités', 'Un produit incrémental est terminé après chaque itération, un produit itératif n\'est jamais terminé'],
    correctAnswer: 1,
    hint: 'Pensez à l\'ajout de nouvelles fonctionnalités par rapport à l\'amélioration des fonctionnalités existantes',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle est la différence entre Scrum et Kanban?',
    options: ['Scrum est pour les petites équipes, Kanban pour les grandes', 'Scrum utilise un backlog, Kanban n\'en utilise pas', 'Scrum a des rôles définis, Kanban n\'en a pas', 'Scrum est une méthodologie, Kanban est un outil'],
    correctAnswer: 2,
    hint: 'Pensez aux rôles dans chaque cadre',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que le refactoring dans le développement Agile?',
    options: ['Ajouter de nouvelles fonctionnalités', 'Corriger des bugs', 'Améliorer la structure du code sans changer son comportement', 'Changer le comportement du code sans changer sa structure'],
    correctAnswer: 2,
    hint: 'Il s\'agit de rendre le code plus propre et plus efficace',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'une histoire utilisateur dans Agile?',
    options: ['Une tâche à accomplir', 'Une fonctionnalité du point de vue de l\'utilisateur', 'Une description détaillée d\'une fonctionnalité', 'Un bug à corriger'],
    correctAnswer: 1,
    hint: 'Elle est écrite du point de vue de l\'utilisateur final',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'un "DoD" (Definition of Done) dans Scrum?',
    options: ['Une liste de tâches à accomplir', 'Une description d\'une fonctionnalité terminée', 'Un accord sur ce qui constitue un travail terminé pour chaque élément du backlog produit', 'Une liste de critères pour accepter une histoire utilisateur'],
    correctAnswer: 2,
    hint: 'Il s\'agit d\'un accord sur ce qui constitue un travail terminé',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Quelle est la différence entre une équipe Agile et une équipe traditionnelle?',
    options: ['Une équipe Agile est plus grande', 'Une équipe Agile est auto-organisée, une équipe traditionnelle est dirigée par un chef de projet', 'Une équipe Agile utilise Scrum, une équipe traditionnelle utilise Kanban', 'Il n\'y a pas de différence'],
    correctAnswer: 1,
    hint: 'Pensez à la façon dont les équipes sont organisées et gérées',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que l\'intégration continue dans Agile?',
    options: ['Fusionner le travail de tous les développeurs plusieurs fois par jour', 'Fusionner le travail de tous les développeurs à la fin de chaque sprint', 'Faire des tests continus', 'Déployer le produit en continu'],
    correctAnswer: 0,
    hint: 'Il s\'agit de fusionner le travail régulièrement pour éviter les conflits de fusion',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que le développement piloté par le comportement (Behavior-Driven Development) dans Agile?',
    options: ['Développement basé sur les tests', 'Développement basé sur les comportements des utilisateurs', 'Développement basé sur les commentaires des utilisateurs', 'Développement basé sur les comportements du système'],
    correctAnswer: 3,
    hint: 'Il s\'agit de développer en fonction de comment le système doit se comporter',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que le Lean Software Development?',
    options: ['Une version plus rapide d\'Agile', 'Une version plus simple d\'Agile', 'Une version plus complexe d\'Agile', 'Une version d\'Agile basée sur les principes du Lean Manufacturing'],
    correctAnswer: 3,
    hint: 'Il s\'agit d\'une adaptation des principes du Lean Manufacturing au développement de logiciels',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que le "timeboxing" dans Scrum?',
    options: ['Travailler aussi vite que possible', 'Travailler en continu sans pauses', 'Allouer un temps fixe à une activité', 'Travailler sur plusieurs tâches en même temps'],
    correctAnswer: 2,
    hint: 'Il s\'agit de limiter le temps consacré à une activité',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce que l\'amélioration continue dans Agile?',
    options: ['Ajouter de nouvelles fonctionnalités en continu', 'Corriger des bugs en continu', 'Faire des tests en continu', 'Rechercher constamment des moyens d\'améliorer les processus et les performances'],
    correctAnswer: 3,
    hint: 'Il s\'agit de toujours chercher à s\'améliorer',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  },
  {
    question: 'Qu\'est-ce qu\'un "Daily Stand-Up" dans Scrum?',
    options: ['Une réunion de planification du sprint', 'Une réunion de revue de sprint', 'Une réunion de rétrospective de sprint', 'Une réunion quotidienne où chaque membre de l\'équipe partage ses progrès et ses obstacles'],
    correctAnswer: 3,
    hint: 'Il s\'agit d\'une réunion quotidienne rapide',
    attempts: 0,
    timer: 60,
    selectedOption: null,
    isCorrect: false,
    isAnswered: false,
  }
];



const handleSelectDifficulty = async (level) => {
        isSpinning.set(true); // Start spinning

        if (level === 'interactive') {
            // Wait for 1 second before navigating to the Interaction route
            setTimeout(() => {
                goto('/Interaction');
            }, 1000);
        } else {
            let selectedQuestions;
            switch(level) {
                case 'easy':
                    selectedQuestions = easyQuestions;
                    break;
                case 'medium':
                    selectedQuestions = mediumQuestions;
                    break;
                case 'hard':
                    selectedQuestions = hardQuestions;
                    break;
            }

            // Store the selected questions in session storage
            sessionStorage.setItem('selectedQuestions', JSON.stringify(selectedQuestions));

            quizQuestions.set(selectedQuestions);

            await new Promise(resolve => setTimeout(resolve, 1000));
            goto('/Quizzes');
        }
    };


</script>

<style>
    .gradient-bg {
        background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }

    .animated-button {
        transition: all 0.3s ease-in-out;
    }

    .animated-button:hover {
        transform: scale(1.1);
    }

    .spin {
        animation: spin 1s linear;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .custom-font {
        font-family: 'Courier New', Courier, monospace;
    }
</style>

<div class="flex flex-col justify-center items-center min-h-screen gradient-bg w-full h-full fixed top-0 left-0">
    <div class="bg-white rounded-xl shadow-2xl p-8 m-4 w-full sm:w-3/4 lg:w-1/2 flex flex-col items-center">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 custom-font">Select Difficulty</h1>
        <div class="w-full flex justify-between">
    <button on:click={() => handleSelectDifficulty('easy')} class="btn btn-primary bg-green-500 animated-button {$isSpinning ? 'spin' : ''}">Easy</button>
    <button on:click={() => handleSelectDifficulty('medium')} class="btn btn-primary bg-yellow-500 animated-button {$isSpinning ? 'spin' : ''}">Medium</button>
    <button on:click={() => handleSelectDifficulty('hard')} class="btn btn-primary bg-red-500 animated-button {$isSpinning ? 'spin' : ''}">Hard</button>
    <button on:click={() => handleSelectDifficulty('interactive')} class="btn btn-primary bg-blue-500 animated-button {$isSpinning ? 'spin' : ''}">Interactive Game</button>
</div>
    </div>
</div>



