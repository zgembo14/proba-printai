// using fetch — requires Node.js version 18 or higher
 
const data = {
    prompt: "a pretty lady at the beach --ar 9:21 --chaos 40 --stylize 1000"
};
 
// we wrap it in a main function here so we can use async/await inside of it.
async function main() {
    try {
        const response = await fetch('https://demo.imagineapi.dev/items/images/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer nvL5YA1DZWYK1wCCLJE5d68osxFJqtXh', // <<<< TODO: remember to change this
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
 
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}
 
main();
