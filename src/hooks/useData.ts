import { useEffect, useState } from "react";
import { Product } from "../data/models";

export default function useData() {
    const [data, setData] = useState<Product[]>([])

    const fetchData = async () => { 

        const lidlData = await fetch(`data/lidl/lidl_data.json`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(dataSet => dataSet.json())

        setData(state => {
            state = [...state, ...lidlData]

            return state.map(x => ({
                ...x,
                name: x.name.normalize('NFC')
            }))
        })
    }

    useEffect(() => {
        fetchData() 
    }, [])
    
    const queryData = async (input: string): Promise<Product[]> => {
        if (!input.length) {
            return data
        }
        
        return data.filter(item => {
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
