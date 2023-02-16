
const { get } = require('request-promise')
const fs = require('fs')

const outputDir = './scripts/tmp/'

const TIME_BETWEEN_REQUESTS = 10000
const MAX_ITEMS_PER_REQUEST = 100

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchItems = async (from = 0, to = MAX_ITEMS_PER_REQUEST) => {
    try {
        console.log('From: ', from)
        await timeout(TIME_BETWEEN_REQUESTS)

        const fetchProms = await get(
        `https://mercadao.pt/api/catalogues/6107d28d72939a003ff6bf51/products/search?query=%5B%5D&sort=%7B%22activePromotion%22:%22desc%22%7D&from=${from}&size=${to}&esPreference=0.9387125693742042`, {
            headers: {
                'User-Agent': 'Request-Promise' 
            },
        }).json()

        const items = fetchProms.sections.null.products

        if (items.length < MAX_ITEMS_PER_REQUEST) {
            return items
        }

       return [...items, fetchItems(from + MAX_ITEMS_PER_REQUEST, MAX_ITEMS_PER_REQUEST)]

    } catch(e) {
        console.log('ERROR: ', e)
        // Probably hit refresh rate limit or the max length allowed for requests
        return []
    }
}

const extract = async () => {
    const allProductDataFromPingoDoce = await fetchItems(0, MAX_ITEMS_PER_REQUEST)

    fs.writeFileSync(outputDir + 'pingo_doce_unprocessed.json', JSON.stringify(allProductDataFromPingoDoce))
}

extract()
