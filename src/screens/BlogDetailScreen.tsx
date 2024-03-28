import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {BlogContext, BlogContextProps} from '../../App.tsx';

export interface BlogDetailProps {
  id: number | undefined;
}

export interface BlogParams {
  route: {
    params: BlogDetailProps;
  };
}
const BlogDetail = ({route}: BlogParams) => {
  const {id} = route.params;
  // @ts-ignore
  const {blogs} = useContext<BlogContextProps>(BlogContext);

  const blog = useMemo(
    () => (blogs ? blogs.find(item => item.id === id) : blogs),
    [blogs, id],
  );

  return (
    <View style={styles.container}>
      {blog?.id ? (
        <>
          <Text style={styles.title}>{blog?.title}</Text>
          <Text>{blog?.content}</Text>
        </>
      ) : (
        <Text>404</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
export default BlogDetail;
