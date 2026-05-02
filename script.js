const specialtyData = {
  Cardiology: { accuracy: "94%", recall: "88%", lesson: "Predict heart failure risk" },
  "Emergency Medicine": { accuracy: "91%", recall: "86%", lesson: "Prioritize sepsis triage" },
  Endocrinology: { accuracy: "92%", recall: "84%", lesson: "Forecast diabetes complications" },
  Neurology: { accuracy: "89%", recall: "82%", lesson: "Detect stroke warning patterns" },
  Oncology: { accuracy: "90%", recall: "85%", lesson: "Classify treatment response" },
  Pediatrics: { accuracy: "93%", recall: "87%", lesson: "Screen pediatric deterioration" },
  Radiology: { accuracy: "96%", recall: "90%", lesson: "Explain image risk flags" },
  Surgery: { accuracy: "88%", recall: "81%", lesson: "Predict post-op complications" }
};

const steps = [
  "Define the clinical question and target outcome.",
  "Import a de-identified training dataset.",
  "Choose patient features and review missing values.",
  "Train the model and compare performance metrics.",
  "Explain the result before using it in a decision."
];

const specialtySelect = document.querySelector("#specialtySelect");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonSteps = document.querySelector("#lessonSteps");
const nextStep = document.querySelector("#nextStep");
const accuracyValue = document.querySelector("#accuracyValue");
const recallValue = document.querySelector("#recallValue");
let currentStep = 0;

function renderSteps() {
  lessonSteps.innerHTML = "";
  steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.textContent = step;
    if (index === currentStep) item.classList.add("current");
    lessonSteps.appendChild(item);
  });
}

function updateSpecialty() {
  const data = specialtyData[specialtySelect.value];
  lessonTitle.textContent = data.lesson;
  accuracyValue.textContent = data.accuracy;
  recallValue.textContent = data.recall;
}

specialtySelect.addEventListener("change", updateSpecialty);
nextStep.addEventListener("click", () => {
  currentStep = (currentStep + 1) % steps.length;
  renderSteps();
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
  });
});

const canvas = document.querySelector("#pulseCanvas");
const ctx = canvas.getContext("2d");
let frame = 0;

function drawVisual() {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#12323b");
  gradient.addColorStop(0.55, "#164349");
  gradient.addColorStop(1, "#0d2028");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(191, 224, 218, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 54) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#d95f4f";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = 0; x < width; x += 8) {
    const base = height * 0.54 + Math.sin((x + frame) * 0.025) * 20;
    const spike = x % 136 < 16 ? -78 + (x % 136) * 8 : 0;
    const y = base + spike;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const nodes = [
    [170, 170, "Vitals"],
    [350, 126, "Labs"],
    [530, 190, "History"],
    [300, 340, "Model"],
    [512, 354, "Decision"]
  ];

  ctx.strokeStyle = "rgba(158, 217, 207, 0.5)";
  ctx.lineWidth = 2;
  nodes.forEach(([x1, y1], index) => {
    nodes.slice(index + 1).forEach(([x2, y2]) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  });

  nodes.forEach(([x, y, label], index) => {
    const pulse = Math.sin(frame * 0.04 + index) * 5;
    ctx.fillStyle = index === 3 ? "#c9952d" : "#dbeee8";
    ctx.beginPath();
    ctx.arc(x, y, 24 + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#10242b";
    ctx.font = "700 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 5);
  });

  frame += 1;
  window.requestAnimationFrame(drawVisual);
}

renderSteps();
updateSpecialty();
drawVisual();
