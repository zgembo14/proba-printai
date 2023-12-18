<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect value of input field
    $prompt = $_POST['prompt'];
    if (!empty($prompt)) {
        $data = [
            'prompt' => $prompt
        ];
    }
}

$url = 'https://demo.imagineapi.dev/items/images/';

$headers = [
    "Authorization: Bearer 1Lg4eyoKsEwjDNmenB4dNRRgIW1dbTIG", # <<<< TODO change the API key here
    "Content-Type: application/json"
];


$options = [
    'http' => [
        'method' => 'POST',
        'header' => join("\r\n", $headers),
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
$responseData = json_decode($response, true);

$imageId = $responseData['data']['id'] ?? null;

$url = 'https://demo.imagineapi.dev/items/images/' . $imageId;
$headers = [
    "Authorization: Bearer 1Lg4eyoKsEwjDNmenB4dNRRgIW1dbTIG", # <<<< TODO change the API key here
];


$options = [
    'http' => [
        'method' => 'GET',
        'header' => join("\r\n", $headers)
    ]
];

if ($imageId) {
    // Wait for 30 seconds
    sleep(30);

    $url = 'https://demo.imagineapi.dev/items/images/' . $imageId;

    $context = stream_context_create($options);
    $getResponse = file_get_contents($url, false, $context);
    $getResponseData = json_decode($getResponse, true);

    if (isset($getResponseData['data']) && isset($getResponseData['data']['url'])) {
        $imageUrl = $getResponseData['data']['url'];
        $imageUp = $getResponseData['data']['upscaled_urls'];

        //echo "<img src='" . htmlspecialchars($imageUrl) . "' alt='Generated Image'><br>";

        foreach ($imageUp as $up) {
            echo "<img src='" . htmlspecialchars($up) . "' alt='Upscaled Image'><br>";
        }
    } else {
        echo "No image URL found in the response.";
    }
} else {
    echo "No image ID found in the POST response.";
}

?>