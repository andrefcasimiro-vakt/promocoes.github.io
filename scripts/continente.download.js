
const { get } = require('request-promise')
const fs = require('fs')
const htmlEntities = require('html-entities');

const outputDir = './scripts/tmp/'

const cherio = require('cheerio')

const outputData = 'public/data/continente'

const extract = async () => {
    const htmlFilePath = outputDir + 'continente_html.html'
    if (!fs.existsSync(htmlFilePath)) {

        const html = await get('https://www.continente.pt/pesquisa/?cgid=start=0&start=0&pmin=0.01&prefn1=isPromo&prefv1=true', {
            headers: {
                'User-Agent': 'Request-Promise' 
            },
        }).json()
        const $ = cherio.load(html)
        const productCounter = $('.search-results-products-counter').text()
    
        const totalProducts = Number(productCounter.split(' ')[2])
    
        if (Number.isNaN(totalProducts)) {
            console.error("Could not download lidl. Reason: ", totalProducts, " is not a number")
            return
        }
    
        const allHtml = await get(
        `https://www.continente.pt/on/demandware.store/Sites-continente-Site/default/Search-UpdateGrid?cgid=col-produtos&pmin=0%2e01&prefn1=isPromo&prefv1=true&start=0&sz=${totalProducts}`, {
            headers: {
                'User-Agent': 'Request-Promise' 
            },
        })
    
        fs.writeFileSync(htmlFilePath, allHtml)
    }

    const savedHtml = fs.createReadStream(htmlFilePath,'utf-8')

    const allProducts = []
    savedHtml.on('data', (chunk) => {
        const parsedData = chunk.split('\n')
        
        let product = undefined


        for (const line of parsedData) {
            if (line.includes('<div class="product" data-pid="')) {
                if (product) {
                    product.merchant = 'continente'

                    allProducts.push(product)
                }

                product = {}
            }

            if (product) {
                if (line.includes('<a class="null" href="https://www.continente.pt/produto/')) {
                    product.href = line.split(`href="`)[1].split(`"`)[0].trim()
                }

                if (line.includes(`data-src="https://www.continente.pt/dw/image`) && line.includes('badges') === false) {
                    product.image = line.split(`data-src="`)[1].split(`"`)[0].trim()
                }

                if (line.includes('class="value" content="')) {
                    product.price = line.split(`content="`)[1].split(`"`)[0].trim()
                }

                if (line.includes('<a class="ct-tile--description"')) {
                    product.name = line.split(`">`)[1]

                    if (product.name && product.name.length) {
                        product.name = product.name.split(`</a>`)[0]
                        product.name = htmlEntities.decode(product.name);

                    }
                }
            }
        }
    })

    savedHtml.on('end', () => {
        fs.writeFileSync(outputData + '/continente_data.json', JSON.stringify(allProducts.filter(x => x.name)))
    })
    


}

extract()
