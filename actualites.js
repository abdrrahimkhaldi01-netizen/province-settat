// ----- UTILITAIRES LOCALSTORAGE -----
const STORAGE_KEY = "actualitesList";
const LOGIN_KEY = "isLoggedIn";

function loadActualites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Erreur chargement actualites:", e);
    return [];
  }
}

function saveActualites(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ----- LOGIN -----
function checkLogin() {
  return localStorage.getItem(LOGIN_KEY) === "true";
}

function requireLogin() {
  if (!checkLogin()) {
    window.location.href = "login.html";
  }
}

// ----- INIT PAGES -----
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "login") {
    initLoginPage();
  } else if (page === "admin") {
    requireLogin();
    initAdminPage();
  } else if (page === "public") {
    initPublicPage();
  } else if (page === "detail") {
    initDetailPage();
  }

  // Active le système de zoom sur les images
  initImageZoom();
});


// ----- PAGE LOGIN -----
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const validEmail = "admin@ofppt.ma";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem(LOGIN_KEY, "true");
      window.location.href = "admin.html";
    } else {
      loginError.textContent = "Email ou mot de passe incorrect.";
      loginError.style.display = "block";
    }
  });
}

// ----- PAGE ADMIN -----
function initAdminPage() {
  const form = document.getElementById("actusForm");
  const resetBtn = document.getElementById("resetFormBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  renderAdminList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveActuFromForm();
  });

  resetBtn.addEventListener("click", () => {
    clearForm();
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(LOGIN_KEY);
    window.location.href = "login.html";
  });
}

function saveActuFromForm() {
  const idField = document.getElementById("actusId");
  const titreField = document.getElementById("titre");
  const typeField = document.getElementById("typeActu");
  const resumeField = document.getElementById("resume");
  const contenuField = document.getElementById("contenu");
  const imageField = document.getElementById("imagePrincipale");
  const mediasField = document.getElementById("medias");
  const dateField = document.getElementById("datePerso");

  const id = idField.value;
  const titre = titreField.value.trim();
  const typeActu = typeField.value.trim();
  const resume = resumeField.value.trim();
  const contenu = contenuField.value.trim();
  const imagePrincipale = imageField.value.trim();
  const mediasLines = mediasField.value
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const datePerso = dateField && dateField.value ? dateField.value : null;

  if (!titre || !typeActu || !resume || !contenu) {
    alert(
      "Veuillez remplir tous les champs obligatoires (Titre, Type, Résumé, Contenu)."
    );
    return;
  }

  let list = loadActualites();

  if (id) {
    // Mise à jour
    const index = list.findIndex((a) => a.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        titre,
        typeActu,
        resume,
        contenu,
        imagePrincipale,
        medias: mediasLines,
        datePerso,
        updatedAt: new Date().toISOString(),
      };
    }
  } else {
    // Nouvelle actualité
    const newActu = {
      id: Date.now().toString(),
      titre,
      typeActu,
      resume,
      contenu,
      imagePrincipale,
      medias: mediasLines,
      datePerso,
      createdAt: new Date().toISOString(),
    };
    list.push(newActu);
  }

  saveActualites(list);
  clearForm();
  renderAdminList();
}

function clearForm() {
  document.getElementById("actusId").value = "";
  document.getElementById("titre").value = "";
  document.getElementById("typeActu").value = "";
  document.getElementById("resume").value = "";
  document.getElementById("contenu").value = "";
  document.getElementById("imagePrincipale").value = "";
  document.getElementById("medias").value = "";
  const dateField = document.getElementById("datePerso");
  if (dateField) dateField.value = "";
  document.getElementById("formTitle").textContent = "Ajouter une actualité";
}

