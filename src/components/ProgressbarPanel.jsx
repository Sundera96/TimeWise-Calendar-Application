import { List, Flex, Progress } from "antd";
import dayjs from "dayjs";
export default function ProgressBarPanel({ title, data }) {
  return (
    <>
      <p style={{ textAlign: "center" }}>{title}</p>
      <div
        id="scrollableDiv"
        style={{
          height: 250,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.eventId}>
              <List.Item.Meta
                title={<a>{item.title}</a>}
                description={
                  <Progress
                    percent={Math.round(
                      (item.completedTask / item.totalTask) * 100
                    )}
                    size="small"
                  ></Progress>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
