<?php

require_once('./library/sessionHelper.php');


?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://kit.fontawesome.com/ae63adffc0.js" crossorigin="anonymous" defer></script>
  <script src="../assets/js/index.js" defer></script>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

  <link rel="stylesheet" href="../assets/css/main.css">
  <title>Employee Management</title>
</head>

<body>
  <header>
    <?php include_once("../assets/html/header.html"); ?>
  </header>

  <main>
    <table class="table align-middle mb-0 bg-white text-center">
      <thead class="bg-light">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Street no</th>
          <th>City</th>
          <th>State</th>
          <th>Postal Code</th>
          <th>Phone Number</th>
          <th><button class="newEmployee__button" id="newEmployee"><i class="fa-solid fa-plus"></i></button></th>
        </tr>
      </thead>
      <tbody id="tbody">
        <!-- inject employees -->
      </tbody>
    </table>

    <!-- Modal Delete Employee -->
    <div class="modal fade" id="deleteEmployee" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-confirm modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header flex-column">
            <h5 class="modal-title" id="exampleModalLongTitle">Delete Employee</h5>
          </div>
          <div class="modal-body">
            <p>Are you sure to remove this employee? This process cannot be undone.</p>
            <!-- <input type="hidden" id="idEmployee" value=""> -->
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-dark" data-dismiss="modal">Cancel</button>
            <!-- <button id="deleteBtnModal" type="button" class="btn btn-danger" data-dismiss="modal">Delete</button> -->
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Try -->
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <div class="modal-header flex-column">
            <div class="icon-box">
              <i class="material-icons">&#xE5CD;</i>
            </div>
            <h4 class="modal-title w-100">Are you sure?</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <p>Do you really want to delete these employee? This process cannot be undone.</p>
            <input type="hidden" id="idEmployee" value="">
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button id="deleteBtnModal" type="button" class="btn btn-danger" data-dismiss="modal">Delete</button>
          </div>
        </div>
      </div>
    </div>

  </main>
  <footer>
    <?php include_once("../assets/html/footer.html"); ?>
  </footer>

</body>

</html>