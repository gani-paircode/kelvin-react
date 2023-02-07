export function getRandomId() {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const uniqid = randLetter + Date.now();
    return uniqid;
}

export function getCityWiseCount(employees) {
    let city = '';
    const temp = {};
    for(let i = 0; i < employees.length; i++) {
        city = employees[i].city;
        temp[city] ? temp[city]++ : (temp[city] = 1);
    }
    
    const response = [];
    for (const key in temp) {
        response.push({
            city: key,
            count: temp[key]
        });
    }
    console.log('inside getCityWiseCount : ', temp, response);;
    return response;
}