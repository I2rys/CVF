//Dependencies
const Axios = require("axios")
const Chalk = require("chalk")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <cms> <output>")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

console.log("Finding vulnerabilities of cms, please wait.")
void async function Main(){
    var results = ""
    const response = await Axios({
        url: `http://www.exploitalert.com/api/search-exploit?name=${Self_Args[0]}`,
        method: "GET"
    })

    if(!response.data){
        console.log("The cms you specified does not have any vulnerabilities.")
        process.exit()
    }

    for( i in response.data ){
        results += `\n\nName: ${response.data[i].name}
ID: ${response.data[i].id}
Date: ${response.data[i].date}`

        console.log(Chalk.redBright(`
Name: ${response.data[i].name}
ID: ${response.data[i].id}
Date: ${response.data[i].date}`))
    }

    console.log(`
${response.data.length} vulnerabilities found in the cms you specified.`)
    console.log("Saving the results, please wait.")
    Fs.writeFileSync(Self_Args[1], results, "utf8")
    console.log(`Results has been saved to ${Self_Args[1]}`)
}()
