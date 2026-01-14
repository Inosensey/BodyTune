"use server";

import Explore from "@/components/dashboardComponents/explore/Explore";
import {
  getExplorePageContent,
} from "@/lib/supabaseQueries";
import {
  explorePageContentInterface,
} from "@/types/planTypes";

const ExplorePage = async () => {
  const explorePageContentInterface = await getExplorePageContent() as explorePageContentInterface;
  return (
    <div className="px-4 mt-4 w-full">
      <Explore
        explorePageContentInterface={explorePageContentInterface}
      />
    </div>
  );
};

export default ExplorePage;
