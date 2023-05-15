const rates ={}
const usdEl = document.querySelector('[data-value="USD"]')
const eurEl = document.querySelector('[data-value="EUR"]')
const tjsEl = document.querySelector('[data-value="TJS"]')


const inp = document.querySelector('#input')
const res = document.querySelector('#resalt')
const selec = document.querySelector('#select2')



async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await response.json()
    const result =  await data
    // console.log(result);
    // console.log(result.Valute.USD.Value);
    rates.USD = result.Valute.USD
    rates.EUR = result.Valute.EUR
    rates.TJS = result.Valute.TJS
    console.log(rates); //object
    console.log(result);
    usdEl.textContent = rates.USD.Value.toFixed(2)
    eurEl.textContent = rates.EUR.Value.toFixed(2)
    tjsEl.textContent = rates.TJS.Value.toFixed(2)

//rangho baroi pastu baland shavii kurs
    if(rates.USD.Value > rates.USD.Previous){
        usdEl.classList.add('top')
    }
    else{
        usdEl.classList.add('bottom')
    }

    if(rates.EUR.Value > rates.EUR.Previous){
        eurEl.classList.add('top')
    }
    else{
        eurEl.classList.add('bottom')
    }
    
    if(rates.TJS.Value > rates.TJS.Previous){
        tjsEl.classList.add('top')
    }
    else{
        tjsEl.classList.add('bottom')
    }
}
getCurrencies()
setInterval(getCurrencies,10000)

inp.oninput = convertValue

selec.oninput = convertValue




function convertValue() {
    res.value = (parseFloat(inp.value)/rates[selec.value].Value).toFixed(2)
}