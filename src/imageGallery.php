<?php
require_once('./library/avatarsApi.php');

define('PHOTOS_COL_MAX', 5);

$num = 0; //initialize
$profileImages = getProfileImages($num);

?>
<div class="col-9 hidden" id="galleryContainer">
    <div class="imageGallery__div" >
        <?php foreach ($profileImages as $profileImage) : ?>
                <div data-image class="d-block mb-4 h-100">
                    <img src=<?= $profileImage ?> class="img-fluid gallery__img rounded">
                </div>
        <?php endforeach; ?>
    </div>
</div>