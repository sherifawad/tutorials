"use client";

import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

let likes = 0; //from db

type LikeApiResponse = {
    totalLikes: number;
    success: boolean;
};

const mockLikeApi = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //Mocking a random error
            if (Math.random() > 0.7) {
                reject(new Error("Random API error"));
            } else {
                likes += 1;
                resolve({
                    totalLikes: likes,
                    success: true,
                });
            }
        }, 1000);
    });
};
function UseQueryOptimistic() {
    const queryClient = useQueryClient();

    const { data: dbLikes } = useQuery({
        queryKey: ["likes"],
        queryFn: () => likes,
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            const response = await mockLikeApi();
            return response as LikeApiResponse;
        },
        onMutate: async () => {
            await queryClient.cancelQueries(["likes"]);
            const previousLikes = queryClient.getQueryData<number>(["likes"]);
            queryClient.setQueryData(["likes"], (previousLikes || 0) + 1);
            return { previousLikes };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(["likes"], () => context?.previousLikes);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["likes"]);
        },
    });

    return (
        <div>
            <p className="my-2 font-sans text-lg">Likes: {dbLikes}</p>
            <button
                className="p-2 border rounded-lg hover:text-red-500"
                disabled={isLoading}
                onClick={() => mutate()}
            >
                Like
            </button>
        </div>
    );
}

export default UseQueryOptimistic;
