const fs = require('fs')
const moment = require('moment')

const tmpDir = 'scripts/tmp/'
const outputData = 'public/data/lidl'

//const processedFilePath = '../public/lidl_data.json'

const getDataFromTodayOnly = () => {
    const lidlDataUnprocessedPath = tmpDir + 'lidl_data_unprocessed.json'
    if (!fs.existsSync(lidlDataUnprocessedPath)) {
        throw new Error('Could not find lidl_data_unprocessed in tmp/ folder')
    }


    const allData = JSON.parse(fs.readFileSync(lidlDataUnprocessedPath))

    const currentMoment = moment().utc()
    
    const itemsForToday = []

    allData.forEach(data => {
        // Normalize name
        data.name = data.name.normalize("NFD") // Remove accents -> Óculos becomes Oculos

        if (data.dateText && data.dateText.startsWith('a partir de')) { // Is a Begins At...
            const stringReversed = reverseString(data.dateText).replaceAll('.', '')

            const month = stringReversed[1] + stringReversed[0]
            const day = stringReversed[3] + stringReversed[2]

            const fromMoment = moment().utc().set('D', day).set('M', month - 1).hour(0).minute(0)

            if (currentMoment.isSameOrAfter(fromMoment)) {
                itemsForToday.push(data)
            }
        } else if (data.dateText.includes(' - ')) { // Is Range...

            const dateSplit = data.dateText.split(' - ')

            const startDate = dateSplit[0]
            const startDay = startDate[0]+startDate[1]
            const startMonth = startDate[3]+startDate[4]
            const endDate = dateSplit[1]
            const endDay = endDate[0]+endDate[1]
            const endMonth = endDate[3]+endDate[4]

            const fromMoment = moment().utc().set('D', startDay).set('M', startMonth - 1).hour(0).minute(0)

            if (startDay == 16) {
                console.log('fromMoment: ', fromMoment)
            }

            const toMoment = moment().utc().set('D', endDay).set('M', endMonth - 1).hour(0).minute(0)

            if (currentMoment.isSameOrAfter(fromMoment) && currentMoment.isSameOrBefore(toMoment)) {
                itemsForToday.push(data)
            }
        }
    })



    return itemsForToday
}


function reverseString(str) {
    // return a new array of strings
    const arrayStrings = str.split("");
   
    // reverse the new created array elements
    const reverseArray = arrayStrings.reverse();
 
    // join all elements of the array into a string
    const joinArray = reverseArray.join("");
    
    // return the reversed string
    return joinArray;
}

function prepareData() {
    const itemsForToday = getDataFromTodayOnly()

    const sortedItems = itemsForToday.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
    })
    
    // Remove all files from data/lidl first
    var allFilesInLidlFolder = fs.readdirSync(outputData)
    console.log(allFilesInLidlFolder)
    for (const filePath of allFilesInLidlFolder) {
        fs.rmSync(outputData + '/' + filePath)
    }

    fs.writeFileSync(outputData + '/lidl_data.json', JSON.stringify(
        sortedItems.filter((item, index) => { // Remove duplicates by name
            if (sortedItems.findIndex(i => i.name === item.name) === index) {
                return true
            }

            return false
        })
    ))
}


prepareData()
