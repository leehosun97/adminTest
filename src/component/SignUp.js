import { Button, Space, Form, Input, message } from "antd";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
const { Search } = Input;



const signUpEffectiveness = [
    {
        name: "userId",
        rules: [
            { required: true, message: '아이디를 입력해주세요.' },
            { max: 12, message: '아이디는 12자리 이하여야 합니다.' },
            { min: 4, message: '아이디는 4자리 이상이어야 합니다.' }
        ]
    },
    {
        name: "userPw",
        rules: [
            { required: true, message: '비밀번호를 입력해주세요.' },
            { max: 15, message: '비밀번호는 15자리 이하여야 합니다.' },
            { min: 4, message: '비밀번호는 4자리 이상이어야 합니다.' }
        ]
    },
    {
        name: "confirmUserPw",
        rules: [
            { required: true, message: '아이디를 입력해주세요.' },
            { max: 12, message: '아이디는 12자리 이하여야 합니다.' },
            { min: 4, message: '아이디는 4자리 이상이어야 합니다.' }
        ]
    },
    {
        name: "userName",
        rules: [
            { required: true, message: '이름을 입력해주세요.' }
        ]
    },
    {
        name: "userPhone",
        rules: [
            { required: true, message: '휴대폰번호를 입력해주세요.' }
        ]
    },
    {
        name: "userEmail",
        rules: [
            { required: true, message: '이메일을 입력해주세요.' }
        ]
    }
];
console.log(signUpEffectiveness[1].rules)
export default function SignUp() {
    const apiUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/sign-up';
    const checkIdUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/exists/login-id';
    const checkPhoneUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/exists/mobile-phone';
    const checkEmailUrl = 'https://dev-admin.gongsiltoday.com/api/accounts/exists/email';

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSearchId = async (value) => {
        try {
            if (value) {
                // 아이디 중복 체크
                const checkIdResponse = await axios.get(`${checkIdUrl}/${value}`);
                if (checkIdResponse.data.result === true) {
                    message.error('사용불가능한 아이디입니다.');
                    console.log(checkIdResponse.data.result);
                } else {
                    message.success('사용가능한 아이디입니다.');
                    console.log(checkIdResponse.data.result);
                }
            }
        } catch (error) {
            console.error(error);
            message.error(error);
        }
    };
    const onSearchPhone = async (value) => {
        try {
            if (value) {
                // 핸드폰 중복 체크
                const checkPhoneResponse = await axios.get(`${checkPhoneUrl}/${value}`);
                if (checkPhoneResponse.data.result === true) {
                    message.error('사용불가능한 번호입니다.');
                    console.log(checkPhoneResponse.data);
                } else {
                    message.success('사용가능한 번호입니다.');
                    console.log(checkPhoneResponse.data);
                }
            }
        } catch (error) {
            console.error(error);
            message.error(error);
        }
    };
    const onSearchEmail = async (value) => {
        try {
            if (value) {
                // 이메일 중복 체크
                const checkEmailResponse = await axios.get(`${checkEmailUrl}/${value}`);
                if (checkEmailResponse.data.success) {
                    message.error('사용불가능한 이메일입니다.');
                } else {
                    message.success('사용가능한 이메일입니다.');
                }
            }
        } catch (error) {
            console.error(error);
            message.error(error);
        }
    };
    const onSubmit = async (data) => {
        try {
            // 비밀번호와 비밀번호 확인이 일치하는지 확인
            if (data.userPw !== data.confirmUserPw) {
                message.error('비밀번호가 일치하지 않습니다.');
                return;
            }
            // 아이디 중복이 아니면 회원가입 진행
            const signUpResponse = await axios.post(apiUrl, {
                loginId: data.userId,
                password: data.userPw,
                userName: data.userName,
                mobilePhone: data.userPhone,
                email: data.userEmail,
            });

            if (signUpResponse.data) {
                message.success(signUpResponse.data.message);
                console.log(signUpResponse.data);
            } else {
                ;
                message.error(signUpResponse.data.message);
            }
        } catch (error) {
            console.error('회원가입 불가 이유', error.response.data);
            message.error(error.response.data.message);
        }
    };

    return (
        <div className="SignUpBox">
            <Form
                name="basic"
                style={{ width: "650px" }}
                autoComplete="off"
                onFinish={handleSubmit(onSubmit)}
            >
                <Form.Item 
                    label="아이디"
                    rules={[{ required: true, message: '아이디를 입력하세요' }]}
                >
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Controller
                            name="userId"
                            control={control}
                            render={({ field }) => (
                                <Search
                                    {...field}
                                    placeholder="아이디를 입력하세요"
                                    allowClear
                                    enterButton="중복 체크"
                                    size="large"
                                    onSearch={onSearchId}
                                />
                            )}
                        />
                    </Space>

                </Form.Item>
                <Form.Item
                    label="비밀번호"
                    rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
                >
                    <Controller
                        name="userPw"
                        control={control}
                        size="large"
                        render={({ field }) => <Input.Password size="large" {...field} />}
                    />
                </Form.Item>
                <Form.Item
                    label="비밀번호 확인"
                    rules={signUpEffectiveness[2].rules}
                >
                    <Controller
                        name="confirmUserPw"
                        control={control}
                        render={({ field }) => <Input.Password size="large" {...field} />}
                    />
                </Form.Item>
                <Form.Item
                    label="이름"
                    validateTrigger="onBlur"
                    rules={signUpEffectiveness[3].rules}
                >
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => <Input size="large" {...field} />}
                    />
                </Form.Item>
                <Form.Item
                    label="휴대폰번호"
                    rules={signUpEffectiveness[4].rules}
                >
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Controller
                            name="userPhone"
                            control={control}
                            render={({ field }) => (
                                <Search
                                    {...field}
                                    placeholder="핸드폰를 입력하세요"
                                    allowClear
                                    enterButton="중복 체크"
                                    size="large"
                                    onSearch={onSearchPhone}
                                />
                            )}
                        />
                    </Space>
                </Form.Item>
                <Form.Item
                    label="이메일"
                    rules={signUpEffectiveness[5].rules}
                >
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Controller
                            name="userEmail"
                            control={control}
                            render={({ field }) => (
                                <Search
                                    {...field}
                                    placeholder="이메일을 입력하세요"
                                    allowClear
                                    enterButton="중복 체크"
                                    size="large"
                                    onSearch={onSearchEmail}
                                />
                            )}
                        />
                    </Space>
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} style={{ width: "100%", marginTop: "10px" }} size="large" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
