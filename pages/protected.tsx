import supabase from "../utils/supabase";

export default function Profile() {
    return (
        <div>
            <h2>HELLO PROTECTED ROUTE</h2>
        </div>
    )
};

export async function getServerSideProps({ req }: any) {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
        return { props: {}, redirect: { destination: '/login' }}
    }

    return { props: { user } }
}