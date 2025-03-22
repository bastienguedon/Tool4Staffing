<?php
if (isset($_GET['carId'])) {
    $carId = $_GET['carId'];
    $cars = json_decode(file_get_contents(__DIR__ . "/data/cars.json"), true);
    $garages = json_decode(file_get_contents(__DIR__ . "/data/garages.json"), true);

    $garageMap = [];
    foreach ($garages as $garage) {
        $garageMap[$garage["id"]] = $garage["title"];
    }

    $car = null;
    foreach ($cars as $c) {
        if ($c["id"] == $carId) {
            $car = $c;
            break;
        }
    }

    if ($car) {
        $garageName = $garageMap[$car["garageId"]] ?? "Garage inconnu";
        echo "<h2>Détails de la voiture</h2>";
        echo "<p><strong>Modèle :</strong> {$car['modelName']}</p>";
        echo "<p><strong>Marque :</strong> {$car['brand']}</p>";
        echo "<p><strong>Année :</strong> " . date("Y", $car['year']) . "</p>";
        echo "<p><strong>Puissance :</strong> {$car['power']} chevaux</p>";
        echo "<p><strong>Garage :</strong> {$garageName}</p>";
        echo "<p class='d-flex align-items-center gap-2'><strong>Couleur :</strong><span style='background-color: {$car['colorHex']}; width: 16px; height: 16px; border-radius: 50%;'></span></p>";
        echo "<button class='btn btn-secondary back-to-list'>Retour à la liste</button>";
        
    } else {
        echo "<p>Voiture introuvable.</p>";
    }
} else {
    echo "<p>Paramètre invalide.</p>";
}
?>

<script>
    $(".back-to-list").click(function (e) {
        e.preventDefault();
        $.getScript("index.js", function(a) {
            if (typeof window.loadAll === "function") {
                loadAll();
            } else {
                $.getScript("index.js", function() {
                    loadAll();
                });
            }
        });
    });
</script>
