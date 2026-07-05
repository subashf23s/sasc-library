import { Button, Divider, Flex, Input, Space, Typography } from "antd";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-black py-10">
      <Flex vertical={true} justify="center" align="center" className="container">
        <Space orientation="vertical" align="center">
        <Logo/>
        <Typography.Title level={2} className="!text-white text-center">Subscribe for the <br/> Daily updates</Typography.Title>
        <Space  size="small" className="!p-2 rounded-full bg-white">
          <Input size="large" variant="borderless" placeholder="Enter your email" styles={{input:{'--ant-input-active-border-color':'transparent'}}}/>
          <Button size="large" variant="solid" color="purple" shape="round">Subscribe</Button>
        </Space>
        </Space>
        <Divider className="bg-gray-900"/>
        <Space align="center">
        <Typography.Text className="!text-gray-800 text-center">
          Copyright &copy; 2026 MagicBook | All Rights Reserved.
        </Typography.Text>
        </Space>
      </Flex>
      
      <div>

      </div>
    </footer>
  );
};

export default Footer;
