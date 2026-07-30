import axios from "axios";

const marApi = axios.create(
    {
        baseURL: 'https://www.alphavantage.co'
    }
)

export const reFetchApi = () => {
    return marApi.get("/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo")
}