import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Blog from '../components/Blog/Blog.tsx';
import BlogCategoryFilter from '../components/Blog/BlogCategoryFilter';
import {BlogContext, BlogContextProps} from '../../App.tsx';

export interface CategoryProps {
  title: string;
}
const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // @ts-ignore
  const {blogs} = useContext<BlogContextProps>(BlogContext);

  const filteredItems = useMemo(
    () =>
      selectedCategory
        ? blogs.filter(item => item.category === selectedCategory)
        : blogs,
    [blogs, selectedCategory],
  );

  return (
    <>
      <View style={styles.categories}>
        <BlogCategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <View style={styles.container}>
        {filteredItems?.map((data, key) => (
          <Blog key={key} data={data} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    margin: 12,
  },
  categoryWrapper: {
    flexDirection: 'row',
  },
  category: {
    backgroundColor: 'rgba(216,214,214,0.5)',
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 8,
  },
  selectedCategory: {
    backgroundColor: 'rgb(162,160,160)',
  },
  container: {
    margin: 12,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
});
export default HomeScreen;
