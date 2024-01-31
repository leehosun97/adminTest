import { Button, Input, Form } from "antd";

export default function LoginV1() {
  const onFinish = (values) => {


    const apiUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/login';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: values.userId,
        password: values.userPw,

      }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        console.log(data);
      })
      .catch(error => {
        console.log('API 호출 중 에러 발생:', error);
      });
  }

  return <div>
    <Form name="basic" initialValues={{ remember: true, }} onFinish={onFinish} style={{ maxWidth: "100%", marginTop: "50PX" }}>

      <Form.Item label="아이디" name="userId" validateTrigger="onBlur" rules={[{ required: true, message: '아이디를 입력하세요', },]}>
        <Input />
      </Form.Item>
      <Form.Item label="비밀번호" name="userPw" rules={[{ required: true, message: '비밀번호를 입력하세요', },]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} style={{ width: "100%", marginTop: "10px" }} size="large" htmlType="submit">로그인</Button>
      </Form.Item>
    </Form>
  </div>

}
