import { useState,useEffect } from "react";
// import { PostLoginUser } from "../Services/UserService";
import { PostLogin } from "../Services/AdminService";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {useContext} from "react"
import { UserContext } from '../context/UserContext';
const Login =()=>
{
    const navigate = useNavigate();
    const [e_mail,set_e_mail]=useState("");
    const [pass_word, set_pass_word]=useState("");
    const [isShowPassWord, setIsShowPassWord]=useState(false);
    const [loadingApi,setLoadingApi]=useState(false);
    const { loginContext } = useContext(UserContext);

    // useEffect(() => {
    //     let token =localStorage.getItem("token");
    //         if(token)
    //         {
    //             navigate("/");
    //         }
    //   },[]);
    const handleLogin = async () => {
        if (!e_mail || !pass_word) {
            toast.error("Error!");
            return;
        }

        try {
            setLoadingApi(true);
            const res = await PostLogin(e_mail, pass_word);
            
            if (res && res.data && res.data.access_token) {
                // Lấy access_token từ phản hồi và lưu vào localStorage
                // localStorage.setItem("token", res.data.access_token);
                loginContext(res.data.id,e_mail, res.data.access_token,res.data.password,res.data.adminname)
                toast.success("Login successful!");
                navigate("/");
            } else {
                toast.error("Login failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during login.");
        }
        setLoadingApi(false);
    }
    const handleGoBack =()=>
    {
        navigate("/");
    }
    return(
        <>
        <div className="login-container col-12 col-sm-4 ">
        <div className="title">Login</div>
        <div className="text">Email and password</div>
        <input id="text-email" type="text" placeholder="enter email" 
        value={e_mail}
        onChange={(event)=>set_e_mail(event.target.value)}
        />
       <div className="input-pass">
       <input id="text-email" type={isShowPassWord===true?"text": "password"} 
       placeholder="enter password"
       value={pass_word}
       onChange={(event)=>set_pass_word(event.target.value)}
       />
       <i className={isShowPassWord===true?"fa-solid fa-eye":"fa-solid fa-eye-slash"}
       onClick={()=>setIsShowPassWord(!isShowPassWord)}
       ></i>
       </div >
        <button className={e_mail&&pass_word? "active":""}
        disabled={e_mail&&pass_word?false:true}
        onClick={()=>handleLogin()}
        >{loadingApi&&<i className="fa-solid fa-sync fa-spin"></i>}Login</button>
        <div className="go-back">
        <i className="fa-solid fa-backward"></i> 
        <span onClick={()=>handleGoBack()}>Go back</span>
        </div>
        </div>
        </>
    )
}
export default Login;