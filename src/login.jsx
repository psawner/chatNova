import styles from'./login.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const [identifier,setidentifier]= useState("")
    const [password,setpassword]= useState("")
    const [message,setmessage]= useState("")

    const navigate = useNavigate()
    
    const loginclutch = async(e)=>{
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:4000/user/signin",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({identifier,password})
            })

            const data = await res.json();
            if(res.ok){
                localStorage.setItem("token",data.token)
                setmessage(data.message)

                navigate('/dashboard/dashboard')
            }else{
                setmessage(data.message)
            }
        }catch(err){
            console.error(err)
            setmessage("server error");
        }
    }

    return (
        <div className={styles.body}>
            <main className={styles.first}>
                <div className={styles.wrap1}>
                    <div className={styles.logo}><img src="https://cdn3.iconfinder.com/data/icons/chatbot-robot/100/chatbot_01_16_bot_chat_robot_app_artificial_chatbot_dialog-1024.png"></img> </div>
                    <h3>Chat<span>N</span>ova</h3>
                    
                </div>

                <form className={styles.login_info} onSubmit={loginclutch}>
                    <div className={styles.email_input}>
                        <p>Email/Username:</p>
                        <div className={styles.icon1}>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" id={styles.email} name="email" value={identifier} autoComplete="off" placeholder="Email or Username" onChange={(e)=>setidentifier(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className={styles.password_input}>
                        <div className={styles.wrap2}>
                            <p>Password:</p>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <div className={styles.icon2}>
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" id={styles.password} name="password" value={password} autoComplete="off" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className={styles.remember_me}>
                        <input type="checkbox" id={styles.checkbox} name="remember_me"></input>
                        <p>Remember me</p>
                    </div>

                    <button className={styles.btn} type="submit" >Sign in </button>
                    <p id={styles.responseMsg}>{message}</p>

                    <div className={styles.lines}>
                        <div className={styles.line}></div>
                        Or
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.no_account}>
                        <p>Don't have an account? <Link to='/register/register'>Sign up</Link></p>
                    </div>
                </form>
                
            </main>
        </div>
    )
}

export default Login