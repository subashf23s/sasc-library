
import { Button, Flex, Space } from "antd";
const Hero = () => {
  return <section>
    <Flex justify="center" align="center" className="!py-20">
      <Space vertical={true} size={'large'} align="center">
      <h1 className="text-7xl font-bold text-center italic">
        Discover Events and Books <br/> Provided by US.
      </h1>
      <p className="text-center font-semibold text-gray-600 italic">
        Welcome to MagicBooks, your go-to platform for exploring the books you need.<br/>Search for forewords, prefaces, and endorsements with ease.
      </p>
      <Button size="large" variant="solid" color="purple" shape="round" className="!px-16 !py-5 !font-semibold">Search</Button>
      </Space>
    </Flex>
  </section>
  
};

export default Hero;
