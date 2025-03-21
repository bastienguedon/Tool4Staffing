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

  function loadCars() {
    const client = document.cookie || "clienta";

    const clientCars = cars.filter((car) => car.customer === client);

    if (clientCars.length > 0) {
      let carList = "<h2>Liste des voitures</h2><ul>";
      clientCars.forEach((car) => {
        switch (car.customer) {
          case "clienta":
            carList += `<li class="car-item" data-id="${
              car.id
            }" style="cursor: pointer;" >${car.modelName} ${
              car.brand
            } ${formatYear(car.year)} ${car.power}</li>`;
            break;
          case "clientb":
            carList += `<li class="car-item" data-id="${
              car.id
            }" style="cursor: pointer;">${car.modelName.toLowerCase()} ${
              car.brand
            } ${getGarageName(car.garageId)}</li>`;
            break;
          default:
            carList += `<li class="car-item" data-id="${car.id}" style="color: ${car.colorHex}; cursor: pointer;">${car.modelName} ${car.brand}</li>`;
            break;
        }
      });
      carList += "</ul>";
      $(".content").html(carList);

      // Ajouter un événement au clic sur une voiture
      $(".car-item").click(function () {
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
      let garageList = "<h2>Liste des garages</h2><ul>";
      garageCars.forEach((garage) => {
        garageList += `<li class="garage-item" data-id="${garage.id}" style="cursor: pointer;" >${garage.title}</li>`;
      });
      garageList += "</ul>";
      $(".content").html(garageList);

      $(".garage-item").click(function () {
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
        "<div><button type='button' id='cars'>Voitures</button><button type='button' id='garages'>Garages</button></div>"
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

  $(".clients").click(function () {
    const newClient = $(".clients").find(":selected").val();
    document.cookie = newClient;
    loadAll(); // Recharger avec le nouveau client
  });
});
