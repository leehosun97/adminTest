import { Link } from "react-router-dom";
import { Button, Flex, Input, Form } from "antd";

export default function SignUp() {
    return <div className="SignUpBox">
        <Form name="basic" style={{ maxWidth: "100%", }} initialValues={{ remember: true, }} autoComplete="off">
            <Form.Item rules={[{ required: true, message: '아이디가 틀렸습니다', },]}>
                <Input />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: '비밀번호가 틀렸습니다', },]}>
                <Input.Password />
            </Form.Item>
            <Button type={"primary"} style={{ width: "100%", marginTop: "24px" }} size="large">회원가입</Button>
        </Form>
    </div>
}