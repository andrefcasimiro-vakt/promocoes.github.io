import { useEffect, useState } from "react";
import { Merchant, Product } from "../data/models";

export default function useData() {
    const [lidlData, setLidlData] = useState<Product[] | undefined>(undefined)
    const [pingoDoceData, setPingoDoceData] = useState<Product[] | undefined>(undefined)


    const fetchLidlData = async () => { 
        const lidlData = await fetch(`data/lidl/lidl_data.json`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(dataSet => dataSet.json())

        setLidlData(state => {
            state = lidlData as Product[]

            return lidlData.map((x: Product) => ({
                ...x,
                name: x.name.normalize('NFC')
            }))
        })

        return lidlData
    }

    const fetchPingoDoceData = async () => { 
        const pingoDoceData = await fetch(`data/pingoDoce/pingodoce_data.json`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(dataSet => dataSet.json())

        setPingoDoceData(state => {
            state = pingoDoceData as Product[]

            return pingoDoceData.map((x: Product) => ({
                ...x,
                name: x.name.normalize('NFC')
            }))
        })

        return pingoDoceData
    }

    useEffect(() => {
        queryData('', ['lidl'])
    }, [])
    
    const queryData = async (input: string, merchants: Merchant[]): Promise<Product[]> => {
        const dataToQuery = []
        if (merchants.includes('lidl')) {
            if (lidlData) {
                dataToQuery.push(...lidlData || [])
            } else {
                const lidlFetchedData = await fetchLidlData()
                dataToQuery.push(...lidlFetchedData || [])
            }
        }

        if (merchants.includes('pingodoce')) {
            if (pingoDoceData) {
                dataToQuery.push(...pingoDoceData || [])
            } else {
                const pingoDoceFetchedData = await fetchPingoDoceData()
                dataToQuery.push(...pingoDoceFetchedData || [])
            }
        }


        if (!input.length) {
            return dataToQuery
        }
        
        return dataToQuery.filter(item => {
            var pattern = input.split(" ").map((x)=>{
                return `(?=.*${x})`
            }).join("");

            var regex = new RegExp(`${pattern}`, "gi")
            return regex.test(item.name)
        })
    }

    return {
        queryData
    }
}
