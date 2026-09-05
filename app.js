const workouts = [
  {
    letter: "A",
    title: "Peito + Tríceps",
    focus: "Empurrar com boa execução, controle e intensidade sem sacrificar a técnica.",
    blocks: [
      {
        title: "Peito",
        exercises: [
          ["Supino reto", "4 × 8–10", "Barra ou halteres. Controle a descida e mantenha a execução estável."],
          ["Supino inclinado", "4 × 10", "Com halteres."],
          ["Crucifixo reto ou crossover", "3 × 12", "Escolha a variação mais confortável para o ombro."]
        ]
      },
      {
        title: "Tríceps",
        exercises: [
          ["Tríceps pulley com corda", "4 × 12", "Movimento controlado, evitando embalo."],
          ["Tríceps testa", "3 × 10", "Barra W ou halteres."]
        ]
      }
    ]
  },
  {
    letter: "B",
    title: "Costas + Bíceps",
    focus: "Puxar com controle, postura corporal e sem transformar a remada em exercício de ego.",
    blocks: [
      {
        title: "Costas",
        exercises: [
          ["Puxada alta na polia", "4 × 10", "Conduza o movimento pelas costas, sem puxar apenas com os braços."],
          ["Remada curvada", "4 × 10", "Carga leve e controlada. Se reproduzir dor lombar, interrompa o exercício."],
          ["Remada baixa com triângulo", "3 × 12", "Tronco firme e movimento controlado."]
        ]
      },
      {
        title: "Bíceps",
        exercises: [
          ["Rosca direta", "4 × 10", "Barra."],
          ["Rosca alternada", "3 × 11 por braço", "Halteres, sem balanço do tronco."]
        ]
      }
    ]
  },
  {
    letter: "C",
    title: "Cardio + Abdômen",
    focus: "Condicionamento, gasto energético e trabalho de abdômen sem impacto excessivo.",
    blocks: [
      {
        title: "Cardio",
        exercises: [
          ["Cardio moderado", "Até 45 min", "Esteira inclinada, bicicleta ou elíptico. Ajuste conforme o tempo disponível."]
        ]
      },
      {
        title: "Abdômen",
        exercises: [
          ["Abdominal supra", "3 × 15–20", "Controle o movimento, sem puxar o pescoço."],
          ["Prancha isométrica", "3 × 45–60 s", "Mantenha tronco e quadril alinhados."]
        ]
      }
    ]
  },
  {
    letter: "D",
    title: "Pernas + Ombros",
    focus: "Musculação com técnica conservadora enquanto você observa como a lombar responde.",
    blocks: [
      {
        title: "Pernas",
        exercises: [
          ["Agachamento livre ou leg press 45°", "4 × 10", "No agachamento, comece apenas com a barra e execução controlada. Interrompa se houver dor lombar."],
          ["Cadeira extensora", "3 × 12", "Pausa de 2 segundos no topo."],
          ["Mesa flexora ou stiff", "4 × 10–12", "Se optar pelo stiff, teste com barra e carga mínima, descendo apenas até onde mantém controle. Pare se reproduzir dor lombar."],
          ["Gêmeos sentado", "4 × 15", "Amplitude confortável e repetição controlada."]
        ]
      },
      {
        title: "Ombros",
        exercises: [
          ["Desenvolvimento com halteres", "4 × 10", "Sem compensar arqueando excessivamente a lombar."],
          ["Elevação lateral", "4 × 12–15", "Controle e pouca ajuda do tronco."]
        ]
      }
    ]
  },
  {
    letter: "E",
    title: "Mobilidade + Core + Cardio opcional",
    focus: "Prioridade para mobilidade de quadril e estabilidade do tronco. Cardio entra apenas se houver tempo.",
    blocks: [
      {
        title: "Mobilidade de quadril • ~15 min",
        exercises: [
          ["90/90 de quadril", "2–3 × 6–8 transições", "Movimento lento, sem forçar amplitude."],
          ["Alongamento do flexor do quadril em meio-ajoelhado", "2 × 30–45 s por lado", "Contraia levemente o glúteo da perna de trás e evite arquear a lombar."],
          ["Rock back de adutores", "2 × 8–10 por lado", "Leve o quadril para trás mantendo o tronco controlado."],
          ["Mobilidade ativa de quadril em apoio", "2 × 6–8 por lado", "Eleve o joelho e faça rotação controlada, sem compensar com a lombar."]
        ]
      },
      {
        title: "Core / estabilidade • ~15 min",
        exercises: [
          ["Bird dog", "3 × 6–8 por lado", "Segure 2–3 segundos, mantendo a pelve estável."],
          ["Dead bug", "3 × 6–10 por lado", "Mantenha a lombar confortável e controle a respiração."],
          ["Prancha lateral", "3 × 20–40 s por lado", "Comece pelo tempo que consegue sustentar com boa posição."]
        ]
      },
      {
        title: "Cardio leve • opcional",
        exercises: [
          ["Caminhada leve", "0–20 min", "Faça somente se houver tempo. Mobilidade e core vêm primeiro."]
        ]
      }
    ]
  }
];

