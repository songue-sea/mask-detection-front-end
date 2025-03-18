Voici la partie front-end avec le framework React , pour l'installer correctement veuillez  importer le projet  et suivre  les étapes : 
1. Créer un dossier vide et cloner le projet
2. Installer les dépendances avec "npm install" (vous devez être dans le même répertoire que  le dossier node_modules) 
3. Démarrer l'application avec "npm start"
4. Parallèlement démarrer la partie back-end fait en flask via le dépot https://github.com/songue-sea/mask-detection

Explications Générales:

Nous avons déployé un modèle de classification qui permet de détecter le port de masque. Le modèle est capable de prédire si une personne porte un masque ou non.
L'entraînement a été fait sous kaggle , vous trouverez le modèle lui même sauvegardé dans le dépot (qui est le back-end sous flask) "https://github.com/songue-sea/mask-detection".

Explication des fonctionnalités:

La partie front-end de l'application a été fait exclusivement en react. Elle recouvre les fonctionnalités :
-d'Authentification : permet à un utilisateur légitime de se connecter 

-Création de Compte : permet à un utilisateur de créer un compte dans l'application  

-Prédiction : l'utilisateur soumet un image et le modèle effectue la prédiction (seules les extensions png , jpg , jpeg sont autorisées) 

-Génération d'image adverse : l'utilisateur soumet un image de son choix , précise les paramètres (label , epsilon)  (le label doit être celui qui est attendu (0 = avec masque ; 1 = sans masque ) 

-Tester un modèle robuste : on a intégré des fonctionnalités de défense , l'utilisateur peut tester les images adverses générés sur ce modèle pour l'évaluer.

NB: En cas d'erreur ou de soucis , veuillez me contacter via l'adresse email "ismailasanguesow@esp.sn" 

