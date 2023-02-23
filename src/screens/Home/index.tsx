import {StatusBar, StyleSheet, Text, View, Platform} from 'react-native';
import React, {useRef} from 'react';
import useTheme from '../../hooks/useTheme';
import {useAppDispatch} from '../../store/hooks/hooks';
import Title from '../../components/atoms/Title';
import {size} from '../../theme/fonts';
import Button from '../../components/atoms/Button';
import CodePlus from '../../assets/svgs/CodePlus';
import Spacer from '../../components/atoms/Spacer';
import SliderLists from '../../components/organisms/SliderLists';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackTodosParams} from '../../navigation/StackTodosNavigation';
import useTodoList from '../../hooks/useTodoList';
import {
  addCurrentTodos,
  TodoList,
} from '../../store/slices/todoList/todoListSlice';
import Menu from '../../components/molecules/Menu';
import useBottomSheetModal from '../../hooks/useBottomSheetModal';
import BottomSheetModalBackground from '../../components/molecules/BottomSheetModalBackground';
import {
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import MenuContent from '../../components/organisms/MenuContent';

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'HomeScreen'> {}

const Home = ({navigation: {navigate}}: Props) => {
  const {containerScreen, colors, dark} = useTheme();
  const dispatch = useAppDispatch();
  const {isLoading, todoList} = useTodoList();
  const {
    handleCloseModalPress,
    handleSheetChanges,
    showModal,
    handlePresentModalPress,
  } = useBottomSheetModal();
  const openMenuRef = useRef<BottomSheetModal>(null);
  const snapPoints = [Platform.OS === 'ios' ? '45%' : '48%'];

  const navigateTodosScreen = (todos: TodoList) => {
    navigate('TodosScreen');
    dispatch(addCurrentTodos(todos));
  };

  return (
    <BottomSheetModalProvider>
      <View style={containerScreen.container}>
        <StatusBar
          backgroundColor={colors.background}
          translucent={true}
          barStyle={dark ? 'light-content' : 'dark-content'}
        />
        <Title
          title="TodoList"
          fontSize={size.font34}
          customStyles={{fontWeight: '600', color: colors.onBackground}}
        />
        <Spacer vertical={30} />
        <Button
          backgroundColor={colors.background}
          radius={5}
          icon={CodePlus}
          colorIcon={colors.primary}
          width="auto"
          sizeIcon={size.font30}
          borderColor={colors.primary}
          customStyle={{padding: 10}}
          onPress={() => navigate('AddListScreen')}
        />
        <Text style={[styles.labelBtn, {color: colors.primary}]}>Add List</Text>
        <Spacer vertical={30} />

        <SliderLists
          data={todoList}
          isLoading={isLoading}
          navigate={navigateTodosScreen}
        />
        <Menu openMenu={() => handlePresentModalPress(openMenuRef)} />
        <BottomSheetModalBackground
          refBottomSheet={openMenuRef}
          indexSnapPoints={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleCloseModalPress={() => handleCloseModalPress(openMenuRef)}
          showModalBackground={showModal}>
          <BottomSheetView style={styles.contentContainer}>
            <MenuContent />
          </BottomSheetView>
        </BottomSheetModalBackground>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  labelBtn: {
    paddingTop: 10,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
});
