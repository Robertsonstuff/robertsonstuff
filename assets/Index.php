<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple PHP App</title>
</head>
<body>
    <h1>Simple PHP App</h1>

    <?php
    // SQLite database connection
    $db = new SQLite3('data.db');

    // Create table if not exists
    $db->exec('
        CREATE TABLE IF NOT EXISTS inputs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            input1 TEXT,
            input2 TEXT,
            input3 TEXT,
            input4 TEXT
        )
    ');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle form submission
        $input1 = $_POST['input1'];
        $input2 = $_POST['input2'];
        $input3 = $_POST['input3'];
        $input4 = $_POST['input4'];

        // Insert data into the database
        $db->exec("INSERT INTO inputs (input1, input2, input3, input4) VALUES ('$input1', '$input2', '$input3', '$input4')");
    }
    ?>

    <form action="" method="post">
        <label for="input1">Input 1:</label>
        <input type="text" name="input1" required><br>

        <label for="input2">Input 2:</label>
        <input type="text" name="input2" required><br>

        <label for="input3">Input 3:</label>
        <input type="text" name="input3" required><br>

        <label for="input4">Input 4:</label>
        <input type="text" name="input4" required><br>

        <button type="submit">Save</button>
    </form>
</body>
</html>
