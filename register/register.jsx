import styles from './register.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [name,setname]= useState("")
    const [email,setemail]= useState("")
    const [age,setage]= useState("")
    const [mobile,setmobile]= useState("")
    const [password,setpassword]= useState("")
    const [message,setmessage]= useState("")
    
    const navigate = useNavigate()

    const formclutch = async (e)=>{
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:4000/user/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, age, mobile, password})
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
                    <p>Your guide...........</p>
                </div>

                <div className={styles.wrap2}>
                    <h3>Create Account</h3>
                </div>

                <form className={styles.signup} onSubmit={formclutch}>
                    <div className={styles.name_input}>
                        <div className={styles.icon1}>
                            <i className="fa-solid fa-user"></i>
                            <input type="name" id={styles.name} name="name" value={name} autoComplete="off" placeholder="Full Name" onChange={(e)=>setname(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className={styles.name_input}>
                        <div className={styles.icon2}>
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" id={styles.email} name="email" value={email} placeholder="Email" onChange={(e)=>setemail(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className={styles.name_input}>
                        <div className={styles.icon3}>
                            <i className="fa-solid fa-person"></i>
                            <input type="number" id={styles.age} name="age" value={age} min="18" placeholder="Age" onChange={(e)=>setage(Number(e.target.value))} required></input>
                        </div>
                    </div>
                    <div className={styles.name_input}>
                        <div className={styles.icon4}>
                            <i className="fa-solid fa-mobile-screen-button"></i>
                            <input type="tel" id={styles.mobile} name="mobile" value={mobile} pattern="[0-9]{10}" placeholder="10-digit number" onChange={(e)=>setmobile(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className={styles.name_input}>
                        <div className={styles.icon7}>
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" id={styles.password} name="password" value={password} placeholder="Password" onChange={(e)=>setpassword(e.target.value)} required></input>
                        </div>
                    </div>

                    <div className={styles.policy}>
                        <input type="checkbox" id={styles.checkbox}></input>
                        <p>I accept the <span id={styles.highlight}>Terms</span> and <span id={styles.highlight}>Privacy Policy</span></p>
                    </div>

                    <button className={styles.btn} type="submit">Sign up</button>

                    <p id={styles.responseMsg}>{message}</p>

                </form>
            </main>
        </div>
    )
}

export default Register