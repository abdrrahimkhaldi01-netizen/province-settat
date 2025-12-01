
from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI
import os
from dotenv import load_dotenv

# Charger la clé API depuis .env
load_dotenv()

app = Flask(__name__)

# Initialiser le client OpenAI avec la clé depuis .env
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def index():
    # Sert le fichier index.html situé dans le même dossier
    return send_from_directory(os.getcwd(), "index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = (data.get("message") or "").strip()

    if not user_message:
        return jsonify({"reply": "⚠️ Merci d'écrire un message avant d'envoyer."})

    try:
        completion = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Tu es un assistant virtuel de l'OFPPT, "
                        "spécialisé dans la province de Settat. "
                        "Tu réponds uniquement aux questions sur les formations, "
                        "filières, établissements et orientation."
                    ),
                },
                {"role": "user", "content": user_message},
            ],
        )
        reply = completion.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        print("Erreur OpenAI:", e)
        return jsonify({"reply": "❌ Erreur serveur : vérifie ta clé API dans le fichier .env."})

if __name__ == "__main__":
    app.run(debug=True)
