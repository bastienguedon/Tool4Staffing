$(document).ready(function () {
  let cars = [];
  let garages = [];

  function initData(callback) {
    $.when($.getJSON("/data/cars.json"), $.getJSON("/data/garages.json"))
      .done(function (carsData, garagesData) {
        cars = carsData[0]; // Stocker toutes les voitures
        garages = garagesData[0]; // Stocker tous les garages

        if (typeof callback === "function") {
          callback(); // Exécuter la suite une fois les données chargées
        }
      })
      .fail(function () {
        $(".dynamic-div").html("<p>Erreur lors du chargement des données.</p>");
      });
  }

  function formatYear(timestamp) {
    let date = new Date(timestamp * 1000); // Convertir en millisecondes
    return date.getFullYear(); // Extraire l'année
  }

  function getGarageName(garageId) {
    const client = document.cookie || "clienta";

    const clientGarage = garages.filter((car) => car.customer === client);
    const carGarage = clientGarage.find((garage) => garage.id === garageId);

    return carGarage ? carGarage.title : "Pas de garage";
  }

  function loadCarDetails(carId) {
    $(".dynamic-div").html("<p>Chargement...</p>");

    $(".dynamic-div").load(
      "edit.php?carId=" + carId,
      function (response, status) {
        if (status == "error") {
          $(".dynamic-div").html(
            "<p>Erreur lors du chargement des détails.</p>"
          );
        }
      }
    );
  }

  function createCard(client, car) {
    let carCard = "";
    switch (client) {
      case "clienta":
        const now = new Date().getFullYear();
        const carYear = formatYear(car.year);
        const carColor =
          now - carYear > 10 ? "red" : now - carYear < 2 ? "green" : "";
        carCard = `
        <div class="col-md-4">
            <div class="card shadow-sm mb-4" style="border-color: ${carColor}">
                <div class="card-body">
                    <h5 class="card-title" style="color: ${carColor}">${car.modelName}</h5>
                    <p class="card-text">
                        Marque : ${car.brand}<br>
                        Puissance : ${car.power}<br>
                        Année : ${carYear}
                    </p>
                    <button class="btn btn-primary view-car" data-id="${car.id}">
                        Voir le détail
                    </button>
                </div>
            </div>
        </div>`;
        break;
      case "clientb":
        carCard = `
        <div class="col-md-4">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h5 class="card-title">${car.modelName.toLowerCase()}</h5>
                    <p class="card-text">
                        Marque : ${car.brand}<br>
                        Garage : ${getGarageName(car.garageId)}
                    </p>
                    <button class="btn btn-primary view-car" data-id="${
                      car.id
                    }">
                        Voir le détail
                    </button>
                </div>
            </div>
        </div>`;
        break;
      default:
        carCard = `
        <div class="col-md-4">
            <div class="card shadow-sm mb-4" style="border-color: ${car.colorHex}">
                <div class="card-body">
                    <h5 class="card-title" style="color: ${car.colorHex}">${car.modelName}</h5>
                    <p class="card-text">
                        Marque : ${car.brand}<br>
                        Puissance : ${car.power}
                    </p>
                    <button class="btn btn-primary view-car" data-id="${car.id}">
                        Voir le détail
                    </button>
                </div>
            </div>
        </div>`;
        break;
    }
    $("#car-list").append(carCard);
  }

  function loadCars() {
    const client = document.cookie || "clienta";

    const clientCars = cars.filter((car) => car.customer === client);

    if (clientCars.length > 0) {
      const carsList =
        '<div class="container mt-4"><h2 class="text-center">Liste des voitures</h2><div class="row" id="car-list"></div></div>';
      $(".content").html(carsList);

      $("#car-list").empty();
      clientCars.forEach((car) => {
        createCard(client, car);
      });

      // Ajouter un événement au clic sur une voiture
      $(".view-car").click(function () {
        let carId = $(this).data("id");
        loadCarDetails(carId);
      });
    } else {
      $(".content").html("<p>Aucune voiture trouvée pour ce client.</p>");
    }
  }

  function loadGarageDetails(garageId) {
    $(".dynamic-div").html("<p>Chargement...</p>");

    $(".dynamic-div").load(
      "garage.php?garageId=" + garageId,
      function (response, status) {
        if (status == "error") {
          $(".dynamic-div").html(
            "<p>Erreur lors du chargement des détails.</p>"
          );
        }
      }
    );
  }

  function loadGarages() {
    const client = document.cookie || "clienta";

    const garageCars = garages.filter((car) => car.customer === client);

    if (garageCars.length > 0) {
      const garageList =
        '<div class="container mt-4"><h2 class="text-center">Liste des garages</h2><div class="row" id="garage-list"></div></div>';
      $(".content").html(garageList);
      garageCars.forEach((garage) => {
        garageCard = `
        <div>
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h5 class="card-title">${garage.title}</h5>
                    <button class="btn btn-primary view-garage" data-id="${garage.id}">
                        Voir le détail
                    </button>
                </div>
            </div>
        </div>`;
        $("#garage-list").append(garageCard);
      });

      $(".view-garage").click(function () {
        let garageId = $(this).data("id");
        loadGarageDetails(garageId);
      });
    } else {
      $(".content").html("<p>Aucun garage trouvé pour ce client.</p>");
    }
  }

  function loadClientContent(callback) {
    const client = document.cookie || "clienta";
    const module = $(".dynamic-div").data("module");
    const script = $(".dynamic-div").data("script");

    const filePath = `/customs/${client}/modules/${module}/${script}.php`;

    $(".dynamic-div").load(filePath, function (response, status) {
      if (status === "error") {
        $(".dynamic-div").html("<p>Erreur lors du chargement du fichier.</p>");
      }

      if (typeof callback === "function") {
        callback(); // Exécute la fonction après le chargement
      }
    });
  }

  function switchButton() {
    const client = document.cookie || "clienta";
    if (client === "clientb") {
      $(".dynamic-div").append(
        "<div class='d-flex gap-2'><button type='button' class='btn btn-warning' id='cars'>Voitures</button><button type='button' class='btn btn-secondary' id='garages'>Garages</button></div>"
      );

      $("#cars").click(function () {
        loadCars();
      });

      $("#garages").click(function () {
        loadGarages();
      });
    }
  }

  function loadAll() {
    loadClientContent(function () {
      switchButton();
      $(".dynamic-div").append("<div class='content'></div>");
      loadCars();
    });
  }

  window.loadAll = loadAll;
  initData(loadAll);

  $(".clients").change(function () {
    const newClient = $(".clients").find(":selected").val();
    document.cookie = newClient;
    loadAll(); // Recharger avec le nouveau client
  });
});
