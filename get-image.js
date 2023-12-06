 
const imageId = '7f360434-675f-4abb-8cca-1ca0bca6f1a6'; // <<< TODO: change this to image ID (the ID you got from previous request)
 
async function main() {
  try {
    const response = await fetch(`https://demo.imagineapi.dev/items/images/${imageId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer GiZRBf7SZji_BYCfqMZ7PpelUNejnafb', // <<<< TODO: remember to change this
        'Content-Type': 'application/json'
      }
    })
 
    const responseData = await response.json();
    console.log(responseData)
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}
 
main();
