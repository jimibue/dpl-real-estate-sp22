import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider"

const Login = ()=>{
    const [email, setEmail] = useState('test1@test.com')
    const [password, setPassword] = useState('123456')
    const auth = useContext(AuthContext)
    // not need but nice for UX
    // const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        auth.handleLogin({email, password})
    }
    return (
        <div>
            <h1>Login YOYOYO</h1>
            <form onSubmit={handleSubmit}>
                <p>email</p>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <p>password</p>
                <input value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <Button onClick={handleSubmit} variant="primary">Primary</Button>
            </form>
        </div>
    )
}
export default Login