function renderAdminList() {
  const container = document.getElementById("actusList");
  const emptyMsg = document.getElementById("noActusAdmin");
  const list = loadActualites().sort((a, b) => {
    const da = a.createdAt || a.updatedAt;
    const db = b.createdAt || b.updatedAt;
    return new Date(db) - new Date(da);
  });

  container.innerHTML = "";

  if (list.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  list.forEach((actu) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const main = document.createElement("div");
    main.className = "admin-item-main";

    const title = document.createElement("div");
    title.className = "admin-item-title";
    title.textContent = actu.titre;

    const meta = document.createElement("div");
    meta.className = "admin-item-meta";
    let dateLabel = "";
    if (actu.datePerso) {
      dateLabel = new Date(actu.datePerso).toLocaleDateString();
    } else if (actu.updatedAt) {
      dateLabel = new Date(actu.updatedAt).toLocaleString();
    } else if (actu.createdAt) {
      dateLabel = new Date(actu.createdAt).toLocaleString();
    }
    meta.textContent = `${actu.typeActu || "Type non défini"} • ${dateLabel}`;

    main.appendChild(title);
    main.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn secondary-btn";
    editBtn.textContent = "Modifier";
    editBtn.addEventListener("click", () => fillFormForEdit(actu.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn danger-btn";
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => deleteActu(actu.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(main);
    item.appendChild(actions);

    container.appendChild(item);
  });
}

function fillFormForEdit(id) {
  const list = loadActualites();
  const actu = list.find((a) => a.id === id);
  if (!actu) return;

  document.getElementById("actusId").value = actu.id;
  document.getElementById("titre").value = actu.titre;
  document.getElementById("typeActu").value = actu.typeActu;
  document.getElementById("resume").value = actu.resume;
  document.getElementById("contenu").value = actu.contenu;
  document.getElementById("imagePrincipale").value =
    actu.imagePrincipale || "";
  document.getElementById("medias").value = (actu.medias || []).join("\n");

  const dateField = document.getElementById("datePerso");
  if (dateField) {
    if (actu.datePerso) {
      dateField.value = actu.datePerso.slice(0, 10);
    } else if (actu.createdAt) {
      dateField.value = actu.createdAt.slice(0, 10);
    } else {
      dateField.value = "";
    }
  }

  document.getElementById("formTitle").textContent =
    "Modifier l'actualité";
}

function deleteActu(id) {
  if (!confirm("Voulez-vous vraiment supprimer cette actualité ?")) return;
  let list = loadActualites();
  list = list.filter((a) => a.id !== id);
  saveActualites(list);
  renderAdminList();
}

// ----- PAGE PUBLIQUE -----
function initPublicPage() {
  renderPublicGrid();
  initModalEvents();
}


function renderPublicGrid() {
  const grid = document.getElementById("actusGrid");
  const emptyMsg = document.getElementById("noActusPublic");
  const list = loadActualites().sort((a, b) => {
    const da = a.createdAt || a.updatedAt;
    const db = b.createdAt || b.updatedAt;
    return new Date(db) - new Date(da);
  });

  grid.innerHTML = "";

  if (list.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  list.forEach((actu) => {
    const card = document.createElement("article");
    card.className = "actus-card";
    card.dataset.id = actu.id;

    // ---- IMAGE EN TÊTE DE CARTE ----
    const bg = document.createElement("div");
    bg.className = "actus-card-bg";

    const img = document.createElement("img");
    img.className = "actus-card-img";
    if (actu.imagePrincipale) {
      img.src = actu.imagePrincipale;
    } else {
      img.src =
        "https://via.placeholder.com/1200x340/1d4ed8/ffffff?text=Actualit%C3%A9";
    }
    img.alt = "Image actualité";

    bg.appendChild(img);

    // ---- CONTENU TEXTE ----
    const overlay = document.createElement("div");
    overlay.className = "actus-card-overlay";

    const content = document.createElement("div");
    content.className = "actus-card-content";

    const top = document.createElement("div");
    top.className = "actus-meta-top";

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = actu.typeActu || "Actualité";

    const dateSpan = document.createElement("span");
    dateSpan.className = "actus-date";
    let date;
    if (actu.datePerso) {
      date = new Date(actu.datePerso).toLocaleDateString();
    } else if (actu.createdAt || actu.updatedAt) {
      const baseDate = actu.createdAt || actu.updatedAt;
      date = new Date(baseDate).toLocaleDateString();
    } else {
      date = "";
    }
    dateSpan.textContent = date;

    top.appendChild(badge);
    top.appendChild(dateSpan);

    const title = document.createElement("h2");
    title.className = "actus-title";
    title.textContent = actu.titre;

    const resume = document.createElement("p");
    resume.className = "actus-resume";
    resume.textContent = actu.resume;

    // URL du slug détail
    const detailUrl = buildDetailUrl(actu);

    // Footer carte : texte + bouton Lire plus
    const footerRow = document.createElement("div");
    footerRow.className = "actus-card-footer";

    const bottomTag = document.createElement("div");
    bottomTag.className = "actus-tag-bottom";
    bottomTag.textContent = "Actualité détaillée";

    const readBtn = document.createElement("button");
    readBtn.className = "actus-read-btn";
    readBtn.type = "button";
    readBtn.textContent = "Lire plus";
    readBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = detailUrl;
    });

    footerRow.appendChild(bottomTag);
    footerRow.appendChild(readBtn);

    content.appendChild(top);
    content.appendChild(title);
    content.appendChild(resume);
    content.appendChild(footerRow);

    card.appendChild(bg);
    card.appendChild(overlay);
    card.appendChild(content);

    grid.appendChild(card);
  });
}


// ----- MODAL PUBLIQUE -----
function initModalEvents() {
  const modal = document.getElementById("actusModal");
  if (!modal) return; // page détail n'a pas de modal

  const closeBtn = document.getElementById("closeModalBtn");

  closeBtn.addEventListener("click", closeActuModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeActuModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeActuModal();
    }
  });
}

