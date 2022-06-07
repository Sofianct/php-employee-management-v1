<?php

//function to curl in php
function curlQuery($url, $headers)
{

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_HEADER => false,
        CURLOPT_RETURNTRANSFER => true
    ]);

    $response = curl_exec($ch);

    if ($response === false) {
        $error = curl_error($ch);
        return $error;
    } else {
        curl_close($ch);
        return json_decode($response, true);
    }
    
}

//get profile images url
function getProfileImages($number)
{
    $headers = array(
        "Accept:application/json",
    );

    $start = $number;
    $end = intval($number) + 10;

    if ($end <= 83) { //83 images in db.json
        $url = "http://localhost:3000/users?_start=" . $start . "&_end=" . $end;
        $items = curlQuery($url, $headers);
        $images = []; //initialize array images;
        foreach ($items as $item) {
            array_push($images, $item["photo"]);
        }
        return $images;
    }
}


