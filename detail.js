(function () {
  const $ = s => document.querySelector(s);
  const byId = id => document.getElementById(id);
  const qs = k => new URLSearchParams(location.search).get(k) || "";

  const G = {
    ESTABLISSEMENTS: (typeof ESTABLISSEMENTS !== "undefined" ? ESTABLISSEMENTS : []),
    FILIERES: (typeof FILIERES !== "undefined" ? FILIERES : [])
  };

  const I = {
    cap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 2 8l10 5 8-4.1V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 12v3c0 2 3 3 6 3s6-1 6-3v-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    day: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    diploma: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16v10H4z" stroke="currentColor" stroke-width="1.6"/><path d="M8 7V5a4 4 0 1 1 8 0v2" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>`
  };

  
  function detectSector(ff) {
    if (ff && ff.secteur && String(ff.secteur).trim()) return ff.secteur.trim();
    const txt = ((ff?.titre || "") + " " + (ff?.extrait || "") + " " + (ff?.tabs?.presentation || "")).toLowerCase();
    const rules = [
      ["Tourisme Hôtellerie Restauration", ["tourisme","hôtel","hotel","restauration","hébergement","accueil","animation","cuisine","arts culinaires","housekeeping","service de restauration"]],
      ["Digital & IT", ["dev","digital","informatique","réseaux","programmation","web","data","cloud","it","infrastructure","applications","full stack"]],
      ["Industrie & Maintenance", ["maintenance","industri","mécanique","fabrication","production","électromécanique","usinage","soudage","froid","climatisation"]],
      ["Bâtiment & TP", ["btp","bâtiment","genie civil","génie civil","chantier","électricit","plomb","carrel","gros œuvres","voirie","géomètre","topographe","conducteur d'engins","métreur","menuiserie"]],
      ["Gestion & Commerce", ["gestion","commerce","comptabil","marketing","vente","admin","logistique","assistant administratif"]],
      ["Textile & Habillement", ["textile","habillement","mode","confection","couture"]],
      ["Agriculture & Agroalimentaire", ["agri","élevage","agro","transformation"]],
      ["Social & Éducation", ["social","éducation","préscolaire","animateur","socio-educatif","petite enfance"]],
      ["Énergies & Environnement", ["énergie","solaire","environnement","eau"]],
      ["Transport & Logistique", ["transport","logistique","magasinage"]],
      ["Santé & Paramédical", ["santé","paramédical","infirm","dentaire"]],
      ["Art & Design", ["art","design","graph","multimédia","audiovisuel","3d","2d","infographie"]]
    ];
    for (const [label, keys] of rules) if (keys.some(k => txt.includes(k))) return label;
    return "Secteurs";
  }

  const slug = decodeURIComponent(qs("slug"));
  const f = G.FILIERES.find(x => String(x.slug) === slug);
  const root = byId("detail");

  if (!f) { root.innerHTML = `<div class="section">Filière introuvable.</div>`; return; }

  const sector = detectSector(f);
  const estabHTML = (f.etabs || [])
    .map(id => (G.ESTABLISSEMENTS || []).find(e => e.id === id))
    .filter(Boolean)
    .map(e => e.nom || e.ville || "")
    .join(" • ");

  const TAB_MAP = [
   
    { key: "admission",    title: "Conditions d'admission" },
    { key: "vise",         title: "Compétences visées" },
    { key: "debouches",    title: "Débouchés professionnels" },
    { key: "evaluation",   title: "Évaluation de la formation" },
    { key: "modalites",    title: "Modalités de sélection" },
    { key: "organisation", title: "Organisation de la formation" },
    { key: "cible",        title: "Public cible" },
    { key: "profil",       title: "Profil de Formation" },
    { key: "filiere",      title: "Filières d'accès niveaux supérieurs" }
 


  ];
  const tabsAvailable = TAB_MAP.filter(t => (f.tabs?.[t.key] || "").trim().length);

  root.innerHTML = `
        
<img id="filiere-sector-img" class="filiere-sector-img" alt="Image du secteur de la filière">

        <h2 class="section-title center">Présentation de la filière</h2>
    <section class="section intro">
      
      ${f.extrait ? `<p class="lead">${f.extrait}</p>` : ""}
      ${f?.tabs?.presentation ? `<p>${f.tabs.presentation}</p>` : ""}
    </section>
       <h2 class="section-title center">Tous ce que vous devez savoir</h2>
    <section class="section vtabs">
      
      <div class="vtabs-wrap">
        <aside class="vtabs-nav" role="tablist" aria-orientation="vertical">
          ${tabsAvailable.map((t, i) => `
            <button class="vtabs-link ${i===0 ? "active" : ""}" role="tab" data-tab="${t.key}">
              ${t.title}
            </button>
          `).join("")}
        </aside>

        <article class="vtabs-panel" role="tabpanel">
          ${tabsAvailable.length ? `
            
            ${tabsAvailable.map((t, i) => `
              <div class="tab-content ${i===0 ? "show" : ""}" data-tab="${t.key}">
                <h3>${t.title}</h3>
                <p>${f.tabs[t.key]}</p>
              </div>
            `).join("")}
          ` : `
            <div class="tab-empty">Le contenu détaillé sera bientôt disponible.</div>
          `}
        </article>
      </div>
    </section>
  `;

  
  const links = root.querySelectorAll(".vtabs-link");
  const panels = root.querySelectorAll(".tab-content");
  links.forEach(btn => {
    btn.addEventListener("click", () => {
      links.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-tab");
      panels.forEach(p => p.classList.toggle("show", p.getAttribute("data-tab") === key));
    });
  });

  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: "0px 0px -8% 0px" });
  root.querySelectorAll(".hero-banner, .section").forEach(el => { el.classList.add("reveal-base"); obs.observe(el); });

  
 // === Bannière par SECTEUR (une image par famille de secteur) ===
  // === Image de fond de la filière selon le SECTEUR ===
 // === Image de secteur pour chaque filière (déterministe, pas aléatoire) ===
