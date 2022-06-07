<?php
require_once('./library/avatarsApi.php');

define('PHOTOS_COL_MAX', 5);

$num = 0; //initialize
$profileImages = getProfileImages($num);

?>
<div class="imageGallery__div">
    <?php foreach ($profileImages as $profileImage) : ?>
        <div>
            <div class="d-block mb-4 h-100">
                <img src=<?= $profileImage ?> class="img-fluid gallery__img rounded">
            </div>
        </div>
    <?php endforeach; ?>
</div>