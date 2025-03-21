<?php
if (isset($_GET['garageId'])) {
    $garageId = $_GET['garageId'];
    $garages = json_decode(file_get_contents(__DIR__ . "/data/garages.json"), true);


    $garage = null;
    foreach ($garages as $g) {
        if ($g["id"] == $garageId) {
            $garage = $g;
            break;
        }
    }

    if ($garage) {
        echo "<h2>Détails du garage</h2>";
        echo "<p><strong>Nom :</strong> {$garage['title']}</p>";
        echo "<p><strong>Adresse :</strong> {$garage['address']} </p>";
        echo "<p><a href='#' class='back-to-list'>🔙 Retour à la liste</a></p>";
    } else {
        echo "<p>Garage introuvable.</p>";
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