(function () {
  try {
    var heroEl = document.querySelector('.hero-banner');
    var imgTag = document.getElementById('filiere-sector-img'); // si tu as mis l'<img> dans le HTML
    if (!heroEl && !imgTag) return;

    // 1) Secteur logique de la filière (même logique que partout dans ton site)
    var sectorName = (typeof detectSector === "function")
      ? detectSector(f)
      : (f && f.secteur) || "";
    sectorName = String(sectorName || "").trim();

    // 2) Texte complet de la filière (pour électricité / auto)
    var fullText = (
      (f.titre || "") + " " +
      (f.extrait || "") + " " +
      (f.tabs && f.tabs.presentation ? f.tabs.presentation : "")
    ).toLowerCase();

    // 3) Mapping SECTEUR -> IMAGE (1 secteur = 1 photo)
    var SECTOR_IMAGES = {
      "Digital & IT":
        "https://blog.digitalcook.fr/wp-content/uploads/2024/06/programming-background-with-person-working-with-codes-computer-scaled.webp",

      "Industrie & Maintenance":
        "https://exploreengineering.ca/sites/default/files/NEM-web-quiz/NEM_mechanical.jpg", // méca par défaut

      "Gestion & Commerce":
        "https://www.descripciondepuestos.org/wp-content/uploads/2024/09/gtpm2Ti0l96ZIemyDPUvH.png.webp",

      "Tourisme Hôtellerie Restauration":
        "https://www.78grad.de/wp-content/uploads/2023/10/78grad-Catering-Event-Location-Unternehmen-004.jpeg",

      "Bâtiment & TP":
        "https://www.viametiers.fr/wp-content/uploads/2023/10/metier-Ingenieur-du-BTP.jpg",

      "Social & Éducation":
        "https://www.centre-pedagogique-sherwood.com/wp-content/uploads/2023/11/iStock-1170395430-min.webp",

      "Santé & Paramédical":
        "https://www.centre-pedagogique-sherwood.com/wp-content/uploads/2023/11/iStock-1170395430-min.webp",

      "Transport & Logistique":
        "https://www.educatel.fr/wp-content/uploads/2021/04/metier-devenir-mecanicien-auto-6.jpg",

      "Art & Design":
        "https://www.hack-academy.fr/wp-content/uploads/2024/04/20240404_660ea31a28248.jpg",

      "Textile & Habillement":
        "https://www.hack-academy.fr/wp-content/uploads/2024/04/20240404_660ea31a28248.jpg",

      "Agriculture & Agroalimentaire":
        "https://www.centre-pedagogique-sherwood.com/wp-content/uploads/2023/11/iStock-1170395430-min.webp",

      "Énergies & Environnement":
        "https://www.viametiers.fr/wp-content/uploads/2023/10/metier-Ingenieur-du-BTP.jpg",

      // fallback si rien trouvé
      "Secteurs":
        "https://blog.digitalcook.fr/wp-content/uploads/2024/06/programming-background-with-person-working-with-codes-computer-scaled.webp"
    };

    // 4) Cas spéciaux : Electricité & Automobile (peu importe le secteur logique)
    var url;

    if (/électricit|electricit|electrotech/.test(fullText)) {
      // toutes les filières d'électricité
      url = "https://f.hellowork.com/obs-static-images/seo/ObsJob/technicien-electricien.jpg";
    } else if (/auto|automobile|véhicule|vehicule|engin/.test(fullText)) {
      // toutes les filières "conduite", mécanique auto, etc.
      url = "https://www.educatel.fr/wp-content/uploads/2021/04/metier-devenir-mecanicien-auto-6.jpg";
    } else {
      // sinon on prend l'image du secteur détecté
      url = SECTOR_IMAGES[sectorName] || SECTOR_IMAGES["Secteurs"];
    }

    console.log("DEBUG secteur image filière", {
      slug: f.slug,
      secteur: sectorName,
      url: url
    });

    if (!url) return;

    // 5) Appliquer l'image dans la bannière
    if (heroEl) {
      heroEl.style.backgroundImage = "url('" + url + "')";
      heroEl.style.backgroundSize = "cover";
      heroEl.style.backgroundPosition = "center center";
      heroEl.style.backgroundRepeat = "no-repeat";
    }

    // 6) Et dans l'<img> du HTML (si tu l'as ajouté)
    if (imgTag) {
      imgTag.src = url;
      imgTag.alt = "Secteur : " + sectorName;
    }

  } catch (e) {
    console.error("Erreur image secteur pour la filière:", e);
  }
})();



})();





