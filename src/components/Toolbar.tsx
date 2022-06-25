import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SnapshotProposalExtended } from "../models/Snapshot";

function downloadCSV(csv: string, name: string) {
  const uri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);

  var link = document.createElement("a");
  link.setAttribute("href", uri);
  link.setAttribute("download", `${name}.csv`);
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}

function downloadVoters(proposals: SnapshotProposalExtended[], space: string) {
  const allVotes = proposals.flatMap((p) => p.votes);
  const data = allVotes.reduce((acc: { [k: string]: number }, vote) => {
    if (vote === undefined) return acc;

    if (acc[vote.voter] === undefined) {
      acc[vote.voter] = 1;
    }
    acc[vote.voter] += 1;

    return acc;
  }, {});

  const csv =
    "address,votes\n" +
    Object.keys(data).reduce((csv, address) => {
      csv += `${address},${data[address]}\n`;
      return csv;
    }, "");

  downloadCSV(csv, `${space}_voters`);
}

export function Toolbar({
  proposals,
  space,
  ...props
}: {
  proposals: SnapshotProposalExtended[] | undefined;
  space: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const menu = (
    <Menu
      onClick={(e) => {
        if (!proposals) return;

        if (e.key === "1") {
          downloadVoters(proposals, space);
          return;
        }
      }}
      items={[
        {
          label: "Voters",
          key: "1",
        },
      ]}
    />
  );

  return (
    <div {...props}>
      <Dropdown overlay={menu}>
        <Button icon={<DownOutlined />}>Download</Button>
      </Dropdown>
    </div>
  );
}
