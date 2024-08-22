import inquirer from 'inquirer';




let apiLink="https://v6.exchangerate-api.com/v6/310420532b9cc6b472bc8bc4/latest/PKR";

let fetchData=async (data:any)=>{
        let fetchdata=await fetch(data);
        let res=await fetchdata.json();
        return res.conversion_rates;
}

let data= await fetchData(apiLink);
let countries=Object.keys(data)

let firstCountry= await inquirer.prompt({
    type:'list',
    name:'name',
    message:"Converting From!",
    choices:countries,
})
let userMoney=await inquirer.prompt({
    type:"number",
    name:"paisa",
    message:`Enter your amount in ${firstCountry.name} `
})

let secondCountry=await inquirer.prompt({
    type:'list',
    name:'name',
    message:"Converting To",
    choices:countries
})

// conversion rate
let cnv=`https://v6.exchangerate-api.com/v6/310420532b9cc6b472bc8bc4/pair/${firstCountry.name}/${secondCountry.name}`;


//fetching data for conversion rate

let cnvData=async (data:any)=>{

    let cnvData=await fetch(data);
    let res=await cnvData.json();
    return res.conversion_rate;

}

let conversion_Rates=await cnvData(cnv);
console.log(conversion_Rates)

let convertedRate= userMoney.paisa * conversion_Rates;
console.log(`Your ${firstCountry.name} in ${secondCountry.name} is ${convertedRate}`)
