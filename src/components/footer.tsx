import { Button, Divider, Flex, Input, Space, Typography } from "antd";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-black py-10">
      <Flex vertical={true} justify="center" align="center" className="container">
        <Space orientation="vertical" align="center">
        <Logo/>
        <Typography.Title level={2} className="!text-white text-center">Subscribe for the <br/> Daily updates</Typography.Title>
        <Space.Compact size="large">
          <Input placeholder="Enter your email"/>
          <Button variant="solid" color="purple">Subscribe</Button>
        </Space.Compact>
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
