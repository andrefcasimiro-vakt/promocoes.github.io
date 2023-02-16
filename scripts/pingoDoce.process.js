const fs = require('fs')

const tmpDir = 'scripts/tmp/'
const outputData = 'public/data/pingoDoce'

function prepareData() {
    const filePath = tmpDir + 'pingo_doce_unprocessed.json'
    if (!fs.existsSync(filePath)) {
        throw new Error('Could not find pingo_doce_unprocessed in tmp/ folder')
    }

    const allData = JSON.parse(fs.readFileSync(filePath))
    const extractedData = []
    
    for (const itemEntry of allData) {
        const item = itemEntry._source

        if (item) {
            extractedData.push({
                name: item.firstName,
                href: `https://mercadao.pt/store/pingo-doce/product/${item.slug}`,
                price: item.buyingPrice.toFixed(2) + "",
                image: `https://res.cloudinary.com/fonte-online/image/upload/c_fill,h_300,q_auto,w_300/v1/PDO_PROD/${item.sku}_1`,
                dateText: '',
                quantityInfo: '',
                merchant: 'pingodoce',
            })
        }
    }

    const sortedItems = extractedData.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
    })

    fs.writeFileSync(outputData + '/pingodoce_data.json', JSON.stringify(sortedItems))
}


prepareData()
