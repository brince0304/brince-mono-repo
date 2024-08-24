import { convertToPostCardProps } from "@/lib/notion/convert";
import { notionClient } from "@/lib/notion/notion";
import { PostCard } from "@brince-mono-repo/shared-components";

const Posts = async () => {
	const posts = await notionClient.getPosts();

	if (!posts || posts.length === 0) {
		return null;
	}

	return (
		<ul className={"grid grid-cols-1 gap-4 md:grid-cols-3"}>
			{posts
				.map((post) => convertToPostCardProps(post))
				.map((props) => (
					<PostCard key={props.slug} {...props} />
				))}
		</ul>
	);
};

export default Posts;