window.FILIERE_IMAGES = {
  // Agent de Restauration
  "agent-de-restauration": "https://staffmatch.com/static/af3f361481c20f72290ae6ccc1e52a11/d8f37/023ae28f940a46a65dd47c0e.jpg",
  // Agent Socio-Educatif
  "agent-socio-educatif": "https://zupimages.net/up/20/10/x54d.jpg",
  // Arts culinaires
  "arts-culinaires": "https://ecomusee-alsace.com/wp-content/uploads/2024/09/Culinary-Art.png",
  // Arts culinaires option Cuisine Gastronomique
  "arts-culinaires-option-cuisine-gastronomique": "https://magazine.plus-que-pro.fr/uploads/2022/09/art-culinaire-definition.jpg",
  // Arts culinaires option Cuisine Marocaine
  "arts-culinaires-option-cuisine-marocaine": "https://www.visitmorocco.com/sites/default/files/thumbnails/image/morocco-typical-dish-meat-and-vegetable-in-a-tajine.jpg",
  // Assistant Administratif
  "assistant-administratif": "https://bordeauxformation.com/wp-content/uploads/2022/03/assistant-administratif-bordeaux-925x550.jpeg",
  // Assistant Administratif option Commerce
  "assistant-administratif-option-commerce": "https://www.studi.com/sites/default/files/2025-07/capture_decran_2025-07-02_152655.png",
  // Assistant Administratif option Comptabilité
  "assistant-administratif-option-comptabilit": "https://www.centre-europeen-formation.fr/wp-content/uploads/2023/05/slider-metier-comptable-assistant.jpeg",
  // Assistant Administratif option Gestion
  "assistant-administratif-option-gestion": "https://www.lyon-entreprises.com/wp-content/uploads/2022/11/administratif-entreprise-assistant-1024x683.jpg",
  // Assistant Administratif option Gestion des entreprises
  "assistant-administratif-option-gestion-des-entreprises": "https://www.gbnews.ch/wp-content/gbnews-uploads/2023/06/arlind_assistant-admin_08062023.jpg",
  // Assistant Administratif option Gestion des Entreprises et Institutions
  "assistant-administratif-option-gestion-des-entreprises-et-institutions": "https://f.hellowork.com/obs-static-images/seo/ObsJob/assistant-de-direction.jpg",
  // Assistant en Gestion Administrative et Comptable
  "assistant-en-gestion-administrative-et-comptable": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuJ11sNNSgdYjJLzlEWQxp6TDNJLsagAvezw&s",
  // Assistant en Gestion Administrative et Comptable (BTP)
  "assistant-en-gestion-administrative-et-comptable-btp": "https://www.gif-emploi.fr/sites/gif/files/styles/paragraphe_image/public/paragraph/image/2024-12/BTP%205.jpg?h=3e035d4a&itok=rs4I7xCJ",
  // Assistant Socio-Educatif
  "assistant-socio-educatif": "https://zupimages.net/up/20/10/x54d.jpg",
  // Batiment (1ère année)
  "batiment-1ere-annee": "https://institutboosterafrique.com/ImageCours/1666966156construction-engineer.jpg",
  // Bâtiment option Métreur (2ème année)
  "batiment-option-metreur-2eme-annee": "https://www.ecolechezsoi.com/wp-content/uploads/sites/6/2022/04/ecs-formation-metreur-tce.jpg",
  // Bâtiment Option Projeteur (2ème année)
  "batiment-option-projeteur-2eme-annee": "https://www.obat.fr/blog/wp-content/uploads/2021/07/formation-dessinateur-batiment.jpg",
  // Bureau d'Etude en Construction Métallique
  "bureau-detude-en-construction-metallique": "https://www.charpentemetallique-bobet.fr/media/4160/big/bureau-etudes-batiment-metallique.jpg",
  // Certification Microsoft office Spécialiste en Excel
  "certification-microsoft-office-sp-cialiste-en-excel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5H1SMF4KALUvaDL3CL5qT-CAKKrVvq_pZQ&s",
  // Certification Microsoft office Specialist en Access
  "certification-microsoft-office-specialist-en-access": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5H1SMF4KALUvaDL3CL5qT-CAKKrVvq_pZQ&s",
  // Certification Microsoft office Specialist en Word
  "certification-microsoft-office-specialist-en-word": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5H1SMF4KALUvaDL3CL5qT-CAKKrVvq_pZQ&s",
  // Certification Microsoft office Spécialiste en Outlook
  "certification-microsoft-office-specialiste-en-outlook": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5H1SMF4KALUvaDL3CL5qT-CAKKrVvq_pZQ&s",
  // Certification Microsoft office Spécialiste en PowerPoint
  "certification-microsoft-office-specialiste-en-powerpoint": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5H1SMF4KALUvaDL3CL5qT-CAKKrVvq_pZQ&s",
  // Conducteur d'engins de Chantier (1ère année)
  "conducteur-d-engins-de-chantier-1ere-annee": "https://laconstruction.fr/app/uploads/2023/01/conducteur_d_engins.png",
  // Conducteur d'engins de Chantier (2ème année)
  "conducteur-d-engins-de-chantier-2eme-annee": "https://laconstruction.fr/app/uploads/2023/01/conducteur_d_engins.png",
  // Construction Métallique
  "construction-m-tallique": "https://www.formation-industrie.bzh/images/medias/Construction_metallique_AdobeStock_66055915.jpeg",
  // Coiffure Dames
  "coiffure-dames": "https://trouver-un-metier.fr/wp-content/uploads/2018/11/coiffeur-coiffant-cliente.jpg",
  // Développement Digital
  "developpement-digital": "https://aujourdhui.ma/wp-content/uploads/2023/04/developpement-entreprise-digital-expert-faire.jpg",
  // Diagnostic et Electronique Embarquée
  "diagnostic-et-electronique-embarquee": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDvsthhaD4WEHEKF8bGn1mOtavw0rW4vOlw&s",
  // Educateur Spécialisé
  "educateur-specialise": "https://f.maformation.fr/edito/sites/3/2022/06/educ-spe.jpeg",
  // Electricité d'Installation
  "electricit-d-installation": "https://www.abskill.com/wp-content/uploads/2022/05/AdobeStock_439136266-scaled.jpeg",
  // Electricité de Bâtiment
  "electricite-de-batiment": "https://www.abskill.com/wp-content/uploads/2022/05/AdobeStock_439136266-scaled.jpeg",
  // Electricité de Maintenance Industrielle
  "electricite-de-maintenance-industrielle": "https://www.abskill.com/wp-content/uploads/2022/05/AdobeStock_439136266-scaled.jpeg",
  // Electromécanique des Systèmes Automatisés
  "electrom-canique-des-syst-mes-automatis-s": "https://cfpestuaire.ca/wp-content/uploads/2019/05/cfp-estuaire-electromecanique-04-1024x683.jpg",
  // Froid Commercial et Climatisation
  "froid-commercial-et-climatisation": "https://www.bielen.pro/wp-content/uploads/froid-industriel.jpg",
  // Froid Commercial et Climatisation (1ère année)
  "froid-commercial-et-climatisation-1ere-annee": "https://www.bielen.pro/wp-content/uploads/froid-industriel.jpg",
  // Froid Commercial et Climatisation (2ème année)
  "froid-commercial-et-climatisation-2eme-annee": "https://www.bielen.pro/wp-content/uploads/froid-industriel.jpg",
  // Gestion des Entreprises
  "gestion-des-entreprises": "https://gestionsucces.ca/wp-content/uploads/2024/04/gestion-dentreprise.jpg",
  // Gestion Hôtelière
  "gestion-hoteliere": "https://www.ifpmaroc.com/wp-content/gallery/gallerie-ifp/IMG_3258.jpg",
  // Grutier à Tour et Mobile (1ère année)
  "grutier-tour-mobile-1ere-annee": "https://www.abskill.com/wp-content/uploads/2021/10/Titre-professionnel-Conducteur-de-grue-a-tour-min.jpg",
  // Grutier à Tour et Mobile (2ème année)
  "grutier-tour-mobile-2eme-annee": "https://www.abskill.com/wp-content/uploads/2021/10/Titre-professionnel-Conducteur-de-grue-a-tour-min.jpg",
  // HSE - Hygiène Sécurité Environnement
  "hse-hygiene-securite-environnement": "https://ifpg.ma/wp-content/uploads/2020/12/HSE-Hygiene-securite-et-environnement.jpg",
  // HSE (Qualification)
  "hygiene-securite-environnement-qualification": "https://performeconsulting.com/img/f-responsable-hygene.jpg",
  // HSE (Technicien Spécialisé)
  "hygiene-securite-environnement-technicien-specialise": "https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/batiment-travaux-publics/Technicien-QHSE-850x523.jpg",
  // Infrastructure Digitale
  "infrastructure-digitale": "https://travasecurity.com/wp-content/uploads/2024/09/Digital-Infrastructure-Definition-and-Why-Its-Important-to-Protect-Your-Companys-Digital-Infrastructure.jpg",
  // Infrastructure Digitale option Cyber sécurité
  "infrastructure-digitale-option-cyber-securite": "https://travasecurity.com/wp-content/uploads/2024/09/Digital-Infrastructure-Definition-and-Why-Its-Important-to-Protect-Your-Companys-Digital-Infrastructure.jpg",
  // Infographie
  "infographie": "https://www.hack-academy.fr/wp-content/uploads/2024/04/20240404_660ea31a28248.jpg",
  // Logistique
  "logistique": "",
  // Management Hôtellier
  "management-hotellier": "https://cmh-academy.com/wp-content/uploads/2023/10/CMH_SLIDER_HP_RENTREE_DECALEE_01-1920x960.jpg",
  // Management Hôtellier - Option Hébergement
  "management-hotellier-option-hebergement": "https://cdn.prod.website-files.com/62b1b17308b0d74291186304/66a74dc32229f98f5c146a76_6698550ab83b153fe147de35_hotel%2520general%2520manager%2520supervising.jpeg",
  // Management Hôtellier - Option Restauration
  "management-hotellier-option-restauration": "https://www.cite-formations-tours.fr/wp-content/uploads/2020/01/service-en-salle-formation-tours-1000x620.jpg",
  // Méthodes en Fabrication Mécanique
  "methodes-en-fabrication-mecanique": "https://res.cloudinary.com/gifas/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/images/M%C3%A9tiers/TechnicienMe_%C3%BCthodes_czwxvc.jpg",
  // Mécanicien d’Engins de Chantier (1ère année)
  "mecanicien-engins-de-chantier-1ere-annee": "https://cfpbj.ca/wp-content/uploads/2020/04/mecanique-engins-de-chantier-dep-2-cfpbj.jpg",
  // Mécanicien d’Engins de Chantier (2ème année)
  "mecanicien-engins-de-chantier-2eme-annee": "https://cfpbj.ca/wp-content/uploads/2020/04/mecanique-engins-de-chantier-dep-2-cfpbj.jpg",
  // Monteur en Réseaux Electriques
  "monteur-en-reseaux-electriques": "https://tpdemain.com/wp-content/uploads/2023/02/e82d30ae-adfd-4930-8970-a05947b032c5.jpeg",
  // Parcours Collégial Electricité de Bâtiment
  "parcours-collegial-electricite-batiment": "https://www.sef-formation.info/wp-content/uploads/sites/19/2018/04/EB.jpg",
  // Parcours Collégial Peintre
  "parcours-collegial-peintre": "https://www.cegep-rimouski.qc.ca/media/pages/programme/arts-visuels/625f615553-1698153088/510a0-1-1200x800-crop-q80.jpg",
  // Parcours Collégial Plombier de bâtiment
  "parcours-collegial-plombier-batiment": "https://formation.atelierdeschefs.fr/_next/image/?url=https%3A%2F%2Fadc-prod-images-marketing.s3.eu-west-1.amazonaws.com%2Fe0c977bl3nscppa8py2y.jpg&w=1920&q=80",
  // Parcours Collégial Pose de carrelage sol et mur
  "parcours-collegial-pose-carrelage": "https://cdn.chausson.fr/images/blog/terrasse/carrelage/pose-collee-2.jpg",
  // Parcours Collégial Tâcheron
  "parcours-collegial-tacheron": "https://parcoursdetudiants.ma/assets/img/upload/96bb3e7a657b1dfefde1ce9c9c9747c1.png",
  // Peinture Bâtiment
  "peinture-batiment": "https://www.samsic-emploi.fr/sites/samsic-emploi/files/styles/image_contenu/public/2025-05/Peintre%20en%20b%C3%A2timent.png?itok=FINTQc8F",
  // Plomberie Sanitaire
  "plomberie-sanitaire": "https://www.guide-artisan.fr/img/actualites/tout-savoir-sur-la-plomberie-sanitaire.jpg",
  // Pose de carrelage sol et mur
  "pose-de-carrelage-sol-et-mur": "https://www.espace-aubade.fr/uploads/blog/parts/630x410/20211004-joint-de-fractionnement-carrelage-2.jpg",
  // Programme d’Innovation Entrepreneuriale
  "programme-d-innovation-entrepreneuriale": "https://i.ytimg.com/vi/R6-yS4azaKA/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-BIAC4AOKAgwIABABGBMgPih_MA8=&rs=AOn4CLCBGFcpiSRqkny6JRXLS7Yk5cD3Yg",
  // Réalisation en Froid et Climatisation
  "realisation-en-froid-et-climatisation": "https://laconstruction.fr/app/uploads/2023/01/installateur_en_froid_et_conditionnement_d_air-2.png",
  // Réparation des engins à moteurs option Automobile
  "r-paration-des-engins-moteurs-option-automobile": "https://www.cours-gratuit.com/images/121/13067/id-13067-01.jpg",
  // Réparateur de Véhicules Automobiles
  "r-parateur-de-v-hicules-automobiles": "https://www.ecoledespros.fr/wp-content/uploads/sites/5/2022/03/edp-metier-devenir-electricien-de-maintenance-automobile-2.jpg",
  // Réparateur de véhicule automobile (MAALEM)
  "reparateur-de-vehicule-automobile-maalem": "https://isatfes.artisanat.gov.ma/wp-content/uploads/2023/02/diagnostic-750x420.jpg",
  // Service de Restauration ''Arts de table''
  "service-de-restauration-arts-de-table": "https://stelo-formation.fr/wp-content/uploads/2021/12/services-et-arts-de-la-table.jpg",
  // Technicien Spécialisé en Diagnostic et Electronique Embarquée
  "technicien-sp-cialis-en-diagnostic-et-electronique-embarqu-e": "https://www.cours-gratuit.com/images/121/13037/id-13037-01.jpg",
  // Technicien Spécialisé Génie civil
  "technicien-sp-cialis-g-nie-civil": "https://www.iptb.ma/wp-content/uploads/2019/10/batiment-iut-90-0048.png",
  // Tourisme
  "tourisme": "https://tourisme.excelia-group.fr/sites/tourism.excelia-group.fr/files/2025-06/metiers-specialises-tourisme.jpg",
  // Tourisme - Option Animation et Loisirs
  "tourisme-option-animation-et-loisirs": "https://tourisme.excelia-group.fr/sites/tourism.excelia-group.fr/files/2025-06/metiers-specialises-tourisme.jpg",
  // Tourisme - Option Agence de Voyages
  "tourisme-option-agence-de-voyages": "https://tourisme.excelia-group.fr/sites/tourism.excelia-group.fr/files/2025-06/metiers-specialises-tourisme.jpg",
  // Tourisme - Option Guidage
  "tourisme-option-guidage": "https://tourisme.excelia-group.fr/sites/tourism.excelia-group.fr/files/2025-06/metiers-specialises-tourisme.jpg",
  // TSH Gestion des Entreprises (Tronc commun)
  "tsh-gestion-des-entreprises-tronc-commun": "",
  // TSH Hôtellerie (Tronc commun)
  "tsh-hotellerie-tronc-commun": "",
  // TSH Informatique (Tronc commun)
  "tsh-informatique-tronc-commun": "",
  // TSH Tourisme (Tronc commun)
  "tsh-tourisme-tronc-commun": "",
  // Voirie
  "voirie": ""
};