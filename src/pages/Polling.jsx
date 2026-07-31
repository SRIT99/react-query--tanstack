import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reFetchApi } from "../API/market";

const Polling = () => {
    const livedata = async () => {
        const res = await reFetchApi();

        if (res.status !== 200) return null;

        return {
            metaData: {
                symbol: res.data["Meta Data"]["2. Symbol"],
            },
            timeSeries: res.data["Time Series (5min)"],
        };
    };

    const { data, isError, isPending, error } = useQuery({
        queryKey: ["market"],
        queryFn: livedata,
        staleTime: 100000,
        refetchInterval: 1000,
        // refetchIntervalInBackground:true, --> refetch in background or even when user moves out of scope.
    });

    if (isError) return <h1>Something went wrong: {error.message}</h1>;
    if (isPending) return <h1>Loading...</h1>;

    const latestTime = Object.keys(data.timeSeries)[0];
    const latest = data.timeSeries[latestTime];

    return (
        <div className="posts-container">
            <div className="post-card">
                <span className="post-id">{data.metaData.symbol}</span>

                <p>High: {latest["2. high"]}</p>
                <p>Low: {latest["3. low"]}</p>
                <p>Close: {latest["4. close"]}</p>
            </div>
        </div>
    );
};
export default Polling;