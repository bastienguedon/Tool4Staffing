<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="index.js"></script>
    <title>Tool4cars</title>
</head>
<body>
    <h1 class="text-center">Mon entreprise automobile</h1>
    <h2 class="text-center">Sélectionner un client</h2>
    <div class="d-flex justify-content-center">
        <select class="form-select w-50 clients" name="clients">
            <option value="clienta">Client A</option>
            <option value="clientb">Client B</option>
            <option value="clientc">Client C</option>
        </select>
    </div>
    <div class="dynamic-div mt-4 d-flex justify-content-center align-items-center flex-column" data-module="cars" data-script="ajax"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
