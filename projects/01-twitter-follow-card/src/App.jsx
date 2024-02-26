import { TwitterFollowCard } from "./TwitterFollowCard";
import "./index.css";

const users = [
    {
        name: 'Paola Lopez',
        userName: 'paolop',
        isFollowing: true
    },
    {
        name: 'Raul Lopez',
        userName: 'raule',
        isFollowing: true
    },
    {
        name: 'Meysy Vega',
        userName: 'meysym',
        isFollowing: true
    },
]
export function App() {
    // Pasar un callback a un componente
    // const format = (userName) => `@${userName}`;
    // Pasar un elemento 
    // const formattedUserName = (<span>@{userName}</span>)

    return (
        <section className="App">
            <TwitterFollowCard
                // formatUserName={format}
                // isFollowing
                userName="5secondsofhush"
                name="María López"
                initialIsFollowing
            />
            <TwitterFollowCard
                // isFollowing={false}
                name="Elon Musk  "
            />

            {
                users.map((user) => {
                    const { userName, name, isFollowing } = user
                    return (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            name={name}
                            initialIsFollowing={isFollowing}
                        ></TwitterFollowCard>
                    )
                })
            }
        </section>
    );
}
