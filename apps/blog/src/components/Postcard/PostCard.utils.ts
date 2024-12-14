import type { NotionPage } from '@/models/notion';
import type { PostCardProps } from './PostCard';
import type { SeriesCardProps } from '@/app/series/_components/SeriesPostCard';

export const convertToPostCardProps = (responses: NotionPage): PostCardProps => {
  if (!responses) {
    return {
      title: '',
      excerpt: '',
      imageUrl: '',
      date: '',
      tags: [],
      slug: '',
      series: '',
    };
  }

  const title = responses.properties.Title?.title?.[0]?.plain_text || '';
  const excerpt = responses.properties.Excerpt?.rich_text?.[0]?.plain_text || '';
  const imageUrl = responses.properties.Thumbnail?.url || '';
  const date = responses.properties.Date?.date?.start || '';
  const tags = responses.properties.Tags?.multi_select?.map((tag) => tag.name) || [];
  const slug = responses.properties.Slug?.rich_text?.[0]?.plain_text || '';
  const series = responses.properties.Series?.select?.name || '';
  
  return {
    title,
    excerpt,
    imageUrl,
    date,
    tags,
    slug,
    series,
  };
};

export const convertSeriesFromPosts = (responses: NotionPage[]) : SeriesCardProps[] => {
  const seriesGroups = responses.reduce((acc, response) => {
    const seriesName = response.properties.Series.select?.name;
    if (!seriesName) return acc;

    const postCard = convertToPostCardProps(response);
    const seriesDescription = response.properties.SeriesDescription?.select?.name;

    if (!acc[seriesName]) {
      acc[seriesName] = {
        posts: [],
        description: seriesDescription
      };
    }

    acc[seriesName].posts.push(postCard);
    return acc;
  }, {} as Record<string, { posts: PostCardProps[], description: string }>);

  return Object.entries(seriesGroups).map(([seriesTitle, { posts, description }]) => ({
    seriesTitle,
    seriesDescription: description,
    list: posts
  }));
};
