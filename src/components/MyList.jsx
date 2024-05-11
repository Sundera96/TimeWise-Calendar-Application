import { List, Checkbox } from "antd";
import dayjs from "dayjs";
export default function MyList({
  title,
  caller,
  data,
  handleOnClickEventPill,
  handleCheckBox,
}) {
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
                title={
                  <a onClick={() => handleOnClickEventPill(item.links[0].href)}>
                    {item.title}
                  </a>
                }
              />
              <div>
                <Checkbox
                  checked={dayjs(item.expiredDateTime).isValid()}
                  onChange={(e) =>
                    handleCheckBox(e.target.checked, item.links[0].href, caller)
                  }
                />
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
