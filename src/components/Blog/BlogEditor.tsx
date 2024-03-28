import React, {useContext, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  BlogContext,
  BlogContextProps,
  RootStackParamList,
} from '../../../App.tsx';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BlogItem} from './Blog.tsx';
import {BlogParams} from '../../screens/BlogDetailScreen.tsx';

const BlogEditor = ({route}: BlogParams) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  // @ts-ignore
  const {blogs, setBlogs} = useContext<BlogContextProps>(BlogContext);
  const {id = undefined} = route.params || {};

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const create = () => {
    const newBlog: BlogItem = {
      id: blogs.length + 1,
      title,
      content,
      category,
    };
    setBlogs(prevBlogs => [...prevBlogs, newBlog]);
  };

  const update = () => {
    const updatedBlog: BlogItem = {
      id,
      title,
      content,
      category,
    };
    setBlogs(prevBlogs =>
      prevBlogs.map(blog => (blog.id === id ? updatedBlog : blog)),
    );
  };
  const save = () => {
    if (id) {
      update();
    } else {
      create();
    }
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (title !== '' && content !== '' && category !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content, category]);

  const blog = useMemo(
    () =>
      blogs && id !== undefined ? blogs.find(item => item.id === id) : null,
    [blogs, id],
  );

  useEffect(() => {
    if (id && blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.category);
    }
  }, [blog, id]);

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        value={content}
        placeholder="Content"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCategory}
        value={category}
        placeholder="Category"
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.saveBtn,
          {
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={() => !disabled && save()}>
        <Text
          style={[
            styles.saveBtnText,
            {
              opacity: disabled ? 0.5 : 1,
            },
          ]}>
          Save
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 16,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },
  saveBtn: {
    margin: 16,
    backgroundColor: '#1f5b3f',
    color: '#fff',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 4,
  },
  saveBtnText: {
    color: '#fff',
  },
});
export default BlogEditor;