function openActuModal(id) {
  const list = loadActualites();
  const actu = list.find((a) => a.id === id);
  if (!actu) return;

  const modal = document.getElementById("actusModal");
  const modalImage = document.getElementById("modalImage");
  const modalType = document.getElementById("modalType");
  const modalDate = document.getElementById("modalDate");
  const modalTitle = document.getElementById("modalTitle");
  const modalResume = document.getElementById("modalResume");
  const modalContenu = document.getElementById("modalContenu");
  const modalMedias = document.getElementById("modalMedias");

  if (actu.imagePrincipale) {
    modalImage.src = actu.imagePrincipale;
  } else {
    modalImage.src =
      "https://via.placeholder.com/900x280/1d4ed8/ffffff?text=Actualit%C3%A9";
  }
  // image principale zoomable
  modalImage.setAttribute("data-zoomable", "true");

  modalType.textContent = actu.typeActu || "Actualité";
  let modalDateLabel = "";
  if (actu.datePerso) {
    modalDateLabel = new Date(actu.datePerso).toLocaleDateString();
  } else if (actu.createdAt || actu.updatedAt) {
    modalDateLabel = new Date(actu.createdAt || actu.updatedAt).toLocaleString();
  }
  modalDate.textContent = modalDateLabel;
  modalTitle.textContent = actu.titre;
  modalResume.textContent = actu.resume;
  modalContenu.textContent = actu.contenu;

  modalMedias.innerHTML = "";
  renderMediaGallery(modalMedias, actu.medias || []);

  modal.style.display = "flex";
}

