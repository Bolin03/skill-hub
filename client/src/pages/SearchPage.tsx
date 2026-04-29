// Search Results Page
// Shares layout with Popular page via SkillListLayout component
import { useSearch } from "wouter";
import { MOCK_SKILLS } from "@/lib/mockData";
import SkillListLayout from "@/components/SkillListLayout";

export default function SearchPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const query = params.get("q") || "";

  return (
    <SkillListLayout
      title={query ? `"${query}" 的搜索结果` : "搜索 Skills"}
      subtitle={query ? `找到与 "${query}" 相关的 Skills` : "输入关键词搜索"}
      skills={MOCK_SKILLS}
      defaultQuery={query}
    />
  );
}