const STORAGE_KEY = "treino-ae-current-index";
let currentIndex = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
if (!Number.isInteger(currentIndex) || currentIndex < 0 || currentIndex >= workouts.length) {
  currentIndex = 0;
}

const nextWorkoutLetter = document.getElementById("nextWorkoutLetter");
const nextWorkoutName = document.getElementById("nextWorkoutName");
const sequence = document.getElementById("sequence");
const workoutLetter = document.getElementById("workoutLetter");
const workoutTitle = document.getElementById("workoutTitle");
const workoutFocus = document.getElementById("workoutFocus");
const workoutContent = document.getElementById("workoutContent");
const startWorkoutBtn = document.getElementById("startWorkoutBtn");
const completeWorkoutBtn = document.getElementById("completeWorkoutBtn");
const resetBtn = document.getElementById("resetBtn");
const workoutCard = document.getElementById("workoutCard");

function renderSequence() {
  sequence.innerHTML = "";
  workouts.forEach((workout, index) => {
    const item = document.createElement("div");
    item.className = "sequence-item";
    if (index === currentIndex) item.classList.add("current");
    item.innerHTML = `<strong>${workout.letter}</strong><small>${workout.title}</small>`;
    sequence.appendChild(item);
  });
}

function renderWorkout() {
  const workout = workouts[currentIndex];
  nextWorkoutLetter.textContent = workout.letter;
  nextWorkoutName.textContent = workout.title;
  workoutLetter.textContent = workout.letter;
  workoutTitle.textContent = workout.title;
  workoutFocus.textContent = workout.focus;

  workoutContent.innerHTML = workout.blocks.map(block => `
    <div>
      <div class="block-title">${block.title}</div>
      <ul class="exercise-list">
        ${block.exercises.map(([name, prescription, note]) => `
          <li class="exercise-item">
            <div>
              <div class="exercise-name">${name}</div>
              <div class="exercise-note">${note}</div>
            </div>
            <div class="exercise-prescription">${prescription}</div>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");

  renderSequence();
}

startWorkoutBtn.addEventListener("click", () => {
  workoutCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

completeWorkoutBtn.addEventListener("click", () => {
  const finishedWorkout = workouts[currentIndex];
  currentIndex = (currentIndex + 1) % workouts.length;
  localStorage.setItem(STORAGE_KEY, String(currentIndex));
  renderWorkout();
  completeWorkoutBtn.textContent = `Treino ${finishedWorkout.letter} concluído ✓`;
  setTimeout(() => {
    completeWorkoutBtn.textContent = "Marcar como concluído";
  }, 1800);
});

resetBtn.addEventListener("click", () => {
  const confirmed = confirm("Deseja reiniciar a sequência e voltar para o treino A?");
  if (!confirmed) return;
  currentIndex = 0;
  localStorage.setItem(STORAGE_KEY, "0");
  renderWorkout();
});

renderWorkout();
