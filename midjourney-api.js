// using fetch — requires Node.js version 18 or higher
 
const data = {
    prompt: "a pretty lady at the beach --ar 9:21 --chaos 40 --stylize 1000"
};
 
// we wrap it in a main function here so we can use async/await inside of it.
async function main() {
 let promptResponseData;
    // generate the image
    try {
        const response = await fetch('https://demo.imagineapi.dev/items/images/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer gxile6VOoUtmCGtPrcgbHafpoJcMwsCr', // <<<< TODO: remember to change this
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
     
        promptResponseData = await response.json();
        console.log(promptResponseData);
 
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }

    / check if the image has finished generating
    // let's repeat this code every 5000 milliseconds (5 seconds, set at the bottom)
    const intervalId = setInterval(async function () {
        try {
          console.log('Checking image details');
          const response = await fetch(`https://demo.imagineapi.dev/items/images/${promptResponseData.data.id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer gxile6VOoUtmCGtPrcgbHafpoJcMwsCr', // <<<< TODO: remember to change this
                'Content-Type': 'application/json'
            }
          })
 
          const responseData = await response.json();
          if (responseData.data.status === 'completed' || responseData.data.status === 'failed') {
            // stop repeating
            clearInterval(intervalId);
            console.log('Completed image detials', responseData.data);
          } else {
            console.log("Image is not finished generation. Status: ", responseData.data.status)
          }
        } catch (error) {
          console.error('Error getting updates', error);
          throw error;
        }
    }, 5000 /* every 5 seconds */);
    // TODO: add a check to ensure this does not run indefinitely
}
 
main();
