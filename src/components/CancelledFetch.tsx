"use client";
const CancelledFetch = () => {
    const controller = new AbortController();
    const fetchDataWithoutAbort = async () => {
        try {
            // fetch will continue even it will reject after 1 second
            await Promise.race([
                fetch("/api/wait").then(() => console.log("fetched")),
                fetch("/api/wait").then(() => console.log("fetched")),
                fetch("/api/wait").then(() => console.log("fetched")),
                new Promise((_, reject) => setTimeout(reject, 1000)),
            ]);
        } catch (error) {
            console.log("Promise rejected");
        }
    };
    const fetchDataWithAbort = async () => {
        try {
            // all fetches will have 1 second to be resolved or be cancelled, ideally change to f or 10 seconds
            await Promise.race([
                fetch("/api/wait", { signal: controller.signal }).then(() =>
                    console.log("fetched")
                ),
                fetch("/api/wait", { signal: controller.signal }).then(() =>
                    console.log("fetched")
                ),
                fetch("/api/wait", { signal: controller.signal }).then(() =>
                    console.log("fetched")
                ),
                new Promise((_, reject) => setTimeout(reject, 1000)),
            ]);
        } catch (error) {
            controller.abort();
            console.log("Promise rejected");
        }
    };

    return (
        <div className="flex justify-between items-center">
            <button onClick={fetchDataWithoutAbort}>
                fetchDataWithoutAbort
            </button>
            <button onClick={fetchDataWithAbort}>fetchDataWithAbort</button>
        </div>
    );
};

export default CancelledFetch;