function closeActuModal() {
  const modal = document.getElementById("actusModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// ----- PAGE DÉTAIL (slug) -----
function initDetailPage() {
  const id = getQueryParam("id");
  const notFound = document.getElementById("detailNotFound");

  if (!id) {
    if (notFound) notFound.style.display = "block";
    return;
  }

  const list = loadActualites();
  const actu = list.find((a) => a.id === id);
  if (!actu) {
    if (notFound) notFound.style.display = "block";
    return;
  }

  const imageEl = document.getElementById("detailImage");
  const typeEl = document.getElementById("detailType");
  const dateEl = document.getElementById("detailDate");
  const titleEl = document.getElementById("detailTitle");
  const resumeEl = document.getElementById("detailResume");
  const contenuEl = document.getElementById("detailContenu");
  const mediasEl = document.getElementById("detailMedias");

  if (actu.imagePrincipale) {
    imageEl.src = actu.imagePrincipale;
  } else {
    imageEl.src =
      "https://via.placeholder.com/1200x340/1d4ed8/ffffff?text=Actualit%C3%A9";
  }
  // image principale zoomable
  imageEl.setAttribute("data-zoomable", "true");

  typeEl.textContent = actu.typeActu || "Actualité";
  let detailDateLabel = "";
  if (actu.datePerso) {
    detailDateLabel = new Date(actu.datePerso).toLocaleDateString();
  } else if (actu.createdAt || actu.updatedAt) {
    detailDateLabel = new Date(actu.createdAt || actu.updatedAt).toLocaleString();
  }
  dateEl.textContent = detailDateLabel;
  titleEl.textContent = actu.titre;
  resumeEl.textContent = actu.resume;
  contenuEl.textContent = actu.contenu;

  mediasEl.innerHTML = "";
  renderMediaGallery(mediasEl, actu.medias || []);

  if (notFound) notFound.style.display = "none";
}


// ----- HELPERS SLUG + QUERY -----
function generateActuSlug(actu) {
  const base = (actu.titre || "actualite").toLowerCase();

  // enlever accents
  const normalized = base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildDetailUrl(actu) {
  const slug = generateActuSlug(actu);
  return `actualite.html?id=${encodeURIComponent(actu.id)}&slug=${slug}`;
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// ----- HELPERS MÉDIAS (galerie) -----
function renderMediaGallery(container, medias) {
  (medias || []).forEach((url) => {
    const wrapper = document.createElement("div");

    if (isImageUrl(url)) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Image actualité";
      img.setAttribute("data-zoomable", "true");
      wrapper.appendChild(img);
    } else if (isVideoUrl(url)) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      wrapper.appendChild(video);
    } else if (isYouTubeUrl(url)) {
      const iframe = document.createElement("iframe");
      iframe.src = convertToYouTubeEmbed(url);
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";
      wrapper.appendChild(iframe);
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.textContent = url;
      wrapper.appendChild(link);
    }

    container.appendChild(wrapper);
  });
}


// Helpers détection type de média
function isImageUrl(url) {
  return /\.(jpe?g|png|gif|webp|svg)$/i.test(url);
}

function isVideoUrl(url) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function isYouTubeUrl(url) {
  return /youtube\.com\/watch\?v=|youtu\.be\//i.test(url);
}

function convertToYouTubeEmbed(url) {
  const reg = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(reg);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}
// ----- IMAGE ZOOM (LIGHTBOX PLEIN ÉCRAN) -----
function initImageZoom() {
  // Crée l'overlay une seule fois
  let overlay = document.getElementById("imageZoomOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "imageZoomOverlay";
    overlay.className = "image-zoom-overlay";
    // overlay.innerHTML = '<img src="" class="image-zoom-img" alt="Zoom image">';
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      document.body.classList.remove("no-scroll");
    });
    document.body.appendChild(overlay);
  }

  const zoomImg = overlay.querySelector(".image-zoom-img");

  // Délégation : tout clic sur un élément data-zoomable ouvre l'image en grand
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target && target.matches("[data-zoomable]")) {
      const src = target.getAttribute("src");
      if (!src) return;
      zoomImg.src = src;
      overlay.classList.add("visible");
      document.body.classList.add("no-scroll");
    }
  });
}
