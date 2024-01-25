import { Link } from "react-router-dom";
import { Button, Flex, Input, Form } from "antd";
import { useState } from "react";

export default function Login() {
    const [UserId , setUserId] = useState("");
    const [UserPw , setUserPw] = useState("");
    const UserIdHandler = (evt) =>{
        setUserId(evt.currentTarget.value);
    }
    const UserPwHandler = (evt) =>{
        setUserPw(evt.currentTarget.value);
    }
    console.log(UserId,UserPw);

    const HandleLogin = () => {
        const apiUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/login';
    
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            loginId: UserId,
            password: UserPw,
            
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('API 응답:', data);
          })
          .catch(error => {
            console.error('API 호출 중 에러 발생:', error);
          });
      };
    return <div>
        <div className="LoginBox">
            <div>
                <img src="../images/logo.png"></img>
            </div>
            <Form name="basic" style={{ maxWidth: "100%", }} initialValues={{ remember: true, }} autoComplete="off">
                
                <Form.Item label="아이디" name="Id"  validateTrigger="onBlur" rules={[{ required: true, message: '아이디가 틀렸습니다', },]}>
                    <Input onChange={UserIdHandler} value={UserId}/>
                </Form.Item>
                <Form.Item label="비밀번호" name="Pw" rules={[{ required: true, message: '비밀번호가 틀렸습니다', },]}>
                    <Input.Password onChange={UserPwHandler} value={UserPw}/>
                </Form.Item>
                <Button type={"primary"} style={{ width: "100%", marginTop: "24px" }} size="large" onClick={HandleLogin}>로그인</Button>
            </Form>

            <Flex align="center" gap="middle" justify="center" style={{ marginTop: "32px" }}>
                <Link to="/SignUp">회원가입</Link>
                <Link>아이디 찾기</Link>
                <Link>비밀번호 찾기</Link>
            </Flex>
        </div>
    </div>
    
}
