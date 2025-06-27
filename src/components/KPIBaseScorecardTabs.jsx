import { Tabs, Tab } from "@nextui-org/react";

export default function KPIScorecardTabs() {
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger"
  ];

  return (
    <div className="flex flex-wrap gap-4">
      <Tabs color={colors[2]} aria-label="Tabs colors" radius="full">
        <Tab key="photos" title="Photos" />
        <Tab key="music" title="Music" />
        <Tab key="videos" title="Videos" />
      </Tabs>
    </div>
  );
}