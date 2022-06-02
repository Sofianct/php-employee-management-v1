<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/ae63adffc0.js" crossorigin="anonymous" defer></script>
  <script src="../assets/js/index.js" defer></script>
  <link rel="stylesheet" href="../assets/css/main.css">
  <title>Employee Management</title>
</head>

<body>
  <header>
    <?php include_once("../assets/html/header.html"); ?>
  </header>
  <main>
    <?php

    //Header
    require_once("./library/employeeManager.php");

    //first of all call checksession 


    //get employees
    $employees = json_decode(file_get_contents(dirname(__DIR__) . './resources/employees.json'), true);


    ?>

    <table class="table align-middle mb-0 bg-white text-center">
      <thead class="bg-light">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Street no</th>
          <th>City</th>
          <th>State</th>
          <th>Postal Code</th>
          <th>Phone Number</th>
          <th><a href="#" class="link-dark "><i class="fa-solid fa-plus"></i></a></th>
        </tr>
      </thead>
      <tbody>

        <?php foreach ($employees as $person) : ?>

          <tr id="row<?= $person['id'] ?>">
            <td>
              <!-- add image -->
              <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style="width: 45px; height: 45px" class="rounded-circle" />
            </td>
            <!-- name -->
            <td data-td><?= $person['name'] ?></td>
            <!-- Email -->
            <td data-td><?= $person['email'] ?></td>
            <!-- Age -->
            <td data-td><?= $person['age'] ?></td>
            <!-- Street no -->
            <td data-td><?= $person['streetAddress'] ?></td>
            <!-- City -->
            <td data-td><?= $person['city'] ?></td>
            <!-- State -->
            <td data-td><?= $person['state'] ?></td>
            <!-- Postal Code -->
            <td data-td><?= $person['postalCode'] ?></td>
            <!-- Phone number -->
            <td data-td><?= $person['phoneNumber'] ?></td>
            <!-- Buttons -->
            <td>
              <button data-id="<?= $person['id'] ?>" data-edit class="btn"><i class="fa-solid fa-pen-to-square link-dark p-2"></i></button>
              <button data-id="<?= $person['id'] ?>" data-delete class="btn"><i class="fa-solid fa-trash-can link-dark"></i></button>
            </td>
          </tr>

        <?php endforeach; ?>

      </tbody>
    </table>

  </main>
  <footer>
    <?php include_once("../assets/html/footer.html"); ?>
  </footer>

</body>

</html>