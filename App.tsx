import React, {useContext, useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.tsx';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import BlogDetail, {BlogDetailProps} from './src/screens/BlogDetailScreen.tsx';
import {BlogItem} from './src/components/Blog/Blog.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import BlogEditor from './src/components/Blog/BlogEditor.tsx';

export type RootStackParamList = {
  Home: undefined;
  BlogDetail: BlogDetailProps;
  BlogEditor: {id: undefined};
};

const items: BlogItem[] = [
  {
    id: 1,
    title: 'Elon Musk',
    content: 'Elon Musk s Starship goes  farther than ever ',
    category: 'Science',
  },
  {
    id: 2,
    title: 'Georgia',
    content: 'Georgia qualifies for European Championship',
    category: 'Sport',
  },

  {
    id: 3,
    title: 'EU Ambassador',
    content: 'EU Ambassador: Vetting Remains Open Issue',
    category: 'Global',
  },
  {
    id: 4,
    title: 'NIST update',
    content: 'NIST updates Cybersecurity Framework with Version 2.0',
    category: 'IT',
  },
];

export interface BlogContextProps {
  blogs: BlogItem[];
  setBlogs: (blogs: (prevBlogs: BlogItem[]) => BlogItem[]) => void;
}

export const BlogContext = React.createContext<BlogContextProps | null>(null);

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStackNavigator() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'BlogEditor'>>();

  // @ts-ignore
  const {setBlogs} = useContext<BlogContextProps>(BlogContext);
  const remove = (id: any) => {
    setBlogs(blogs => blogs.filter(blog => blog.id !== id));
    navigation.goBack();
  };

  const edit = (id: any) => {
    navigation.navigate('BlogEditor', {
      id: id,
    });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('BlogEditor', {id: undefined})}
              title="Add"
            />
          ),
        }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={({route}) => ({
          headerTitle: 'Details',
          headerRight: () => {
            const id = route.params?.id;
            return (
              <>
                <Button onPress={() => edit(id)} title="Edit" />
                <Button onPress={() => remove(id)} title="Remove" />
              </>
            );
          },
        })}
      />
      <Stack.Screen
        name="BlogEditor"
        component={BlogEditor}
        options={{
          headerTitle: 'Add new Blog',
        }}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const [blogs, setBlogs] = useState<BlogItem[]>(items);

  return (
    <SafeAreaProvider>
      <BlogContext.Provider
        value={{
          blogs,
          setBlogs,
        }}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <MainStackNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </BlogContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
