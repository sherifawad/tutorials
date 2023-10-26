"use client";

import { useRef, useState } from "react";

const CancelledFetch = () => {
    const [fetchingStatus, setFetchingStatus] = useState("");
    const controller = new AbortController();
    const controllerRef = useRef<AbortController>();

    const fetchDataWithoutAbort = async () => {
        try {
            setFetchingStatus("loading");
            // fetch will continue even it will reject after 1 second
            await Promise.race([
                fetch("/api/wait").then(() => console.log("fetched")),
                fetch("/api/wait").then(() => console.log("fetched")),
                fetch("/api/wait").then(() => console.log("fetched")),
                new Promise((_, reject) => setTimeout(reject, 1000)),
            ]);
        } catch (error) {
            setFetchingStatus("error");
        }
    };
    const fetchDataWithAbort = async () => {
        try {
            setFetchingStatus("loading");
            // all fetches will have 1 second to be resolved or be cancelled, ideally change to f or 10 seconds
            await Promise.race([
                fetch("/api/wait", { signal: controller.signal }).then(() => {
                    setFetchingStatus("success");
                }),
                fetch("/api/wait", { signal: controller.signal }).then(() => {
                    setFetchingStatus("success");
                }),
                fetch("/api/wait", { signal: controller.signal }).then(() => {
                    console.log("fetched");
                }),
                new Promise((_, reject) => setTimeout(reject, 1000)),
            ]);
        } catch (error) {
            controller.abort();
            setFetchingStatus("error");
        }
    };
    const fetchDataWithOptionToCancel = async () => {
        controllerRef.current = new AbortController();
        try {
            setFetchingStatus("loading");
            // all fetches will have 1 second to be resolved or be cancelled, ideally change to f or 10 seconds
            await Promise.race([
                fetch("/api/wait", {
                    signal: controllerRef.current.signal,
                }).then(() => {
                    console.log("fetched");

                    setFetchingStatus("success");
                }),
                fetch("/api/wait", {
                    signal: controllerRef.current.signal,
                }).then(() => {
                    console.log("fetched");

                    setFetchingStatus("success");
                }),
                fetch("/api/wait", {
                    signal: controllerRef.current.signal,
                }).then(() => {
                    console.log("fetched");

                    setFetchingStatus("success");
                }),
                new Promise((_, __) =>
                    setTimeout(() => setFetchingStatus("delayed"), 1000)
                ),
            ]);
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "AbortError") {
                    setFetchingStatus("cancelled");
                } else {
                    setFetchingStatus("error");
                }
            } else {
                setFetchingStatus("error");
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center py-20 w-full gap-8">
                <button
                    onClick={fetchDataWithoutAbort}
                    disabled={fetchingStatus === "loading"}
                >
                    fetchDataWithoutAbort
                </button>
                <button
                    disabled={fetchingStatus === "loading"}
                    onClick={fetchDataWithAbort}
                >
                    fetchDataWithAbort
                </button>
                <button
                    disabled={
                        fetchingStatus === "loading" ||
                        fetchingStatus === "delayed"
                    }
                    onClick={fetchDataWithOptionToCancel}
                >
                    fetchDataWithOptionToCancel
                </button>
            </div>
            {fetchingStatus === "delayed" && (
                <>
                    <p>
                        Data Fetching is tacking longer than normal. It is still
                        running in the background. If you want you can cancel
                        the request and retry it.
                    </p>
                    <button
                        onClick={() => {
                            controllerRef.current?.abort();
                            console.log("cancel button clicked");
                        }}
                    >
                        Cancel
                    </button>
                </>
            )}
            {fetchingStatus === "error" && <p>Error!</p>}
            {fetchingStatus === "success" && <p>Fetched</p>}
            {fetchingStatus === "cancelled" && <p>cancelled</p>}
        </>
    );
};

export default CancelledFetch;
