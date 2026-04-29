// Popular Skills Page
// Shares layout with Search Results page via SkillListLayout component
import { MOCK_SKILLS } from "@/lib/mockData";
import SkillListLayout from "@/components/SkillListLayout";

export default function PopularPage() {
  return (
    <SkillListLayout
      title="热门 Skills"
      subtitle="社区最受欢迎的 Agent 能力，按下载量排序"
      skills={MOCK_SKILLS}
    />
  );
}
