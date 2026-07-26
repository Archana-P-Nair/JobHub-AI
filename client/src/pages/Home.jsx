import { useAuth } from "../context/AuthContext";

export default function Home() {

    const auth = useAuth();

    console.log(auth);

    return (

        <div>

            <h1>JobHub AI</h1>

        </div>

    );

}