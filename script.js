const specialtyData = {
  "GenAI Foundations": { level: "Foundation", risk: "Human oversight", lesson: "Understand how GenAI and LLMs work in healthcare education." },
  "Prompting in Healthcare": { level: "Applied", risk: "Privacy", lesson: "Write safer prompts and choose appropriate healthcare use cases." },
  "Model Evaluation": { level: "Applied", risk: "Reliability", lesson: "Evaluate and compare GenAI outputs before trusting them." },
  "Explainability and Bias": { level: "Advanced", risk: "Fairness", lesson: "Recognise bias, explainability limits, and communication risks." }
};

const steps = [
  "Module 1: Learn how GenAI and LLMs generate text, summaries, explanations, and recommendations.",
  "Module 2: Practice safe prompting for healthcare education without exposing patient data.",
  "Module 3: Compare model outputs for factuality, usefulness, hallucination, and safety.",
  "Module 4: Review explainability, algorithmic bias, fairness, transparency, and governance.",
  "Final activity: apply the Health-AI checklist to a healthcare teaching or clinical-support scenario."
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
  accuracyValue.textContent = data.level;
  recallValue.textContent = data.risk;
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
    [170, 170, "Data"],
    [350, 126, "Model"],
    [530, 190, "Risk"],
    [300, 340, "Doctor"],
    [512, 354, "Ethics"]
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


const defaultResources = [
  {
    title: "GenAI & LLMs: how they work",
    category: "1. Foundations",
    module: "GenAI and LLMs",
    level: "Foundation",
    type: "Learning module",
    focus: "Model logic, tokens, training, outputs, limitations",
    appSteps: "Module 1",
    ethics: "Human oversight, privacy, transparency",
    description: "Learn what generative AI and large language models are, how they generate outputs, why they can be useful in healthcare education, and why they can also be wrong or unsafe.",
    objectives: ["Explain AI, GenAI, LLMs, tokens, prompts, model training, and outputs", "Identify common healthcare uses: education, summarisation, documentation support, research support, and patient communication drafts", "Recognise limits such as hallucination, outdated knowledge, missing context, and overconfidence"],
    activities: ["Map one clinical education task to a GenAI workflow", "Compare a safe and unsafe model response", "Discuss where human review is required"],
    assessment: "Short reflection: explain to a colleague why an LLM answer is not clinical evidence.",
    file: "health-ai-genai-foundations.pdf",
    url: "#"
  },
  {
    title: "GenAI: prompting and use in healthcare context",
    category: "2. Prompting and healthcare use",
    module: "GenAI and LLMs",
    level: "Applied",
    type: "Learning module",
    focus: "Prompt structure, clinical context, boundaries, safe tasks",
    appSteps: "Module 2",
    ethics: "Patient confidentiality, consent, professional responsibility",
    description: "Practice writing clear prompts for healthcare education while avoiding patient-identifiable data, unsafe instructions, and outputs that replace professional judgement.",
    objectives: ["Write prompts with role, task, context, constraints, and output format", "Separate low-risk educational uses from high-risk clinical decision uses", "Apply privacy-safe prompting rules when handling patient-related scenarios"],
    activities: ["Rewrite a vague prompt into a structured healthcare prompt", "Classify example use cases by risk", "Create a prompt checklist for students or clinicians"],
    assessment: "Prompt review: improve a weak prompt and explain what risk was reduced.",
    file: "health-ai-genai-prompting-healthcare.pdf",
    url: "#"
  },
  {
    title: "GenAI: evaluating and comparing models",
    category: "3. Evaluation and comparison",
    module: "GenAI and LLMs",
    level: "Applied",
    type: "Learning module",
    focus: "Accuracy, hallucination, usefulness, safety, model comparison",
    appSteps: "Module 3",
    ethics: "Reliability, accountability, non-maleficence",
    description: "Learn how to compare GenAI tools and outputs using accuracy checks, source review, consistency checks, safety criteria, and human evaluation rather than trusting fluent text.",
    objectives: ["Evaluate outputs for factuality, relevance, completeness, uncertainty, and clinical safety", "Compare two model responses using a structured rubric", "Recognise hallucination, citation failure, hidden bias, and unsupported clinical claims"],
    activities: ["Score two AI answers with a rubric", "Find missing safety warnings in a generated response", "Build a model comparison table for a teaching scenario"],
    assessment: "Mini-audit: document why one AI response is safer than another.",
    file: "health-ai-genai-evaluation.pdf",
    url: "#"
  },
  {
    title: "GenAI: explainability and algorithmic bias",
    category: "4. Explainability and bias",
    module: "GenAI and LLMs",
    level: "Advanced",
    type: "Learning module",
    focus: "Bias, fairness, explainability, communication, governance",
    appSteps: "Module 4",
    ethics: "Fairness, transparency, equity, patient communication",
    description: "Study how bias can appear in GenAI systems, why LLM explanations can sound convincing without being reliable, and how health professionals should communicate uncertainty and limitations.",
    objectives: ["Identify sources of bias in data, prompts, model design, deployment, and user interpretation", "Explain why GenAI explanations need verification", "Apply fairness and transparency checks before using AI outputs in education or practice"],
    activities: ["Review a biased AI-generated patient explanation", "Create a fairness checklist for a GenAI healthcare use case", "Discuss how to explain AI limitations to patients and families"],
    assessment: "Case discussion: identify bias risks and propose mitigation steps.",
    file: "health-ai-genai-bias-explainability.pdf",
    url: "#"
  }
];

const resourceForm = document.querySelector("#resourceForm");
const resourceList = document.querySelector("#resourceList");
const repositoryFilter = document.querySelector("#repositoryFilter");
const resourceCount = document.querySelector("#resourceCount");
const resourceFile = document.querySelector("#resourceFile");
const selectedFileName = document.querySelector("#selectedFileName");
const modulePageTabs = document.querySelector("#modulePageTabs");
const modulePagePanel = document.querySelector("#modulePagePanel");
const resourceKey = "healthAiGenAiLearningModulesV1";

function loadResources() {
  const saved = window.localStorage.getItem(resourceKey);
  if (!saved) return defaultResources;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultResources;
  }
}

