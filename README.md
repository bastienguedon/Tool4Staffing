# Exercice d'évaluation Tool4Staffing

## Réalisé par Bastien Guédon

### Pour lancer le server :

- php -S localhost:8000

### Étape 6

Objectif: Sécuriser les données

En interne, on vous demande de trouver une solution pour sécuriser les données des clients.
Lister les potentiels problèmes et proposer une ou plusieurs solutions techniques le cas échéant.

#### Réponse

Problèmes actuels liés aux données client :

- Les utilisateurs ont accès à toutes les données, pas de cloisonnement
- Les données des cars et garages sont disponibles en local, depuis le frontend, et en clair

Solutions :

- Mettre en place une authentification, avec un identifiant et mot de passe pour chaque client, à minima, afin de pouvoir l'identifier clairement, et si possible une gestion des sessions via un système de token par exemple
- Stocker les données en base sur un serveur sécurisé
- Chiffrer les données sensibles en base (mot de passe...)
- Mettre une place une liaison sécurisée en HTTPS
- Retourner uniquement les données qui appartiennent au client connecté
