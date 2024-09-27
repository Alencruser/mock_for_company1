## Retouches specs

-   Sur la partie API, il manque le call api qui assigne un enfant a une crèche.
-   Au niveau des routes api, il serait peut-être mieux de renommer les route children en lien avec les child-care avec un nommage un peu plus REST, exemple : /children/:id/children --> /children?byChildCare=id cela permet de conserver la racine du Controller qui jongle déjà entre child et children.
-   Sur la partie frontend, sur le listing des enfants, préciser si la création de l'enfant assigne directement sur la crèche que l'on visualise ou alors si on crée un enfant qui est simplement assigne au parent, et dans ce cas, au même titre que la route API manquante, rajouter une possibilité d'assigner un enfant a une crèche.
-   Export des données : pour l'export des enfants en base de données entière, faut-il que ce soit tous les enfants de la base ou simplement ceux assignes dans des crèches ? (Car on peut créer un enfant sans qu'il soit dans une crèche actuellement selon les specs).

## Choix techniques

-   Au niveau de conception de base j'ai choisis mysql, et ai décidé de respecter les pratiques merise en créant une table d'association entre les child et child_care
-   Au niveau du code serveur, cela implique que je n'ai pas utilise les decorateurs existants NestJs que sont @ManyToMany ou @OneToMany , en étant conscient que cela me bloque certaines possibilités intégrés dans TypeOrm (par exemple la suppression en cascade qui serait efficace dans ce test) mais j'ai pris le choix de préserver la fiabilité des données.
-   Au niveau du code serveur, sur les Controller, il faudrait pour une meilleur maintenance profiter pleinement du décorateur @Controller et trouver des routes qui peuvent être harmonisé.
-   Au niveau du frontend, je n'avais jamais fait de VUE, j'ai donc pris le parti de monter mes compétences sur la façon de créer des composants réutilisables et quand possible, génériques, afin qu'ils puissent être appelés par différentes vue, en revanche le Typescript n'est pas finalisé bien qu'il soit initie en partie.

## Fonctionnalités manquantes

Je pense ne pas avoir besoin de parler de la suppression d'une crèche ainsi que de la création car le reste du code montre la direction que je prenais pour mener a bien ces fonctionnalités, en revanche :

-   Export : Bien que je n'ai pas eu le temps de mettre en place cette fonctionnalité intéressante, voici comment j'aurais procéder :
    -   Utilisation d'une lib qui transforme mes data en csv rapidement (ou selon le temps restant, formatage des donnes avec une fonction générique qui permet selon un headers d'y placer les data)
    -   Utilisation de la fonction streaming disponible dans filesystem(fs) (createReadStream)
    -   Utilisation du header de réponse en octet-stream
    -   On utilise StreamableFile qui est disponible dans NestJs
    -   Cote front, on précise bien une réponse attendu en format : blob
-   Envoi de mail après suppression en cascade suite a la suppression d'une crèche
    -   Avec la façon de faire actuelle, je récupère tous les enfants qui étaient assignes a la crèche supprimée pour remonter le réfèrent (bien sur je ne vais chercher que le réfèrent, en distinct, le nom et le prénom de l'enfant n'ont pas d'utilité ici)
    -   Je filtre mes résultats pour sortir le username de la personne qui vient d'effectuer la requête (x-auth) car a ce moment du workflow, si il est ici c'est qu'il a le droit de supprimer la crèche car c'est le créateur, donc qu'il ne veut pas recevoir le mail
    -   Je vais chercher les mails des user grâce aux usernames restants
    -   J'utilise NestJs/bullmq pour pouvoir créer des "queue"
    -   Je crée un "worker" qui recevra un tableau et va executer la fonction donnée dans les specs
    -   Apres le resolve de la promesse qui console log seulement (attendu par un await), alors mon job progress
    -   Au niveau de mon tableau de resultats d'user, j'appelle ce worker et j'ajoute a sa queue a chaque fois des appels contenant 3 mails maximum a l'aide d'un slice qui prendra i, i+3 (vulgairement)

Au niveau du worker, je n'ai jamais utilise celui de NestJs, je me suis basé sur la doc pour expliquer mon implémentation
