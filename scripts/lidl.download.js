const requestPromise = require('request-promise')
const xmlParser = require('fast-xml-parser')
const fs = require('fs')
const cherio = require('cheerio')

const outputDir = './scripts/tmp/'

const extractLidlWebsite = async () => {
    const lidlBasepath = 'https://www.lidl.pt'
    var lidlPromotionsPath = lidlBasepath + '/promocoes'

    const lidlHomepageHtml = await requestPromise(lidlPromotionsPath, { strictSSL: false})
    
    const data = new xmlParser.XMLParser({ ignoreAttributes: false }).parse(lidlHomepageHtml)
    const parsedData = JSON.stringify(data).split(' ').join('\n')

    let allPromoLinks = getAllPromotionPageLinks(parsedData)

    let allProducts = []
    for (const promoLink of allPromoLinks) {

        console.log('Downloading data from ' + promoLink)
        const page = await requestPromise(lidlBasepath + promoLink, { strictSSL: false})
        const pageData = new xmlParser.XMLParser({ ignoreAttributes: false }).parse(page)
        const parsedPageData = JSON.stringify(pageData).split(' ')

        console.log('Preparing data from ' + promoLink)

        const pagePromotions = getPagePromotions(parsedPageData, page)

        console.log('Data prepared successfully')

        allProducts = [...allProducts, ...pagePromotions]
    }

    fs.writeFileSync(outputDir + 'lidl_data_unprocessed.json', JSON.stringify(allProducts))
}

const getAllPromotionPageLinks = (html) => {
    let splitHtml = html.split(`{`)
    splitHtml = splitHtml.join('').split(`}`)

    let matches = splitHtml.filter(html =>
        html.includes(`HeroStage`)
        && html.includes(`slider/accordionTheme/slide`)
        && html.includes(`EECpromotion`)
    )

    let allLinks = splitHtml
        .filter(html => html.includes('@_href'))
        .join('')
        .split('"@_href":"')
        .join('')
        .split('"')

    const promotionLinks = []

    matches.forEach(match => {
        let dataId = extractData(match, 'data-id').replace(/\s/g,'')

        const link = allLinks.find(x => x.includes(dataId))?.replace(',', '')
        promotionLinks.push(link)
    })

    return promotionLinks
}

const getPagePromotions = (page = '', rawHtml = '') => {
    const $ = cherio.load(rawHtml)
    const allArticles = $('article', rawHtml).toArray()

    const allProductArticles = allArticles.filter((article) => !article.attribs['EECproduct'])

    const finalProducts = []

    for (const product of allProductArticles) {
        const price = product.attribs['data-price']

        if (!price) {
            continue
        }


        const possibleAnchors = $('a', product).toArray()
        const link = possibleAnchors.find(anchor => anchor.attribs['href'])?.attribs['href']

        const possibleImgSources = $('source', product).toArray()

        // Choose last source because it contians smaller image

        let smallerImage
        if (possibleImgSources.length) {
            smallerImage = possibleImgSources[possibleImgSources.length -1].attribs['srcset']
        }

        let dateText = $('.lidl-m-ribbon-item__text', product).text()

        finalProducts.push({
            name: product.attribs['data-name'],
            href: link || '',
            price: product.attribs['data-price'],
            image: smallerImage || '',
            dateText,
            quantityInfo: $('.lidl-m-pricebox__basic-quantity', product).text(),
            merchant: 'lidl',
        })

    }
            
    return finalProducts
}

const extractData = (str = '', dataName = '') => {
        let name = ''
        
        name = str.split(`"@_${dataName}":"`)[1]

        if (!name) {
            return ''
        }
        
        name = name.split('"')[0]

        return name
}

console.log('READING LIDL ---')

if (!fs.existsSync('lidl.json') || true) {
    extractLidlWebsite()
}
