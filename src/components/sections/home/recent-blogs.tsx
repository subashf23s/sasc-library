import { Button, Card, Col, Flex, Row, Typography } from "antd";

const latestBlogs = [
  {
    id: 1,
    title: "The energy efficiency offers hydrotherapy or swim",
    image: "/assets/img/library.png",
    type: "Library",
    createdAt: "2022-01-01",
  },
  {
    id: 2,
    title: "The library, a place for meetings,culture, learning and leisure",
    image: "/assets/img/library.png",
    type: "Agenda",
    createdAt: "2022-01-01",
  },
  {
    id: 3,
    title: "The library, a place for meetings,culture, learning and leisure",
    image: "/assets/img/library.png",
    type: "Author",
    createdAt: "2022-01-01",
  },
];
const RecentBlogs = () => {
  return (
    <section className=" bg-white py-10">
      <Flex
        vertical={true}
        align="center"
        justify="center"
        gap={"large"}
        className=" !p-5 !container !mx-auto"
      >
        <h1 className="text-5xl font-bold text-center italic">Latest Blogs</h1>
        <p className="text-center font-semibold text-gray-600 italic md:w-1/2">
          At Book Nook, we believe every story has the power to
          transform-whether you're escaping into an epic fantasy.
        </p>
        <Row gutter={24}>
          {latestBlogs.map((blog) => (
            <Col span={8} key={blog.id}>
              <Card
                className="!rounded-none h-full"
                style={{ "--ant-card-body-padding": "12px" }}
              >
                <img
                  draggable={false}
                  alt={blog.title}
                  src={blog.image}
                  className="rounded-md "
                />
                <p className="min-h-20 text-base py-2">{blog.title}</p>
                <Flex align="center" justify="space-between">
                  <Button type="link" className="underline !px-0">
                    Read more
                  </Button>
                  <Typography.Text>{blog.createdAt}</Typography.Text>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>
    </section>
  );
};

export default RecentBlogs;
