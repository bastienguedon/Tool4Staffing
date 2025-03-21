<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="index.js"></script>
    <title>Tool4cars</title>
</head>
<body>
    <h1>Sélectionner un client</h1>
    <select class="clients" name="clients">
        <option value="clienta">Client A</option>
        <option value="clientb">Client B</option>
        <option value="clientc">Client C</option>
    </select>

    <div class="dynamic-div" data-module="cars" data-script="ajax"></div>
</body>
</html>
