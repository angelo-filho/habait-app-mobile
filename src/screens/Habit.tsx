import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { ProgressBar } from "../components/ProgressBar";

interface Params {
  date: string;
}

const habits = [
  "2L de água",
  "exercício",
  "Alimentação saudável",
  "Planejar próximo dia",
  "Dormir 8h",
];

export function Habit() {
  const routes = useRoute();
  const [habitsCompleted, setHabitsCompleted] = useState<number[]>([]);

  const { date } = routes.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  function handleToggleHabit(weekDayIndex: number) {
    if (habitsCompleted.includes(weekDayIndex)) {
      setHabitsCompleted((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setHabitsCompleted((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white text-3xl font-extrabold">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          {habits.map((habit, index) => (
            <Checkbox
              key={habit}
              title={habit}
              semiBold
              checked={habitsCompleted.includes(index)}
              onPress={() => handleToggleHabit(index)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
