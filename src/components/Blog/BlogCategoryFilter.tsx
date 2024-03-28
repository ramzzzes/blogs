import React, {useContext, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CategoryProps} from '../../screens/HomeScreen.tsx';
import {BlogContext, BlogContextProps} from '../../../App.tsx';

interface CategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

// @ts-ignore
const BlogCategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  // @ts-ignore
  const {blogs} = useContext<BlogContextProps>(BlogContext);

  const categories = useMemo(
    () =>
      blogs
        ?.map(b => ({title: b.category}))
        .filter((v, i, a) => a.map(a => a.title).indexOf(v.title) === i) ?? [],
    [blogs],
  );

  return categories?.map((category, key) => (
    <View key={key} style={styles.categoryWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.category,
          category.title === selectedCategory && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(category.title)}>
        <Text>{category.title}</Text>
      </TouchableOpacity>
      {key + 1 === categories.length && selectedCategory && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.category}
          onPress={() => setSelectedCategory(null)}>
          <Text>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  ));
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

export default BlogCategoryFilter;
