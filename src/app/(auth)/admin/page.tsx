import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CancelledFetch from "@/components/CancelledFetch";
import { getServerSession } from "next-auth";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <pre>
                <code>
                    <span>Session Data: </span>{" "}
                    {JSON.stringify(session, null, 2)}
                </code>
            </pre>
            <CancelledFetch />
        </div>
    );
}
