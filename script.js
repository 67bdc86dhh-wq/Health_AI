const specialtyData = {
  "AI Fundamentals": { level: "Core", risk: "Medium", lesson: "What AI means in healthcare" },
  "Machine Learning": { level: "Core", risk: "High", lesson: "How models learn from data" },
  "Deep Learning": { level: "Advanced", risk: "High", lesson: "Why neural networks can be hard to interpret" },
  "Clinical Data": { level: "Core", risk: "High", lesson: "How data quality shapes AI behavior" },
  "Model Evaluation": { level: "Core", risk: "High", lesson: "Accuracy is not enough" },
  "Bias and Safety": { level: "Essential", risk: "Critical", lesson: "Where unsafe outputs come from" },
  "Ethical Use": { level: "Essential", risk: "Critical", lesson: "Keeping responsibility with clinicians" },
  "Clinical Deployment": { level: "Advanced", risk: "Critical", lesson: "Using AI safely in real workflows" }
};

const steps = [
  "Learn the difference between AI, machine learning, and deep learning.",
  "Trace how clinical data becomes model input and prediction output.",
  "Explore what affects model performance, bias, and reliability.",
  "Read validation results, uncertainty, and common failure modes.",
  "Apply ethical rules before using AI in a clinical decision."
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
    title: "AI, ML, and DL: core definitions",
    module: "AI Fundamentals",
    type: "Slide deck",
    description: "Introduces the difference between rules-based systems, machine learning, and deep learning for clinical learners.",
    file: "health-ai-foundations.pdf",
    url: "#"
  },
  {
    title: "Bias in clinical datasets",
    module: "Bias and Safety",
    type: "Case study",
    description: "A guided discussion on how missingness, representation, and historical practice patterns affect model behavior.",
    file: "bias-case-study.docx",
    url: "#"
  },
  {
    title: "Reading model validation tables",
    module: "Model Evaluation",
    type: "Reading",
    description: "Explains accuracy, sensitivity, specificity, AUC, calibration, and why no single metric is enough.",
    file: "validation-guide.pdf",
    url: "#"
  }
];

const resourceForm = document.querySelector("#resourceForm");
const resourceList = document.querySelector("#resourceList");
const repositoryFilter = document.querySelector("#repositoryFilter");
const resourceCount = document.querySelector("#resourceCount");
const resourceFile = document.querySelector("#resourceFile");
const selectedFileName = document.querySelector("#selectedFileName");
const resourceKey = "healthAiResources";

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
  content.append(title, meta);
  header.append(content, fileButton);
  actions.append(openButton, removeButton);
  card.append(header, description, actions);
  return card;
}

function renderResources() {
  const filter = repositoryFilter.value;
  const visibleResources = filter === "All modules" ? resources : resources.filter((item) => item.module === filter);
  resourceList.innerHTML = "";
  resourceCount.textContent = resources.length;
  renderDatabaseStats();

  if (!visibleResources.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No materials in this module yet.";
    resourceList.appendChild(empty);
    return;
  }

  const modules = [...new Set(visibleResources.map((resource) => resource.module))];
  modules.forEach((moduleName) => {
    const moduleSection = document.createElement("section");
    const moduleHeader = document.createElement("div");
    const moduleTitle = document.createElement("h3");
    const moduleCount = document.createElement("span");
    const moduleItems = document.createElement("div");
    const moduleResources = visibleResources.filter((resource) => resource.module === moduleName);

    moduleSection.className = "resource-module";
    moduleHeader.className = "resource-module-header";
    moduleItems.className = "resource-module-items";
    moduleTitle.textContent = moduleName;
    moduleCount.textContent = moduleResources.length + (moduleResources.length === 1 ? " material" : " materials");

    moduleHeader.append(moduleTitle, moduleCount);
    moduleResources.forEach((resource) => moduleItems.appendChild(createResourceCard(resource)));
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
      module: document.querySelector("#resourceModule").value,
      type: document.querySelector("#resourceType").value,
      description: document.querySelector("#resourceDescription").value.trim(),
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


const workflowData = {
  clinic: {
    label: "Clinical practice workflow",
    title: "Evaluate AI outputs",
    text: "A guided pathway for reviewing model purpose, source data, validation, uncertainty, and safe clinical interpretation.",
    steps: ["Identify the tool's intended clinical use", "Check what data trained the model", "Review validation and performance metrics", "Look for bias, uncertainty, and missing context", "Document human review before action"]
  },
  teaching: {
    label: "Teaching workflow",
    title: "Build lecture pathways",
    text: "A course-building flow for turning AI literacy content into structured sessions and practical classroom activities.",
    steps: ["Choose a module topic", "Attach slides, readings, datasets, and cases", "Add a discussion question", "Assign a short quiz", "Review student understanding"]
  },
  research: {
    label: "Research literacy workflow",
    title: "Read AI papers better",
    text: "A review pathway for interpreting AI publications and separating strong evidence from weak claims.",
    steps: ["Define the clinical endpoint", "Inspect dataset size and representation", "Compare internal and external validation", "Review calibration and subgroup performance", "Summarize limitations before adoption"]
  },
  governance: {
    label: "Governance workflow",
    title: "Prepare safer adoption",
    text: "A checklist for privacy, accountability, monitoring, and operational readiness before clinical AI use.",
    steps: ["Confirm privacy and consent requirements", "Assign clinical accountability", "Plan monitoring after deployment", "Create escalation rules", "Schedule periodic model review"]
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
renderWorkflow("clinic");

const browserAiForm = document.querySelector("#browserAiForm");
const browserAiPrompt = document.querySelector("#browserAiPrompt");
const browserAiResponse = document.querySelector("#browserAiResponse");
const browserAiStatus = document.querySelector("#browserAiStatus");

const browserKnowledge = [
  {
    title: "Bias in clinical AI",
    keywords: ["bias", "fairness", "dataset", "representation"],
    answer: "Bias can appear when training data does not represent the patient population, labels reflect historical practice patterns, or model performance is not checked across subgroups. Doctors should ask who was represented, who was missing, and how the model was validated."
  },
  {
    title: "Model evaluation",
    keywords: ["evaluation", "accuracy", "auc", "sensitivity", "specificity", "calibration", "metrics"],
    answer: "Model evaluation should include sensitivity, specificity, AUC, calibration, subgroup performance, and clinical consequences of false positives and false negatives. Accuracy alone is not enough for healthcare use."
  },
  {
    title: "Data quality",
    keywords: ["data", "quality", "missing", "training", "label"],
    answer: "AI model behavior depends on data quality, missing values, labeling choices, measurement consistency, and whether the training data matches the real clinical setting."
  },
  {
    title: "Ethical use",
    keywords: ["ethics", "privacy", "responsibility", "patient", "consent", "safe"],
    answer: "Ethical use of AI in healthcare requires privacy protection, transparency, human oversight, clear accountability, and awareness that AI supports clinical reasoning rather than replacing it."
  },
  {
    title: "Deep learning basics",
    keywords: ["deep", "learning", "neural", "black box", "explain"],
    answer: "Deep learning models learn complex patterns through layered neural networks. They can be powerful, but their reasoning may be difficult to interpret, so explanation, validation, and human review are important."
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
