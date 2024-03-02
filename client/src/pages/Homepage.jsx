import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <>
            {/* These links do not exist yet, just setting them up */}
            <Link to="signup">Sign Up</Link>
            <Link to="login">Login</Link>
            <h1>
                Welcome <br/>
                to <br/>
                <span>
                    Chore Quest
                </span>
            </h1>
            <br/>
            <h3>
                If you already have a Chore Quest account, ask your parents to "Login" and then choose your name to start completing quests!
            </h3>
            <br/>
            <p>
                Chore Quest is an interactive way for kids to become more interested in doing their chores by incentivising each chore. They will be able to see their progress and potential rewards, helping them learn to set and achieve their goals.
            </p>
            <br/>
            <h3>
                Start using Chore Quest with 3 easy steps.
            </h3>
            <br/>
            <ol>
                <li>
                    Create a household account by clicking "Sign Up".
                </li>
                <li>
                    Add profiles for your children and spouse as applicable.
                </li>
                <li>
                    Start adding chores to your Quest List.
                </li>
            </ol>
        
        </>
    )
}

export default Homepage