let resources = loadResources();

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[character]);
}

function saveResources() {
  window.localStorage.setItem(resourceKey, JSON.stringify(resources));
}

function moduleSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("#");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function hasAttachedFile(resource) {
  return Boolean(resource.url && resource.url !== "#");
}

function openResource(resource) {
  if (!hasAttachedFile(resource)) {
    window.alert("This sample material does not have an attached file yet. Upload your own file to open it here.");
    return;
  }

  const openWindow = window.open(resource.url, "_blank", "noopener");
  if (!openWindow) {
    const link = document.createElement("a");
    link.href = resource.url;
    link.download = resource.file || "health-ai-material";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function getTeachingCategory(resource) {
  if (resource.category) return resource.category;
  const title = (resource.title || "").toLowerCase();
  if (title.includes("prompt")) return "2. Prompting and healthcare use";
  if (title.includes("evaluat") || title.includes("compar")) return "3. Evaluation and comparison";
  if (title.includes("explain") || title.includes("bias") || title.includes("fair")) return "4. Explainability and bias";
  if (title.includes("data") || title.includes("clean")) return "2. Data preparation";
  return "1. Foundations";
}

function getModuleSummary(moduleName, moduleResources) {
  const institutions = [...new Set(moduleResources.map((resource) => resource.institution).filter(Boolean))].join(", ");
  const levels = [...new Set(moduleResources.map((resource) => resource.level).filter(Boolean))].join(", ");
  const modes = [...new Set(moduleResources.map((resource) => resource.type).filter(Boolean))].join(" / ");
  return [institutions && "Institutions: " + institutions, levels && "Levels: " + levels, modes && "Delivery: " + modes].filter(Boolean).join(" | ");
}

function createResourceCard(resource) {
  const originalIndex = resources.indexOf(resource);
  const card = document.createElement("article");
  const header = document.createElement("header");
  const content = document.createElement("div");
  const title = document.createElement("h3");
  const meta = document.createElement("div");
  const module = document.createElement("span");
  const type = document.createElement("span");
  const fileButton = document.createElement("button");
  const description = document.createElement("p");
  const actions = document.createElement("div");
  const openButton = document.createElement("button");
  const removeButton = document.createElement("button");

  card.className = "resource-card";
  meta.className = "resource-meta";
  fileButton.className = "file-pill";
  actions.className = "resource-actions";

  title.textContent = resource.title;
  module.textContent = resource.module;
  type.textContent = resource.type;
  fileButton.type = "button";
  fileButton.dataset.openResourceIndex = String(originalIndex);
  fileButton.textContent = resource.file || "No file attached";
  fileButton.disabled = !hasAttachedFile(resource);
  description.textContent = resource.description || "No teaching note added.";
  openButton.type = "button";
  openButton.dataset.openResourceIndex = String(originalIndex);
  openButton.textContent = hasAttachedFile(resource) ? "Open attachment" : "No attachment";
  openButton.disabled = !hasAttachedFile(resource);
  removeButton.type = "button";
  removeButton.dataset.resourceIndex = String(originalIndex);
  removeButton.textContent = "Remove";

  meta.append(module, type);
  [resource.level, resource.institution, resource.deadline, resource.appSteps].filter(Boolean).forEach((value) => {
    const item = document.createElement("span");
    item.textContent = value;
    meta.appendChild(item);
  });
  content.append(title, meta);
  header.append(content, fileButton);
  actions.append(openButton, removeButton);
  if (resource.focus || resource.ethics) {
    const details = document.createElement("p");
    details.className = "resource-details";
    details.textContent = [resource.focus && "Focus: " + resource.focus, resource.ethics && "Ethics: " + resource.ethics].filter(Boolean).join(" | ");
    card.append(header, description, details);
  } else {
    card.append(header, description);
  }

  const learningBody = document.createElement("div");
  learningBody.className = "learning-module-body is-hidden";
  [
    ["Learning outcomes", resource.objectives],
    ["Teaching activities", resource.activities],
    ["Assessment", resource.assessment ? [resource.assessment] : []]
  ].forEach(([heading, items]) => {
    if (!items || !items.length) return;
    const group = document.createElement("div");
    const groupTitle = document.createElement("strong");
    const list = document.createElement("ul");
    groupTitle.textContent = heading;
    items.forEach((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      list.appendChild(item);
    });
    group.append(groupTitle, list);
    learningBody.appendChild(group);
  });
  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.dataset.toggleModuleIndex = String(originalIndex);
  toggleButton.textContent = "Open learning module";
  actions.prepend(toggleButton);
  card.append(learningBody, actions);
  return card;
}

function createModuleList(title, items) {
  if (!items || !items.length) return "";
  return `
    <div class="module-page-list">
      <strong>${escapeHtml(title)}</strong>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function renderModulePage(resource) {
  if (!modulePagePanel || !resource) return;
  const relatedMaterials = resources.filter((item) => item.category === resource.category && item !== resource);
  modulePagePanel.innerHTML = `
    <div class="module-page-hero">
      <span>${escapeHtml(resource.appSteps || "Learning module")}</span>
      <h3>${escapeHtml(resource.title)}</h3>
      <p>${escapeHtml(resource.description || "")}</p>
    </div>
    <div class="module-page-meta">
      <span>${escapeHtml(resource.level || "Module")}</span>
      <span>${escapeHtml(resource.focus || "Learning focus")}</span>
      <span>${escapeHtml(resource.ethics || "Ethics focus")}</span>
    </div>
    <div class="module-page-grid">
      ${createModuleList("Learning outcomes", resource.objectives)}
      ${createModuleList("Teaching activities", resource.activities)}
      ${createModuleList("Assessment", resource.assessment ? [resource.assessment] : [])}
      ${createModuleList("Related uploaded materials", relatedMaterials.map((item) => item.title))}
    </div>
  `;
}

function renderModulePages() {
  if (!modulePageTabs || !modulePagePanel) return;
  const modules = defaultResources;
  modulePageTabs.innerHTML = "";
  modules.forEach((resource, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.modulePage = moduleSlug(resource.title);
    button.textContent = resource.title;
    button.classList.toggle("active", index === 0);
    button.addEventListener("click", () => {
      modulePageTabs.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderModulePage(resource);
    });
    modulePageTabs.appendChild(button);
  });
  renderModulePage(modules[0]);
}

function renderResources() {
  const filter = repositoryFilter.value;
  const visibleResources = filter.startsWith("All") ? resources : resources.filter((item) => item.module === filter || item.category === filter);
  resourceList.innerHTML = "";
  resourceCount.textContent = resources.length;
  renderDatabaseStats();

  if (!visibleResources.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No teaching modules in this category yet.";
    resourceList.appendChild(empty);
    return;
  }

  const modules = [...new Set(visibleResources.map((resource) => resource.module))];
  modules.forEach((moduleName) => {
    const moduleSection = document.createElement("section");
    const moduleHeader = document.createElement("div");
    const moduleHeading = document.createElement("div");
    const moduleTitle = document.createElement("h3");
    const moduleSummary = document.createElement("p");
    const moduleCount = document.createElement("span");
    const moduleItems = document.createElement("div");
    const moduleResources = visibleResources.filter((resource) => resource.module === moduleName);
    const categories = [...new Set(moduleResources.map(getTeachingCategory))].sort();

    moduleSection.className = "resource-module teaching-module";
    moduleHeader.className = "resource-module-header";
    moduleHeading.className = "module-heading";
    moduleItems.className = "resource-module-items";
    moduleTitle.textContent = moduleName;
    moduleSummary.textContent = getModuleSummary(moduleName, moduleResources);
    moduleCount.textContent = moduleResources.length + (moduleResources.length === 1 ? " session" : " sessions");

    moduleHeading.append(moduleTitle, moduleSummary);
    moduleHeader.append(moduleHeading, moduleCount);
    categories.forEach((categoryName) => {
      const categoryBlock = document.createElement("section");
      const categoryHeader = document.createElement("div");
      const categoryTitle = document.createElement("h4");
      const categoryCount = document.createElement("span");
      const categoryItems = document.createElement("div");
      const categoryResources = moduleResources.filter((resource) => getTeachingCategory(resource) === categoryName);

      categoryBlock.className = "teaching-category";
      categoryHeader.className = "teaching-category-header";
      categoryItems.className = "teaching-category-items";
      categoryTitle.textContent = categoryName.replace(/^\d+\.\s*/, "");
      categoryCount.textContent = categoryResources.length + (categoryResources.length === 1 ? " session" : " sessions");

      categoryHeader.append(categoryTitle, categoryCount);
      categoryResources.forEach((resource) => categoryItems.appendChild(createResourceCard(resource)));
      categoryBlock.append(categoryHeader, categoryItems);
      moduleItems.appendChild(categoryBlock);
    });
    moduleSection.append(moduleHeader, moduleItems);
    resourceList.appendChild(moduleSection);
  });
}

resourceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fileInput = document.querySelector("#resourceFile");
  const file = fileInput.files[0];
  const submitButton = resourceForm.querySelector("button[type='submit']");
  submitButton.textContent = "Uploading...";
  submitButton.disabled = true;

  try {
    const resource = {
      title: document.querySelector("#resourceTitle").value.trim(),
      module: "GenAI and LLMs",
      type: document.querySelector("#resourceType").value,
      description: document.querySelector("#resourceDescription").value.trim(),
      category: document.querySelector("#resourceModule").value,
      file: file?.name || "Uploaded material",
      url: await readFileAsDataUrl(file),
      uploadedAt: new Date().toLocaleString()
    };
    resources.unshift(resource);
    saveResources();
    renderResources();
    resourceForm.reset();
    selectedFileName.textContent = "No file selected";
  } catch {
    selectedFileName.textContent = "Upload failed. Try a smaller file.";
  } finally {
    submitButton.textContent = "Upload data/material";
    submitButton.disabled = false;
  }
});

resourceList.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("button[data-toggle-module-index]");
  if (toggleButton) {
    const card = toggleButton.closest(".resource-card");
    const body = card?.querySelector(".learning-module-body");
    if (body) {
      body.classList.toggle("is-hidden");
      toggleButton.textContent = body.classList.contains("is-hidden") ? "Open learning module" : "Close learning module";
    }
    return;
  }

  const openButton = event.target.closest("button[data-open-resource-index]");
  if (openButton) {
    openResource(resources[Number(openButton.dataset.openResourceIndex)]);
    return;
  }

  const button = event.target.closest("button[data-resource-index]");
  if (!button) return;
  resources.splice(Number(button.dataset.resourceIndex), 1);
  saveResources();
  renderResources();
});

resourceFile.addEventListener("change", () => {
  selectedFileName.textContent = resourceFile.files[0]?.name || "No file selected";
});

repositoryFilter.addEventListener("change", renderResources);
renderModulePages();


const workflowData = {
  foundations: {
    label: "Module 1",
    title: "GenAI & LLMs: how they work",
    text: "A foundation module on LLMs, tokens, prompts, generated outputs, hallucination, uncertainty, and human oversight in healthcare education.",
    steps: ["Define GenAI and LLMs", "Explain tokens, prompts, and outputs", "Identify common healthcare education uses", "Recognise hallucination and missing context", "Decide where human review is required"]
  },
  genai: {
    label: "Module 2",
    title: "GenAI prompting and healthcare use",
    text: "An applied module for writing safer healthcare prompts while respecting patient privacy, consent, clinical boundaries, and professional responsibility.",
    steps: ["Use role, task, context, constraints, and format", "Avoid patient-identifiable data", "Match prompts to low-risk education tasks", "Review generated outputs before use", "Document prompt limitations"]
  },
  ml: {
    label: "Module 3",
    title: "GenAI evaluating and comparing models",
    text: "A practical evaluation module for comparing GenAI outputs using factuality, usefulness, completeness, uncertainty, hallucination, and safety criteria.",
    steps: ["Check factual accuracy", "Look for unsupported clinical claims", "Compare two outputs with a rubric", "Assess uncertainty and missing warnings", "Select the safer response"]
  },
  ethics: {
    label: "Module 4",
    title: "GenAI explainability and algorithmic bias",
    text: "An advanced module on bias sources, fairness, explainability limits, transparency, governance, and communicating AI limitations to patients and families.",
    steps: ["Identify bias sources", "Review explainability limits", "Apply fairness checks", "Communicate uncertainty", "Plan mitigation and governance steps"]
  }
};

const workflowLabel = document.querySelector("#workflowLabel");
const workflowTitle = document.querySelector("#workflowTitle");
const workflowText = document.querySelector("#workflowText");
const workflowSteps = document.querySelector("#workflowSteps");
const usecaseCards = document.querySelectorAll(".usecase-card");

function renderWorkflow(key) {
  const workflow = workflowData[key];
  workflowLabel.textContent = workflow.label;
  workflowTitle.textContent = workflow.title;
  workflowText.textContent = workflow.text;
  workflowSteps.innerHTML = "";
  workflow.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    workflowSteps.appendChild(item);
  });
  usecaseCards.forEach((card) => card.classList.toggle("active", card.dataset.usecase === key));
}

usecaseCards.forEach((card) => {
  card.addEventListener("click", () => renderWorkflow(card.dataset.usecase));
});
renderWorkflow("foundations");

const browserAiForm = document.querySelector("#browserAiForm");
const browserAiPrompt = document.querySelector("#browserAiPrompt");
const browserAiResponse = document.querySelector("#browserAiResponse");
const browserAiStatus = document.querySelector("#browserAiStatus");

const browserKnowledge = [
  {
    title: "GenAI and LLM foundations",
    keywords: ["genai", "llm", "tokens", "training", "hallucination", "foundation"],
    answer: "GenAI and LLMs generate text by predicting likely language patterns from prompts and learned representations. In healthcare education, they can support drafting, summarising, tutoring, and simulation, but their outputs need human review because they can hallucinate, omit context, or sound certain when they are wrong."
  },
  {
    title: "Prompting in healthcare",
    keywords: ["prompt", "prompting", "privacy", "patient", "context", "safe"],
    answer: "A safer healthcare prompt states the role, task, context, constraints, and output format. It should avoid identifiable patient data and should be used for education or support, not as a replacement for clinical judgement."
  },
  {
    title: "Evaluating GenAI outputs",
    keywords: ["evaluate", "evaluation", "compare", "factual", "hallucination", "rubric", "safety"],
    answer: "Evaluate GenAI outputs for factuality, relevance, completeness, uncertainty, missing safety warnings, unsupported clinical claims, and usefulness. Comparing outputs with a rubric is safer than trusting fluent wording."
  },
  {
    title: "Explainability and algorithmic bias",
    keywords: ["bias", "fairness", "explainability", "transparent", "governance", "equity"],
    answer: "Bias can enter through training data, prompt wording, deployment context, and user interpretation. GenAI explanations can be persuasive without being reliable, so fairness checks, transparency, and governance are needed."
  }
];

function browserTokens(value) {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function findBrowserGuidance(question) {
  const tokens = browserTokens(question);
  const matches = browserKnowledge
    .map((item) => ({
      item,
      score: tokens.reduce((score, token) => score + (item.title.toLowerCase().includes(token) || item.keywords.includes(token) || item.answer.toLowerCase().includes(token) ? 1 : 0), 0)
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);

  const resourceMatches = resources
    .map((resource) => ({
      resource,
      score: tokens.reduce((score, token) => score + ([resource.title, resource.module, resource.type, resource.description, resource.file || ""].join(" ").toLowerCase().includes(token) ? 1 : 0), 0)
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  return { matches: matches.slice(0, 2), resourceMatches };
}

browserAiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = browserAiPrompt.value.trim();
  if (!question) return;

  const { matches, resourceMatches } = findBrowserGuidance(question);
  browserAiStatus.textContent = "Generated";
  browserAiResponse.innerHTML = "";

  const intro = document.createElement("div");
  intro.className = "bot-answer";
  intro.innerHTML = "<strong>Health-AI guidance</strong><p>Here is a focused educational response with related learning material when available.</p>";
  browserAiResponse.appendChild(intro);

  if (!matches.length && !resourceMatches.length) {
    const fallback = document.createElement("div");
    fallback.className = "bot-match";
    fallback.innerHTML = "<strong>Suggested direction</strong><p>Try asking about bias, model evaluation, data quality, deep learning, privacy, or ethical use in healthcare AI.</p>";
    browserAiResponse.appendChild(fallback);
    return;
  }

  matches.forEach(({ item }) => {
    const block = document.createElement("div");
    block.className = "bot-match";
    block.innerHTML = "<strong>" + escapeHtml(item.title) + "</strong><p>" + escapeHtml(item.answer) + "</p><span>Built-in guide</span>";
    browserAiResponse.appendChild(block);
  });

  resourceMatches.forEach(({ resource }) => {
    const block = document.createElement("div");
    block.className = "bot-match";
    block.innerHTML = "<strong>Related material: " + escapeHtml(resource.title) + "</strong><p>" + escapeHtml(resource.description || "No teaching note added.") + "</p><span>" + escapeHtml(resource.module) + "</span><span>" + escapeHtml(resource.type) + "</span>";
    browserAiResponse.appendChild(block);
  });
});


document.querySelector(".icon-button")?.addEventListener("click", () => {
  document.querySelector("#builder")?.scrollIntoView({ behavior: "smooth" });
});


const loginScreen = document.querySelector("#loginScreen");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const showLoginButton = document.querySelector("#showLogin");
const showRegisterButton = document.querySelector("#showRegister");
const authTitle = document.querySelector("#authTitle");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const registerName = document.querySelector("#registerName");
const registerRole = document.querySelector("#registerRole");
const registerOrganization = document.querySelector("#registerOrganization");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const loginMessage = document.querySelector("#loginMessage");
const registerMessage = document.querySelector("#registerMessage");
const userName = document.querySelector("#userName");
const userRole = document.querySelector("#userRole");
const logoutButton = document.querySelector("#logoutButton");
const usersTableBody = document.querySelector("#usersTableBody");
const clearUsersButton = document.querySelector("#clearUsersButton");
const exportDatabaseButton = document.querySelector("#exportDatabaseButton");
const importDatabaseInput = document.querySelector("#importDatabaseInput");
const databaseStatus = document.querySelector("#databaseStatus");
const databaseUserCount = document.querySelector("#databaseUserCount");
const databaseMaterialCount = document.querySelector("#databaseMaterialCount");
const loginKey = "healthAiUser";
const usersKey = "healthAiUsers";
const masterAdminEmail = "admin@health-ai.local";

function loadUsers() {
  const saved = window.localStorage.getItem(usersKey);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
}

function setDatabaseStatus(message, isError = false) {
  if (!databaseStatus) return;
  databaseStatus.textContent = message;
  databaseStatus.classList.toggle("is-error", isError);
}

function renderDatabaseStats() {
  const users = ensureMasterAdmin(loadUsers());
  if (databaseUserCount) databaseUserCount.textContent = users.length;
  if (databaseMaterialCount) databaseMaterialCount.textContent = resources.length;
}

function getDatabaseSnapshot() {
  return {
    platform: "Health-AI",
    version: "1.0",
    exportedAt: new Date().toISOString(),
    users: ensureMasterAdmin(loadUsers()),
    resources
  };
}

function downloadDatabaseSnapshot() {
  const snapshot = getDatabaseSnapshot();
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "health-ai-database.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setDatabaseStatus("Database exported. Keep the JSON file as your backup.");
}

function importDatabaseSnapshot(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const snapshot = JSON.parse(reader.result);
      if (!Array.isArray(snapshot.users) || !Array.isArray(snapshot.resources)) {
        throw new Error("Invalid database file");
      }
      saveUsers(ensureMasterAdmin(snapshot.users));
      resources = snapshot.resources;
      saveResources();
      renderUsersTable();
      renderResources();
      setDatabaseStatus("Database imported successfully.");
    } catch {
      setDatabaseStatus("Import failed. Please choose a valid Health-AI database JSON file.", true);
    } finally {
      importDatabaseInput.value = "";
    }
  });
  reader.addEventListener("error", () => {
    setDatabaseStatus("Import failed. Please try the file again.", true);
  });
  reader.readAsText(file);
}

function isMasterAdmin(user) {
  return user?.role === "Master admin" && user?.email?.toLowerCase() === masterAdminEmail;
}

function updateAdminAccess(user) {
  document.querySelectorAll(".admin-only").forEach((element) => {
    element.classList.toggle("is-hidden", !isMasterAdmin(user));
  });
}

function ensureMasterAdmin(users) {
  if (users.some((user) => user.email.toLowerCase() === masterAdminEmail)) return users;
  return [
    {
      name: "Master Admin",
      role: "Master admin",
      organization: "Health-AI",
      email: masterAdminEmail,
      password: "admin123",
      createdAt: new Date().toLocaleDateString()
    },
    ...users
  ];
}

function renderUsersTable() {
  const users = ensureMasterAdmin(loadUsers());
  saveUsers(users);
  renderDatabaseStats();
  usersTableBody.innerHTML = "";
  if (!users.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = "No registered users yet.";
    row.appendChild(cell);
    usersTableBody.appendChild(row);
    return;
  }

  users.forEach((user) => {
    const row = document.createElement("tr");
    [user.name, user.role, user.email, user.organization || "-", user.createdAt].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    usersTableBody.appendChild(row);
  });
}

function setAuthMode(mode) {
  const isRegister = mode === "register";
  loginForm.classList.toggle("is-hidden", isRegister);
  registerForm.classList.toggle("is-hidden", !isRegister);
  showLoginButton.classList.toggle("active", !isRegister);
  showRegisterButton.classList.toggle("active", isRegister);
  authTitle.textContent = isRegister ? "Create account" : "Sign in";
  loginMessage.textContent = "";
  registerMessage.textContent = "";
}

function showApp(user) {
  userName.textContent = user.name;
  userRole.textContent = user.role + " • " + user.email;
  loginScreen.classList.add("is-hidden");
  appShell.classList.remove("is-locked");
  updateAdminAccess(user);
  renderUsersTable();
}

function showLogin() {
  loginScreen.classList.remove("is-hidden");
  appShell.classList.add("is-locked");
  setAuthMode("login");
  updateAdminAccess(null);
}

const savedUser = window.localStorage.getItem(loginKey);
if (savedUser) {
  try {
    showApp(JSON.parse(savedUser));
  } catch {
    showLogin();
  }
} else {
  showLogin();
}

showLoginButton.addEventListener("click", () => setAuthMode("login"));
showRegisterButton.addEventListener("click", () => setAuthMode("register"));

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const users = ensureMasterAdmin(loadUsers());
  const email = registerEmail.value.trim().toLowerCase();
  if (users.some((user) => user.email.toLowerCase() === email)) {
    registerMessage.textContent = "This email is already registered.";
    return;
  }

  const user = {
    name: registerName.value.trim(),
    role: registerRole.value,
    organization: registerOrganization.value.trim(),
    email,
    password: registerPassword.value,
    createdAt: new Date().toLocaleDateString()
  };
  users.unshift(user);
  saveUsers(users);
  window.localStorage.setItem(loginKey, JSON.stringify(user));
  registerForm.reset();
  showApp(user);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;
  const user = ensureMasterAdmin(loadUsers()).find((item) => item.email.toLowerCase() === email && item.password === password);
  if (!user) {
    loginMessage.textContent = "Account not found. Please register first or check your password.";
    return;
  }
  window.localStorage.setItem(loginKey, JSON.stringify(user));
  showApp(user);
});

logoutButton.addEventListener("click", () => {
  window.localStorage.removeItem(loginKey);
  loginForm.reset();
  showLogin();
});

clearUsersButton.addEventListener("click", () => {
  saveUsers(ensureMasterAdmin([]));
  resources = [];
  saveResources();
  window.localStorage.removeItem(loginKey);
  renderUsersTable();
  renderResources();
  setDatabaseStatus("Database cleared. Master admin account was kept.");
  showLogin();
});

exportDatabaseButton?.addEventListener("click", downloadDatabaseSnapshot);

importDatabaseInput?.addEventListener("change", () => {
  importDatabaseSnapshot(importDatabaseInput.files[0]);
});

renderResources();
