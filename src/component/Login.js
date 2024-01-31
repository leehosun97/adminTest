import { Link } from "react-router-dom";
import { Flex } from "antd";
import LogoImg from '../images/logo.png';
import LoginV1 from "./LoginV1";
import LoginV2 from "./LoginV2";
import { useState } from "react";


export default function Login(props) {
    const images = {
        LogoImg,
    }
    const [showLoginV1, setShowLoginV1] = useState(true);
    const [verName, setverName] = useState("V1");
    const toggleComponent = () => {
        setShowLoginV1((prev) => !prev);
        setverName(evt => evt === "V1" ? "V2":"V1")
      };
    return <div style={{ width: "640px", boxShadow: "6px 6px 10px 4px rgba(0, 0, 0, 0.04)", borderRadius: "40px", padding: "60px 80px" }}>
        <div>
            <Flex justify="center">
                <span style={{ width: "240px" }}>
                    <img src={images.LogoImg} style={{ width: "100%" }} alt="로고이미지"></img>
                </span>
            </Flex>
            {showLoginV1 ? <LoginV1/> : <LoginV2/>}
            <Flex align="center" gap="middle" justify="center" style={{ marginTop: "32px" }}>
                <Link to="/SignUp">회원가입</Link>
                <Link>아이디 찾기</Link>
                <Link>비밀번호 찾기</Link>
                <button onClick={toggleComponent}>버전 {verName}</button>
            </Flex>
        </div>
    </div>

}
