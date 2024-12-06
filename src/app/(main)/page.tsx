import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
// import TrendsSidebar from "@/components/TrendsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import ForYouFeed from "./ForYouFeed";
// import FollowingFeed from "./FollowingFeed";
// import ForYouFeed from "./ForYouFeed";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">{/* <FollowingFeed /> */}</TabsContent>
        </Tabs>
      </div>
      {/* <TrendsSidebar /> */}
    </main>
  );
}
