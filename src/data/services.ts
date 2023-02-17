import { Product } from './models';

export const DataFetcher = {
    _Fetcher: async (path: string) => fetch(path, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then((dataSet) => dataSet.json())
        .then(DataFetcher._Transform),
    _Transform: (dataSet: Product[]) => dataSet.map((entry) => ({
            ...entry,
            name: entry.name.normalize('NFC'),
        })),
    Lidl: async () => DataFetcher._Fetcher('data/lidl/lidl_data.json'),
    PingoDoce: async () => DataFetcher._Fetcher('data/pingoDoce/pingodoce_data.json'),
    Continente: async () => DataFetcher._Fetcher('data/continente/continente_data.json'),
};
