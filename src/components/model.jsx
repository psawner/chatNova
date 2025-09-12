import styles from './design.module.css'
import { useRef, useEffect, useState } from "react";
function ProfileModel({ isopen, onClose }) {
    const token = localStorage.getItem("token")
    const [imageurl, setimageurl] = useState(null)

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

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [age, setage] = useState("")
    const [mobile, setmobile] = useState("")

    useEffect(() => {
        const profile = async () => {
            try {
                const res = await fetch("http://localhost:4000/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })

                const data = await res.json()
                setname(data.person.name)
                setemail(data.person.email)
                setage(data.person.age)
                setmobile(data.person.mobile)
            } catch (err) {
                console.error(err)
            }
        }
        profile()
    }, [])

    return (
        <div>
            <div className={`${styles.overlaybox} ${isopen ? styles.show : ""}`}>
                <div className={styles.profilebox}>
                    <div className={styles.close}><i class="bi bi-x-octagon" onClick={onClose}></i></div>
                    <div className={styles.wrappingbox}>
                        <div className={styles.profile_icon}><img id={styles.profil_picture} src={imageurl}></img></div>
                        <div className={styles.wrapping}>
                            <div className={styles.row}>
                                <table className={styles.user}>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.row}>
                                <table className={styles.user}>
                                    <tbody>
                                        <tr>
                                            <th>Email</th>
                                            <td>{email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.row}>
                                <table className={styles.user}>
                                    <tbody>
                                        <tr>
                                            <th>Age</th>
                                            <td>{age}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.row}>
                                <table className={styles.user}>
                                    <tbody>
                                        <tr>
                                            <th>Mobile No.</th>
                                            <td>{mobile}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModel