import "./App.css";
import { Button, Form, Input, Spin } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { createRef, useState } from "react";
import axios from "axios";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const formRef = createRef();
  const handleOnSubmit = async (values) => {
    setIsFetching(true);
    await axios
      .get(`${process.env.REACT_APP_API_ROUTE}\TaskB\\retrieveMatch`, {
        params: values,
      })
      .then((res) => {
        setFeedBack(res.message);
      })
      .catch((err) => {
        console.log("TEST", err);
        setFeedBack(err.response.data.message);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <Page>
      <Content>
        <Spin style={SpinStyle} spinning={isFetching} size="large">
          <FormContainer>
            <Label>{"Find Matching Records"}</Label>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              ref={formRef}
              onFinish={handleOnSubmit}
            >
              <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: "Please input an email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="difficulty"
                name="difficulty"
                rules={[
                  { required: true, message: "Please input an difficuly" },
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
            <Label>{feedBack}</Label>
          </FormContainer>
        </Spin>
      </Content>
    </Page>
  );
}

const SpinStyle = {
  alignSelf: "center",
  maxHeight: "100vh",
};

const Label = styled.h2``;

const FormContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #c7bfbf;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Page = styled.div`
  width: 100%;
  min-height: 100vh;

  .ant-spin-nested-loading {
    align-self: center;
  }

  .ant-form-horizontal {
    justify-content: center;
    align-self: center;
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-content: center;
  text-align: center;
  justify-content: center;
  background-color: white;
`;

export default App;
