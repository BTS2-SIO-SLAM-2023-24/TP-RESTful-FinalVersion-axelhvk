document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre API


    // Formulaire pour créer un employé
    const employeForm = document.getElementById('employeForm');
    employeForm.addEventListener('submit', (e) => {
        e.preventDefault();


        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const dateNaissance = document.getElementById('dateNaissance').value;
        const animalId = document.getElementById('animalId').value;


        createEmploye(nom, prenom, dateNaissance, animalId);
    });


    // Fonction pour créer un employé
    function createEmploye(nom, prenom, dateNaissance, animalId) {
        const data = {
            nom: nom,
            prenom: prenom,
            dateNaissance: dateNaissance,
            animalId: animalId
        };


        fetch(`${API_BASE_URL}/employes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                employeForm.reset(); // Réinitialiser le formulaire
                fetchEmployes(); // Mettre à jour la liste des employés après la création
            } else {
                console.error('Erreur lors de la création de l\'employé');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la création de l\'employé :', error);
        });
    }


    // Fonction pour supprimer un employé
    function deleteEmploye(employeId) {
        fetch(`${API_BASE_URL}/employes/${employeId}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                fetchEmployes(); // Mettre à jour la liste des employés après la suppression
            } else {
                console.error('Erreur lors de la suppression de l\'employé');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la suppression de l\'employé :', error);
        });
    }


    // Fonction pour récupérer la liste des employés depuis l'API
    function fetchEmployes() {
        fetch(`${API_BASE_URL}/employes`)
            .then((response) => response.json())
            .then((data) => {
                const employeList = document.getElementById('employeList');
                employeList.innerHTML = ''; // Effacez la liste précédente


                data.employes.forEach((employe) => {
                    const li = document.createElement('li');
                    li.innerHTML = `Id: ${employe._id}, Nom: ${employe.nom}, Prénom: ${employe.prenom}, Date de Naissance: ${employe.dateNaissance}`;


                    // Bouton pour supprimer l'employé
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Supprimer';
                    deleteButton.addEventListener('click', () => deleteEmploye(employe._id));
                    li.appendChild(deleteButton);


                    employeList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de la liste des employés :', error);
            });
    }


    // Appeler fetchEmployes au chargement de la page
    fetchEmployes();
});


// Récupération du formulaire
const employeForm = document.getElementById("employeForm");

// Récupération du bouton de soumission
const submitButton = employeForm.querySelector("button[type='submit']");

// Ajout d'une animation lors de la soumission du formulaire
employeForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêcher la soumission du formulaire pour l'exemple
    submitButton.classList.add("submitted");
    setTimeout(() => {
        submitButton.classList.remove("submitted");
    }, 2000);
});

// -------------------



// Récupération du bouton "Créer un employé"
const createEmployeeButton = document.querySelector("button[type='submit']");

// Gestion du défilement en douceur
createEmployeeButton.addEventListener("click", function (e) {
    e.preventDefault();
    const form = document.getElementById("employeForm");
    form.scrollIntoView({ behavior: "smooth" });
});



// Effet de changement de couleur au survol des étiquettes
const labels = document.querySelectorAll('label');

labels.forEach(label => {
    label.addEventListener('mouseover', function () {
        label.style.color = 'blue'; // Changer la couleur au survol
    });

    label.addEventListener('mouseout', function () {
        label.style.color = 'black'; // Rétablir la couleur par défaut
    });
});



// Effet de survol sur le bouton

createEmployeeButton.addEventListener('mouseover', function () {
    createEmployeeButton.style.backgroundColor = '#0056b3'; // Changer la couleur au survol
    createEmployeeButton.style.transform = 'scale(1.05)'; // Agrandir légèrement
});

createEmployeeButton.addEventListener('mouseout', function () {
    createEmployeeButton.style.backgroundColor = '#002348'; // Rétablir la couleur par défaut
    createEmployeeButton.style.transform = 'scale(1)'; // Retour à la taille d'origine
});



// Effet de mise en évidence des champs de texte au focus
const inputFields = document.querySelectorAll('input[type="text"], input[type="date"]');

inputFields.forEach(inputField => {
    inputField.addEventListener('focus', function () {
        inputField.style.border = '2px solid #0056b3'; // Encadrer en bleu au focus
    });

    inputField.addEventListener('blur', function () {
        inputField.style.border = '2px solid #ccc'; // Rétablir le cadre par défaut
    });
});



const nomField = document.getElementById("nom");
const iconValidation = nomField.nextElementSibling;

nomField.addEventListener("input", function () {
    if (/^[A-Za-z\s-]+$/.test(nomField.value)) {
        iconValidation.textContent = "✔️";
        iconValidation.style.color = "green";
    } else {
        iconValidation.textContent = "❌";
        iconValidation.style.color = "red";
    }
});

const prenomField = document.getElementById("prenom");
const iconValidationPrenom = prenomField.nextElementSibling;

prenomField.addEventListener("input", function () {
    if (/^[A-Za-z\s-]+$/.test(prenomField.value)) {
        iconValidationPrenom.textContent = "✔️";
        iconValidationPrenom.style.color = "green";
    } else {
        iconValidationPrenom.textContent = "❌";
        iconValidationPrenom.style.color = "red";
    }
});



employeForm.addEventListener("mouseover", function () {
    employeForm.style.transform = "scale(1.003)"; // Zoom léger au survol
});

employeForm.addEventListener("mouseout", function () {
    employeForm.style.transform = "scale(1)"; // Retour à la taille d'origine en quittant le survol
});




employeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomField = document.getElementById("nom");
    const prenomField = document.getElementById("prenom");
    const nom = nomField.value;
    const prenom = prenomField.value;

    if (nom.trim() === "") {
        alert("Le champ 'Nom' est manquant. Veuillez le remplir.");
        nomField.classList.add("missing-field");
    } else {
        nomField.classList.remove("missing-field");
    }

    if (prenom.trim() === "") {
        alert("Le champ 'Prénom' est manquant. Veuillez le remplir.");
        prenomField.classList.add("missing-field");
    } else {
        prenomField.classList.remove("missing-field");
    }
});



