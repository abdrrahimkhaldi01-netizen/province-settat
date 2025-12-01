
Chatbot IA - OFPPT Province de Settat (Gemini gratuit)

Ce projet utilise l'IA Google Gemini (modèle gemini-1.5-flash-latest) pour répondre
aux questions liées à l'OFPPT dans la province de Settat.

Aucune installation de serveur n'est nécessaire : tout fonctionne dans le navigateur.

-------------------------------------------
1. FICHIERS
-------------------------------------------
- index.html : interface + code JavaScript + appel à l'API Gemini

-------------------------------------------
2. CRÉER UNE CLÉ API GEMINI (GRATUITE)
-------------------------------------------
1) Ouvrez : https://aistudio.google.com/app/apikey
2) Connectez-vous avec votre compte Google.
3) Cliquez sur "Create API key" ou "New API key".
4) Choisissez "Create API key in new project".
5) Une clé est générée (commence souvent par AI...).
6) Copiez cette clé et gardez-la secrète.

-------------------------------------------
3. UTILISATION DU CHATBOT
-------------------------------------------
1) Décompressez le ZIP dans un dossier.
2) Ouvrez le fichier index.html dans votre navigateur (double-clic).
3) En haut de la page, collez votre clé API Gemini dans le champ prévu.
4) Cliquez sur le bouton "💬 Assistant OFPPT".
5) Posez vos questions (ex : "Quelles filières technicien spécialisé à Settat ?").

L'IA répondra en se limitant au contexte OFPPT province de Settat.

-------------------------------------------
4. LIMITES ET SÉCURITÉ
-------------------------------------------
- Cette méthode appelle directement l'API Gemini depuis le navigateur.
  Elle est adaptée aux tests en local, mais PAS à un déploiement public.
- Ne mettez pas index.html avec votre clé en ligne sur un serveur accessible à tous.
- Pour un site en production, il faudra un backend (Python, Node...) pour cacher la clé.

-------------------------------------------
5. PERSONNALISATION
-------------------------------------------
Vous pouvez modifier le texte de l'instruction système dans index.html
(variable systemInstruction) pour adapter les réponses à vos besoins.
