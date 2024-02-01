import { Button, Input, Form, Alert } from "antd";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

export default function LoginV2() {
  const apiUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/login';
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(apiUrl, {
        loginId: data.userId,
        password: data.userPw,
      });

      // 로그인 성공 시
      alert(response.data.message);
    } catch (error) {
      // 로그인 실패 시
      alert(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  };
  
  return (
    <div>
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        initialValues={{ remember: true }}
        style={{ maxWidth: "100%", marginTop: "50px" }}
      >
        <Form.Item
          label="아이디"
          validateTrigger="onBlur"
          rules={[{ required: true, message: '아이디를 입력하세요.' }]}
        >
          <Controller
            name="userId"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
        >
          <Controller
            name="userPw"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} style={{ width: "100%", marginTop: "10px" }} size="large" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
