import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useState } from "react";
import { useProposals } from "../hooks/Proposals";
import { SnapshotProposalExtended } from "../models/Snapshot";
import { Toolbar } from "./Toolbar";

const Proposal = ({
  proposal,
  checked,
  onChange,
}: {
  proposal: SnapshotProposalExtended;
  checked: boolean;
  onChange: (e: CheckboxChangeEvent) => void;
}) => {
  return (
    <div role="button" className="border-b border-solid border-slate-200 p-3">
      <Checkbox checked={checked} onChange={onChange}>
        {proposal.title}
      </Checkbox>
    </div>
  );
};

export function Proposals({ space }: { space: string }) {
  const [selected, setSelected] = useState<SnapshotProposalExtended[]>();
  const proposals = useProposals({ space });

  const selectAll = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    if (checked) {
      setSelected(proposals?.data);
    }
  };

  const onProposalChange = (
    e: CheckboxChangeEvent,
    proposal: SnapshotProposalExtended
  ) => {
    const { checked } = e.target;
    if (checked) {
      setSelected([...(selected || []), proposal]);
    } else {
      setSelected([...(selected || []).filter((p) => p.id !== proposal.id)]);
    }
  };

  if (proposals.loading) return <span>Loading...</span>;

  return (
    <div>
      <Toolbar proposals={selected} space={space} className="mb-3" />

      <div className="border border-solid border-slate-200 rounded-md">
        <div className="border-b border-solid border-slate-200 px-3 py-1">
          <Checkbox onChange={(e) => selectAll(e)}>Select all</Checkbox>
        </div>
        <div>
          {proposals?.data?.map((p) => (
            <Proposal
              key={p.id}
              proposal={p}
              checked={!!selected?.some((proposal) => proposal.id === p.id)}
              onChange={(e) => onProposalChange(e, p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
