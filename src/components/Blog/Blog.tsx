import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
export interface BlogItem {
  id: number | undefined;
  title: string;
  category: string;
  content: string;
}

export interface BlogProps {
  data: BlogItem;
}

const ITEM_WIDTH = Dimensions.get('screen').width / 2 - 32;
const ITEM_HEIGHT = Dimensions.get('screen').height / 6;

const Blog: React.FC<BlogProps> = ({data}) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'BlogDetail'>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('BlogDetail', {
          id: data.id,
        })
      }>
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      <View style={styles.category}>
        <Text>{data.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: 'rgba(216,214,214,0.5)',
    width: 'auto',
    padding: 4,
    alignSelf: 'flex-end',
    borderRadius: 4,
  },
});

export default Blog;
