<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/ae63adffc0.js" crossorigin="anonymous" defer></script>
    <script src="./assets/js/index.js" defer></script>
    <link rel="stylesheet" href="./assets/css/login.css">
    <title>Employee Management</title>
</head>

<body>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex align-items-center justify-content-center h-100">
                <div class="col-md-8 col-lg-7 col-xl-6">
                    <img src="./assets/images/draw2.svg" class="img-fluid" alt="Phone image">
                </div>
                <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form id="login" method="POST" action="">

                        <div class="text-center">
                            <img src="" style="width: 185px;" alt="logo">
                            <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                        </div>
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input type="email" id="email" name="email" class="form-control form-control-lg" />
                            <label class="form-label" for="email">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <input type="password" id="password" name="password" class="form-control form-control-lg" />
                            <label class="form-label" for="password">Password</label>
                        </div>

                        <!-- Submit button -->
                        <button id="submit" type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>

                        <div id="loginError" class="mt-3 alert alert-danger fade" vertical-center>
                            <span class="align-middle msg-login">Login Error</span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
</body>

</html>