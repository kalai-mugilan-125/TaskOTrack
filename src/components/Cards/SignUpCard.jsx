import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

function SignUpCard() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        const result = await signup(username, email, password);

        if (result.success) {
            // Small delay to ensure state updates
            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 100);
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="Card">
            <form className="signUpCard" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && <div className="error-message">{error}</div>}
                
                <div className="userName">
                    <i className="fas fa-user outline-icon"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        className="userInput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                
                <div className="email">
                    <i className="fas fa-envelope outline-icon"></i>
                    <input
                        type="email"
                        placeholder="Email"
                        className="userInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                
                <div className="password">
                    <i className="fas fa-lock outline-icon"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        className="userInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                
                <button type="submit" className="signButton" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default SignUpCard;