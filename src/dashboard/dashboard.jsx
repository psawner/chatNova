import styles from './dashboard.module.css'
import { useRef, useEffect, useState } from "react";
//import axios from 'axios'
import ProfileModel from '../components/model';
import EmojiPicker from "emoji-picker-react";
function Dashboard() {
    const token = localStorage.getItem("token")
    const [issidebaropen, setissidebar] = useState(false)
    const [moved, setmoved] = useState(false)

    const [userinput, setuserinput] = useState("")
    const [message, setmessage] = useState([])
    const [loading, setloading] = useState(false)

    //----------------------scroll button functionality----------------------------------------------------
    const chatRef = useRef(null);
    const [showscroll, setshowscroll] = useState(false)
    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };

    const handlescroll = () => {
        if (!chatRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
            setshowscroll(false);
        } else {
            setshowscroll(true);
        }
    };
    //----------------------scroll button functionality----------------------------------------------------


    //----------------------user and bot responses-------------------------------------------------------------
    const send = async () => {
        if (!userinput.trim()) return;
        setmoved(true)
        setmessage((prev) => [...prev, { type: 'user', text: userinput }])

        const usermessage = userinput
        setuserinput("")
        setloading(true)

        //----------------------scroll button functionality for user message----------------------------------------------------
        setTimeout(scrollToBottom, 50);
        //----------------------scroll button functionality for user message----------------------------------------------------

        try {
            const res = await fetch("http://localhost:4000/user/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ message: usermessage })
            })
            const data = await res.json()
            if (res.ok) {
                setmessage((prev) => [...prev, { type: 'bot', text: data.reply }])
            } else {
                setmessage((prev) => [...prev, { type: 'bot', text: data.error }])
            }

            //----------------------scroll button functionality for bot response----------------------------------------------------
            setTimeout(scrollToBottom, 50);
            //----------------------scroll button functionality for bot response----------------------------------------------------

            //--------------------------------- this is sort method to fetch from backend-------------------------------------------
            // const res = await axios.post("http://localhost:4000/user/ask",{message: usermessage})
            // setmessage((prev)=>[...prev,{type:'bot',text:res.data.reply}])
            //--------------------------------- this is sort method to fetch from backend-------------------------------------------


        } catch (err) {
            setmessage((prev) => [...prev, { type: bot, text: "something went wrong" }])
            setTimeout(scrollToBottom, 50);
        } finally {
            setloading(false)
        }
    }
    //----------------------user and bot responses-------------------------------------------------------------

    const [imageurl, setimageurl] = useState("")

    useEffect(() => {
        const profile = async () => {
            try {
                const res = await fetch("http://localhost:4000/user/profileimage", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })

                const data = await res.json()
                setimageurl(data.avatar)
            } catch (err) {
                console.error(err)
            }
        }
        profile()
    }, [])


    const [showprofile, setshowprofile] = useState(false)

    const fileInputRef = useRef();

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        console.log("Selected file:", e.target.files[0]);
    };
    
    //---------------------------voice to text conversion---------------------------------------------
    const voicerecognition = useRef(null)
    const startListening = () => {
        if (!("webkitSpeechRecognition" in window)) {
          alert("Your browser does not support speech recognition");
          return;
        }
    
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false; // stop after user stops talking
        recognition.interimResults = false; // only final result
        recognition.lang = "en-US";
    
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setuserinput(transcript); // put recognized text into input
        };
    
        recognition.onerror = (err) => {
          console.error("Speech recognition error:", err);
        };
    
        recognition.start();
        voicerecognition.current = recognition;
      };
      //---------------------------voice to text conversion---------------------------------------------


    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <div className={styles.header_icons_left}>
                    {!issidebaropen && (
                        <i className="fa-solid fa-door-open" onClick={() => setissidebar(true)}></i>
                    )}
                    {!issidebaropen && (<i class="fa-solid fa-pen-to-square" onClick={() => window.location.reload()}></i>)}
                    <div className={styles.logo}><img src="https://cdn3.iconfinder.com/data/icons/chatbot-robot/100/chatbot_01_16_bot_chat_robot_app_artificial_chatbot_dialog-1024.png"></img> </div>
                </div>
                <div className={styles.header_icons_right}>
                    <i class="fa-solid fa-bell"></i>
                    <div className={styles.profile_pic}> <img id={styles.profileimage} src={imageurl}></img></div>
                </div>
            </header>
            <main className={styles.main}>
                <aside className={`${styles.sidebar} ${issidebaropen ? styles.sidebarOpen : ""}`}>
                    <div className={styles.wrap}>
                        <div className={styles.first}>
                            <div className={styles.inner_first}>
                                <i class="fa-solid fa-door-closed" onClick={() => setissidebar(false)}></i>
                                <i class="fa-brands fa-searchengin"></i>
                            </div>
                            <i class="fa-solid fa-pen-to-square" onClick={() => window.location.reload()}></i>
                        </div>
                        <div className={styles.second}>
                            <ul>
                                <li><i class="fa-brands fa-nfc-symbol"></i> ChatNova</li>
                                <li><i class="fa-brands fa-wpexplorer"></i> Explore ChatNova</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.history_content}>
                        <h4>History</h4>
                        <div className={styles.history}></div>
                    </div>
                    <div className={styles.sidebar_bottom}>
                        <ul>
                            <li><i class="fa-solid fa-gear"></i> Settings</li>
                            <li onClick={() => setshowprofile(true)}><i class="fa-solid fa-user"></i> Profile</li>
                        </ul>
                    </div>
                </aside>
                <div className={styles.wrap_interface}>
                    <div className={styles.chatinterface}>
                        <div className={styles.chathead}>
                            <h2>ChatNova</h2>
                            <p>your Personal Assist!</p>
                        </div>
                        {moved && (
                            <div className={styles.chatcontent} ref={chatRef} onScroll={handlescroll}>
                                <div className={styles.chatdesign}>
                                    {message.map((msg, index) =>
                                        msg.type === 'user' ? (
                                            <div key={index} className={styles.userquestion}>{msg.text}</div>
                                        ) : (
                                            <div key={index} className={styles.botresponse}>{msg.text}</div>
                                        )
                                    )}
                                    {loading && <div className={styles.botresponse}>
                                        <div className={styles.delay}> <span></span><span></span><span></span> </div>
                                    </div>}
                                </div>
                                {showscroll && (
                                    <div className={styles.scroll}><i class="bi bi-arrow-down-circle" onClick={scrollToBottom}></i></div>
                                )}
                            </div>
                        )}
                        <div className={styles.input_board}>
                            <input type='text' id={styles.input} value={userinput} placeholder='Ask something.....' onChange={(e) => setuserinput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}></input>
                            <div className={styles.icons_info}>
                                {!userinput && (<i class="fa-solid fa-face-smile" id={styles.emoji}></i>)}
                                {!userinput && (<i class="fa-solid fa-paperclip" id={styles.files} onClick={handleFileClick}></i>)}
                                {userinput.trim() === "" ? (<i class="fa-solid fa-microphone" id={styles.microphone} onClick={startListening}></i>) :
                                    (<i class="fa-solid fa-paper-plane" id={styles.plane} onClick={send}></i>)}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className={styles.footer}><h4>ChatNova</h4></footer>
            <ProfileModel isopen={showprofile} onClose={() => setshowprofile(false)} />

        </div>
    )
}

export default Dashboard