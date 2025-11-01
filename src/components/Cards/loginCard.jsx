import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

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
            <form className="loginCard" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}
                
                <div className="userName">
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
                
                <button type="submit" className="loginButton" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginCard;