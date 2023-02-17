import { useEffect, useState } from 'react';
import { Merchant, Product } from '../data/models';
import { DataFetcher } from '../data/services';

export default function useData() {
    const [lidlData, setLidlData] = useState<Product[] | undefined>(undefined);
    const [pingoDoceData, setPingoDoceData] = useState<Product[] | undefined>(undefined);
    const [continenteData, setContinenteData] = useState<Product[] | undefined>(undefined);

    const getDataLimit = (): number => (Number(lidlData?.length) || 0) + (Number(pingoDoceData?.length) || 0) + (Number(continenteData?.length) || 0);

    const fetchLidlData = async () => {
        const payload = await DataFetcher.Lidl();
        setLidlData(payload);
        return payload;
    };

    const fetchPingoDoceData = async () => {
        const payload = await DataFetcher.PingoDoce();
        setPingoDoceData(payload);
        return payload;
    };

    const fetchContinenteData = async () => {
        const payload = await DataFetcher.Continente();
        setContinenteData(payload);
        return payload;
    };

    useEffect(() => {
        queryData('', ['lidl']);
    }, []);

    const queryData = async (input: string, merchants: Merchant[]): Promise<Product[]> => {
        const dataToQuery = [];

        if (merchants.includes('lidl')) {
            if (lidlData) {
                dataToQuery.push(...lidlData || []);
            } else {
                const lidlFetchedData = await fetchLidlData();
                dataToQuery.push(...lidlFetchedData || []);
            }
        }

        if (merchants.includes('pingodoce')) {
            if (pingoDoceData) {
                dataToQuery.push(...pingoDoceData || []);
            } else {
                const pingoDoceFetchedData = await fetchPingoDoceData();
                dataToQuery.push(...pingoDoceFetchedData || []);
            }
        }

        if (merchants.includes('continente')) {
            if (continenteData) {
                dataToQuery.push(...continenteData || []);
            } else {
                const continenteFetchedData = await fetchContinenteData();
                dataToQuery.push(...continenteFetchedData || []);
            }
        }

        if (!input.length) {
            return dataToQuery;
        }

        return dataToQuery.filter((item) => {
            const pattern = input.split(' ').map((x) => `(?=.*${x})`).join('');

            const regex = new RegExp(`${pattern}`, 'gi');
            return regex.test(item.name);
        });
    };

    return {
        queryData,
        getDataLimit,
    };
}
